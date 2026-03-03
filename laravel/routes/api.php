<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocialAuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])
        ->name('register');

    Route::post('/login', [AuthController::class, 'login'])
        ->name('login');

    Route::post('/forgot-password', [AuthController::class, 'sendResetLinkEmail'])
        ->name('password.email');

    Route::post('/reset-password', [AuthController::class, 'resetPassword'])
        ->name('password.store');

    Route::prefix('auth')->group(function () {
        Route::get('/{provider}/redirect', [SocialAuthController::class, 'redirect'])
            ->whereIn('provider', ['google', 'yandex'])
        ;

        Route::get('/{provider}/callback', [SocialAuthController::class, 'callback'])
            ->whereIn('provider', ['google', 'yandex'])
        ;
    });
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/verify-email/{id}/{hash}', [EmailVerificationController::class, 'verify'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('/email/verification-notification', [EmailVerificationController::class, 'resend'])
        ->middleware(['throttle:6,1'])
        ->name('verification.send');

    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('logout');
    Route::get('/profile', [ProfileController::class, 'index'])
        ->name('profile');
    Route::put('/profile/password', [ProfileController::class, 'changePassword'])
        ->name('password.update')
        ->middleware(['throttle:6,1']);
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
});
