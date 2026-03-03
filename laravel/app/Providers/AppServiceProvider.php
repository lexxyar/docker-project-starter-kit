<?php

namespace App\Providers;

use App\Models\PersonalAccessToken;
use App\Traits\HasChangersBlueprints;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    use HasChangersBlueprints;

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Use UUID for personal access token (register custom model)
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);

        // Remove wrapping resources by `data` wrapper
        JsonResource::withoutWrapping();

        // Customize email verification email
        VerifyEmail::toMailUsing(function ($notifiable, $verificationUrl) {
            $token = base64_encode($verificationUrl);
            $baseUrl = config('app.frontend_url');
            $spaEmailVerificationUrl = $baseUrl . '/email-verification?token=' . $token;

            return (new MailMessage)
                ->subject(Lang::get('Verify Email Address'))
                ->view('emails.verify-email', compact('spaEmailVerificationUrl'));
        });

        // Customize reset password email
        ResetPassword::toMailUsing(function ($notifiable, $token) {
            $credentials = ['email' => $notifiable->email, 'token' => $token];
            $token = base64_encode(json_encode($credentials));
            $baseUrl = config('app.frontend_url');
            $spaResetUrl = $baseUrl . '/reset-password?token=' . $token;

            return (new MailMessage)
                ->subject(Lang::get('Reset Password Notification'))
                ->view('emails.reset-password', [
                    'name' => $notifiable->name,
                    'email' => $notifiable->email,
                    'resetUrl' => $spaResetUrl,
                    'count' => config('auth.passwords.' . config('auth.defaults.passwords') . '.expire'),
                ]);
        });

        // Social login
        Event::listen(\SocialiteProviders\Manager\SocialiteWasCalled::class, function (\SocialiteProviders\Manager\SocialiteWasCalled $event) {
            $event->extendSocialite('yandex', \SocialiteProviders\Yandex\Provider::class);
        });

        // Adding database schema BluePrint macro extensions
        $this->addChangersBlueprints();
    }
}
