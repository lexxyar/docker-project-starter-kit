<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 2px solid #e0e0e0;
        }
        .content {
            padding: 30px 20px;
            background-color: #ffffff;
            border-radius: 5px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #e0e0e0;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>Verify Your Email Address</h1>
    </div>

    <div class="content">
        <p>Hello <strong>{{ $user->name ?? 'there' }}</strong>,</p>

        <p>Thank you for registering with us! Please verify your email address by clicking the button below:</p>

        <div style="text-align: center;">
            <a href="{{ $spaEmailVerificationUrl }}" class="button">
                Verify Email Address
            </a>
        </div>

        <p>If you didn't create an account, no further action is required.</p>

        <p>Alternatively, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all;">
            <a href="{{ $spaEmailVerificationUrl }}">{{ $spaEmailVerificationUrl }}</a>
        </p>

        <p>This verification link will expire in {{ $expiration ?? '60' }} minutes.</p>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </div>
</div>
</body>
</html>
