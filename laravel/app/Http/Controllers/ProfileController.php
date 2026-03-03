<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordUpdateRequest;
use App\Http\Requests\ProfileDeleteRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProfileController extends Controller
{
    public function index(Request $request): UserResource
    {
        return UserResource::make($request->user());
    }

    public function changePassword(PasswordUpdateRequest $request): Response
    {
        $request->user()->update([
            'password' => $request->password,
        ]);

        return response()->noContent();
    }

    public function destroy(ProfileDeleteRequest $request): Response
    {
        $user = $request->user();
        $user->tokens()->delete();
        $user->delete();

        return response()->noContent();
    }

    public function update(ProfileUpdateRequest $request): UserResource
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return UserResource::make($request->user());
    }
}
