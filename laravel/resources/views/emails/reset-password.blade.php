<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.5;
            color: #3d4852;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .email-header {
            text-align: center;
            padding: 20px 0;
            background-color: #fff;
            border-radius: 8px 8px 0 0;
        }
        .email-body {
            background-color: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4f46e5;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        .button:hover {
            background-color: #4338ca;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 14px;
        }
        .expiry-note {
            background-color: #f3f4f6;
            padding: 12px;
            border-radius: 6px;
            margin: 20px 0;
            font-size: 14px;
        }
        .url-fallback {
            word-break: break-all;
            background-color: #f9fafb;
            padding: 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
        }
    </style>
</head>
<body>
<div class="email-wrapper">
    <div class="email-header">
        <h1>{{ config('app.name') }}</h1>
    </div>

    <div class="email-body">
        <h2>Hello {{ $name }}!</h2>

        <p>We received a request to reset the password for your account associated with <strong>{{ $email }}</strong>.</p>

        <p>Click the button below to reset your password:</p>

        <div style="text-align: center;">
            <a href="{{ $resetUrl }}" class="button">Reset Password</a>
        </div>

        <div class="expiry-note">
            ⏰ This password reset link will expire in <strong>{{ $count }} minutes</strong>.
        </div>

        <p><strong>Didn't request this?</strong> If you did not request a password reset, you can safely ignore this email. Your password won't be changed.</p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

        <p style="font-size: 14px; color: #6b7280;">
            <strong>Having trouble clicking the button?</strong><br>
            Copy and paste this URL into your browser:
        </p>
        <div class="url-fallback">
            {{ $resetUrl }}
        </div>

        <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            If you continue to have problems, please contact our support team at
            <a href="mailto:{{ config('mail.from.address') }}">{{ config('mail.from.address') }}</a>
        </p>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        <p style="font-size: 12px;">This is an automated message, please do not reply to this email.</p>
    </div>
</div>
</body>
</html>
