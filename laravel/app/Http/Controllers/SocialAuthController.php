<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Social;
use App\Models\User;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect($provider): JsonResponse
    {
        $redirect_uri = Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();
        Log::debug('Redirecting to social auth page', [
            'provider' => $provider,
            'redirect_uri' => $redirect_uri,
        ]);
        return response()->json(['url' => $redirect_uri]);
    }

    public function callback($provider): JsonResponse
    {
        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();
        } catch (ClientException $th) {
            $responseError = json_decode($th->getResponse()->getBody()->getContents());

            Log::error('Get social user info failed', [
                'error' => $th->getMessage(),
                'provider' => $provider,
                'details' => $responseError,
            ]);
            throw new \Exception($responseError->error_description);
        }
        $name = $socialUser->getNickname() ?? $socialUser->getName();
        $email = $socialUser->getEmail() ?? $socialUser->getId() . '@' . $provider . '.self';

        // check if already exists
        $user = User::query()
            ->where('email', $email)
            ->first();

        //if doesn't exist
        if (!$user) {
            // create user
            $user = User::query()
                ->create([
                    'name' => $name,
                    'email' => $email,
                    'password' => Hash::make(Str::random(8)),
                    'email_verified_at' => now(),
                ]);
            // create socials for user
            $user->socials()->create([
                'provider_id' => $socialUser->getId(),
                'provider' => $provider,
                'provider_token' => $socialUser->token,
                'provider_refresh_token' => $socialUser->refreshToken
            ]);
        }
        // if user does exist
        $socials = Social::query()
            ->where('provider', $provider)
            ->where('user_id', $user->id)->first();
        //check if user doesn't have socials
        if (!$socials) {
            // add socials to user
            $user->socials()->create([
                'provider_id' => $socialUser->getId(),
                'provider' => $provider,
                'provider_token' => $socialUser->token,
                'provider_refresh_token' => $socialUser->refreshToken
            ]);
        }
        // login user
        auth()->login($user);

        $token = Auth::user()->createToken($user->name);

        return response()->json(
            [
                'user' => UserResource::make($user),
                'token' => $token->plainTextToken,
            ]
        );
    }
}
