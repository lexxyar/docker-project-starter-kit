<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Register new user and return token
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $isEmailExists = User::query()
            ->where('email', $request->email)
            ->first('id');

        if (!!$isEmailExists) {
            throw ValidationException::withMessages(['email' => 'This email already exists.']);
        }

        $user = User::withTrashed()
            ->where('email', $request->email)
            ->first();


        if (!$user) {
            $emailName = explode('@', $request->email)[0];
            $userName = $request->name ?? $emailName;
            $user = User::query()
                ->create([
                    'name' => $userName,
                    'email' => $request->email,
                    'password' => Hash::make($request->string('password')),
                ]);

            event(new Registered($user));
            Log::debug('New user is registered', [
                'email' => $user->email,
            ]);
        } else {
            $user->restore();
            $userName = $user->name;
            Log::debug('User restored from trash', [
                'email' => $user->email,
            ]);
        }

        Auth::login($user);

        $token = auth()->user()->createToken($userName);

        return response()->json([
            'user' => UserResource::make($user),
            'token' => $token->plainTextToken,
        ]);
    }

    // Login user and return token
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $request->authenticate();
        } catch (ValidationException $e) {
            Log::debug('Authentication failed',
                [
                    'error' => $e->getMessage(),
                    'request' => $request->except([
                        'password',
                        'new_password',
                        'old_password',
                        'password_confirmation'
                    ]),
                ]);
            throw $e;
        }

        /** @var User $user */
        $user = auth()->user();
        $token = $user->createToken($user->name);
        $token = $token->plainTextToken;

        return response()->json([
            'user' => UserResource::make(auth()->user()),
            'token' => $token,
        ]);
    }

    // Logout (invalidate token)
    public function logout(Request $request): Response
    {
        /** @var User $user */
        $user = Auth::user();
        $user->tokens()->where('id', auth()->id())->delete();

        return response()->noContent();
    }

    public function sendResetLinkEmail(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status != Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        return response()->json(['status' => __($status)]);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->string('password')),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status != Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        return response()->json(['status' => __($status)]);
    }
}
