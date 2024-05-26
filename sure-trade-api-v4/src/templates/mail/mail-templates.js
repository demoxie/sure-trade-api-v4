export const ACCOUNT_VERIFICATION_TEMPLATE = `
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title>GMS Email</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">
  <meta name="theme-color" content="#fafafa">
  <style>
    *{
      box-sizing: border-box;
    }
    body{
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      background: #fafafa;
    }

    a {
      color: #dc8100;
      text-decoration: none;
    }

    a:hover {
      color: #333;
      text-decoration: none;
    }
    .container-fluid{
      width: 100%;
      margin: 0 auto;
      padding: 0;
      background-color: #fefefe;
    }

    @media (min-width: 768px) {
      .background-image{
        display: block;
        width: 100%;
        height: calc(80vh - 50px);
        object-fit: fill;
        margin-inline: 0;
        margin-top: 0;
        padding: 0;
      }
    }
    @media (max-width: 767px) {
      .background-image{
        display: block;
        width: 100%;
        height: auto;
        max-height: calc(100vh - 20px);
        object-fit: fill;
        margin-inline: 0;
        margin-top: 0;
        padding: 0;
      }
    }
    @media (max-width: 575px) {
      .background-image{
        display: block;
        width: 100%;
        height: auto;
        max-height: calc(100vh - 20px);
        object-fit: fill;
        margin-inline: 0;
        margin-top: 0;
        padding: 0;
      }
    }

    @media (max-width: 479px) {
      .background-image{
        display: block;
        width: 100%;
        height: auto;
        max-height: calc(100vh - 20px);
        object-fit: fill;
        margin-inline: 0;
        margin-top: 0;
        padding: 0;
      }
    }

    @media (max-width: 375px) {
      .background-image{
        display: block;
        width: 100%;
        height: auto;
        max-height: calc(100vh - 20px);
        object-fit: fill;
        margin-inline: 0;
        margin-top: 0;
        padding: 0;
      }
    }
    @media (max-width: 320px) {
      .background-image{
        display: block;
        width: 100%;
        height: auto;
        max-height: calc(100vh - 20px);
        object-fit: fill;
        margin-inline: 0;
        margin-top: 0;
        padding: 0;
      }
    }

    .email-title{
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      text-align: center;
      margin-top: 2rem;
    }
    .email-receiver{
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
      text-align: left;
      margin-top: 2rem;
      margin-left: 2rem;
    }
    .message-section-1{
      font-size: 1.2rem;
      font-weight: 400;
      color: #333;
      text-align: left;
      margin-top: 2rem;
      margin-left: 2rem;
    }
    .verify-btn{
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;
      margin-top: 2rem;
      background-color: #800080;
      padding: 1rem;
      border-radius: 5px;
      width: 50%;
      margin-left: 25%;
      color: #fff;
      cursor: pointer;
    }
    .verify-btn a{
      color: #fff;
      text-decoration: none;
    }
    .verify-btn a:hover{
      color: #fff;
      text-decoration: none;
    }
    .message-section-2{
      font-size: 1.2rem;
      font-weight: 400;
      color: #333;
      text-align: left;
      margin-top: 2rem;
      margin-left: 2rem;
    }
    .message-section-3{
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
      text-align: left;
      margin-top: 2rem;
      margin-left: 2rem;
    }
  </style>
</head>

<body>
<div class="container-fluid">
  <img src="https://gamestar.exchange/images/landing.png" class="background-image" alt="background image">
  <div>
   <h1 class="email-title">Account Verification</h1>
    <p class="email-receiver">Hi {{name}},</p>
    <p class="message-section-1">Thank you for registering with GameStar. Please click on the link below to verify your account.</p>
    <p class="verify-btn"><a href="{{link}}">Verify Account</a></p>
    <p class="message-section-2">Thank you</p>
    <p class="message-section-3">Sure Trade Team</p>
  </div>
</div>
</body>
</html>
`;

export const OTP_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>OTP</title>
</head>
<body>
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">SURE TRADE</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Sure Trade. Use the following OTP to complete your Sign Up process. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{{otp}}</h2>
        <p style="font-size:0.9em;">Regards,<br />Sure Trade</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Sure Trade</p>
        </div>
    </div>
</div>
</body>
</html>
`;

const PAYMENT_NOTIFICATION_TEMPLATE = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <title>Payment Notification</title>
</head>
<body>
<div style="width: 100%; height: 100%; background-color: #f2f2f2; font-family: 'Open Sans', sans-serif; padding: 50px 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 50px 30px; border-radius: 5px;">
        <div style="text-align: center;">
            <img src="https://gamestar.exchange/images/landing.png" alt="logo" style="width: 100%; height: auto;">
        </div>
        <div style="margin-top: 30px;">
            <p style="font-size: 16px; color: #000; margin-bottom: 20px;">Hi {{ $name }},</p>
            <p style="font-size: 16px; color: #000; margin-bottom: 20px;">Your payment of <b>{{ $amount }}</b> has been received.</p>
            <p style="font-size: 16px; color: #000; margin-bottom: 20px;">Thank you for using our service.</p>
            <p style="font-size: 16px; color: #000; margin-bottom: 20px;">Regards,</p>
            <p style="font-size: 16px; color: #000; margin-bottom: 20px;">Sure Trade Team</p>
        </div>
    </div>
</div>
</body>
</html>
`;

export const BECOME_A_MERCHANT_EMAIL_TEMPLATE = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <title>Application to become Merchant</title>
</head>
<body>
<div style='font-family: Arial, Helvetica, sans-serif; margin-inline: auto;padding-left: 20px'>
    <p>Hi {{ $name }},</p>
    <p>A User requested to become a merchant with sure trade. The following are the details user sent to become a merchant</p>
    <div style="font-style: italic;font-weight: bold;">
        <p>Wallet Address: {{ $walletAddress }}</p>
        <p>Transaction Hash ID: {{ $transactionHashId }}</p>
        <p>Amount Staked: {{ $amount }}</p>
    </div>
    <p>Kindly review and repond accordingly.</p>
    <p>Thanks, regards</p>
    <br>
    <p>Team {{ $app_name }}</p>
</div>
</body>
</html>
`;

export const TEST_OTP_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
     
      
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0px;
            background-color: #ffffff;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #800080; /* Purple */
            color: #fff;
            padding: 20px 0;
            text-align: center;
            margin: 0;
        }

        .logo {
            max-width: 150px;
        }

        .otp-info {
            text-align: center;
            margin: 20px 0;
            height: 100px;
        }

        .otp-code {
            font-size: 40px;
            font-weight: bold;
            color: #800080; /* Purple */
            user-select: all;
        }

        .copy-button {
            background-color: #800080; /* Complementary Color 1 */
            color: #fff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
            box-shadow: none;
            outline: none;
        }

        .copy-button:hover {
            background-color: #895b83; /* Complementary Color 2 */
        }

        .footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 10px;
            margin: 0;
        }

        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }

            .header,
            .footer {
                padding: 10px 0;
            }

            .otp-code {
                font-size: 36px;
            }

            .copy-button {
                padding: 10px 20px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIiA/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgd2lkdGg9IjEwODAiIGhlaWdodD0iMTA4MCIgdmlld0JveD0iMCAwIDEwODAgMTA4MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxkZXNjPkNyZWF0ZWQgd2l0aCBGYWJyaWMuanMgNS4yLjQ8L2Rlc2M+CjxkZWZzPgo8L2RlZnM+CjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgNTQwIDU0MCkiIGlkPSJhMDA2YmI2My1lYmI2LTQ0ODItOTljMS02MzBkYmRkMGU4OGYiICA+CjxyZWN0IHN0eWxlPSJzdHJva2U6IG5vbmU7IHN0cm9rZS13aWR0aDogMTsgc3Ryb2tlLWRhc2hhcnJheTogbm9uZTsgc3Ryb2tlLWxpbmVjYXA6IGJ1dHQ7IHN0cm9rZS1kYXNob2Zmc2V0OiAwOyBzdHJva2UtbGluZWpvaW46IG1pdGVyOyBzdHJva2UtbWl0ZXJsaW1pdDogNDsgZmlsbDogcmdiKDI1NSwyNTUsMjU1KTsgZmlsbC1ydWxlOiBub256ZXJvOyBvcGFjaXR5OiAxOyB2aXNpYmlsaXR5OiBoaWRkZW47IiB2ZWN0b3ItZWZmZWN0PSJub24tc2NhbGluZy1zdHJva2UiICB4PSItNTQwIiB5PSItNTQwIiByeD0iMCIgcnk9IjAiIHdpZHRoPSIxMDgwIiBoZWlnaHQ9IjEwODAiIC8+CjwvZz4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSA1NDAgNTQwKSIgaWQ9IjY0MzJkNTE3LTc0MTAtNGRiNS1hMmExLTBjNDM4MzllMDBmOSIgID4KPC9nPgo8ZyB0cmFuc2Zvcm09Im1hdHJpeCg4LjU2IDAgMCA4LjU2IDQ5NC4zNyA1NDApIiBpZD0iOTc2ZTI5ZmYtNTNlMy00ZGI4LWE0MWYtNzQ1ZWM2NmM3MjczIiAgPgo8Y2lyY2xlIHN0eWxlPSJzdHJva2U6IHJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDogMDsgc3Ryb2tlLWRhc2hhcnJheTogbm9uZTsgc3Ryb2tlLWxpbmVjYXA6IGJ1dHQ7IHN0cm9rZS1kYXNob2Zmc2V0OiAwOyBzdHJva2UtbGluZWpvaW46IG1pdGVyOyBzdHJva2UtbWl0ZXJsaW1pdDogNDsgZmlsbDogcmdiKDI1NSwyNTUsMjU1KTsgZmlsbC1ydWxlOiBub256ZXJvOyBvcGFjaXR5OiAxOyIgdmVjdG9yLWVmZmVjdD0ibm9uLXNjYWxpbmctc3Ryb2tlIiAgY3g9IjAiIGN5PSIwIiByPSIzNSIgLz4KPC9nPgo8ZyB0cmFuc2Zvcm09Im1hdHJpeCg1LjM0IDAgMCA1LjM0IDUwNi4wMiA1MTMuNikiIGlkPSIzODRiNTZkOC00NWEwLTQwZTMtOTUxZC0yMWQ2ODNhZGFiODkiICA+CjxwYXRoIHN0eWxlPSJzdHJva2U6IHJnYigwLDAsMCk7IHN0cm9rZS13aWR0aDogMDsgc3Ryb2tlLWRhc2hhcnJheTogbm9uZTsgc3Ryb2tlLWxpbmVjYXA6IGJ1dHQ7IHN0cm9rZS1kYXNob2Zmc2V0OiAwOyBzdHJva2UtbGluZWpvaW46IG1pdGVyOyBzdHJva2UtbWl0ZXJsaW1pdDogNDsgZmlsbDogcmdiKDExOCwyMSwxNTcpOyBmaWxsLXJ1bGU6IG5vbnplcm87IG9wYWNpdHk6IDE7IiB2ZWN0b3ItZWZmZWN0PSJub24tc2NhbGluZy1zdHJva2UiICB0cmFuc2Zvcm09IiB0cmFuc2xhdGUoLTUwLCAtNTApIiBkPSJNIDE0LjE0OCA0NC4xMDUgTCAxOC4wOTEgNDAuMTYyIEMgMjAuMDEgMzguMjQyIDIzLjE3NjAwMDAwMDAwMDAwMiAzOC4yNDIgMjUuMDk2IDQwLjE2MiBMIDQyLjE2NCA1Ny4yMzA5OTk5OTk5OTk5OTUgTCA3NC45MDQgMjQuNDQwOTk5OTk5OTk5OTk1IEMgNzYuODIzIDIyLjUyMTk5OTk5OTk5OTk5NSA3OS45ODg5OTk5OTk5OTk5OSAyMi41MjE5OTk5OTk5OTk5OTUgODEuOTA4OTk5OTk5OTk5OTkgMjQuNDQwOTk5OTk5OTk5OTk1IEwgODUuODUxIDI4LjM4Mzk5OTk5OTk5OTk5NyBDIDg3Ljc3MSAzMC4zMDI5OTk5OTk5OTk5OTcgODcuNzcxIDMzLjQxNSA4NS44NTEgMzUuMzM0OTk5OTk5OTk5OTk0IEwgNDUuNjQxIDc1LjU0NDk5OTk5OTk5OTk5IEwgNDUuNTM3IDc1LjY0ODk5OTk5OTk5OTk5IEwgNDUuNDMzIDc1Ljc1Mjk5OTk5OTk5OTk5IEwgNDUuMzI5IDc1LjgwNDk5OTk5OTk5OTk5IEwgNDUuMjc3IDc1LjkwODk5OTk5OTk5OTk5IEwgNDUuMTczIDc1Ljk2MSBMIDQ1LjA2OSA3Ni4wNjUgTCA0NC45NjUgNzYuMTE3IEwgNDQuODYxMDAwMDAwMDAwMDA0IDc2LjE2OTAwMDAwMDAwMDAxIEwgNDQuNzU3MDAwMDAwMDAwMDA1IDc2LjI3NDAwMDAwMDAwMDAyIEwgNDQuNjUzMDAwMDAwMDAwMDA2IDc2LjMyNDAwMDAwMDAwMDAxIEwgNDQuNTQ5MDAwMDAwMDAwMDEgNzYuMzc4MDAwMDAwMDAwMDEgTCA0NC40NDUwMDAwMDAwMDAwMSA3Ni40MzAwMDAwMDAwMDAwMiBMIDQ0LjM0MTAwMDAwMDAwMDAxIDc2LjQ4MjAwMDAwMDAwMDAzIEwgNDQuMjM3MDAwMDAwMDAwMDEgNzYuNTM0MDAwMDAwMDAwMDMgTCA0NC4wODAwMDAwMDAwMDAwMSA3Ni41ODYwMDAwMDAwMDAwNCBMIDQzLjk3NjAwMDAwMDAwMDAxIDc2LjYzODAwMDAwMDAwMDA1IEwgNDMuODcyMDAwMDAwMDAwMDE0IDc2LjY5MDAwMDAwMDAwMDA1IEwgNDMuNzY4MDAwMDAwMDAwMDE1IDc2Ljc0MjAwMDAwMDAwMDA2IEwgNDMuNjY0MDAwMDAwMDAwMDE2IDc2Ljc0MjAwMDAwMDAwMDA2IEwgNDMuNTYwMDAwMDAwMDAwMDIgNzYuNzk0MDAwMDAwMDAwMDcgTCA0My40MDUwMDAwMDAwMDAwMTUgNzYuODQ3MDAwMDAwMDAwMDcgTCA0My4zMDEwMDAwMDAwMDAwMTYgNzYuODQ3MDAwMDAwMDAwMDcgTCA0My4xOTcwMDAwMDAwMDAwMiA3Ni44OTkwMDAwMDAwMDAwNyBMIDQyLjkzODAwMDAwMDAwMDAyIDc2Ljg5OTAwMDAwMDAwMDA3IEwgNDIuODM0MDAwMDAwMDAwMDIgNzYuOTUxMDAwMDAwMDAwMDggTCA0Mi42MjYwMDAwMDAwMDAwMiA3Ni45NTEwMDAwMDAwMDAwOCBMIDQyLjQ3MTAwMDAwMDAwMDAyIDc3LjAwMzAwMDAwMDAwMDA5IEwgNDEuNzk1MDAwMDAwMDAwMDE2IDc3LjAwMzAwMDAwMDAwMDA5IEwgNDEuNjQwMDAwMDAwMDAwMDE1IDc2Ljk1MTAwMDAwMDAwMDA4IEwgNDEuNDMyMDAwMDAwMDAwMDE2IDc2Ljk1MTAwMDAwMDAwMDA4IEwgNDEuMzI4MDAwMDAwMDAwMDIgNzYuODk5MDAwMDAwMDAwMDcgTCA0MS4wNjkwMDAwMDAwMDAwMiA3Ni44OTkwMDAwMDAwMDAwNyBMIDQwLjk2NTAwMDAwMDAwMDAyIDc2Ljg0NzAwMDAwMDAwMDA3IEwgNDAuODYxMDAwMDAwMDAwMDIgNzYuODQ3MDAwMDAwMDAwMDcgTCA0MC43MDYwMDAwMDAwMDAwMiA3Ni43OTQwMDAwMDAwMDAwNyBMIDQwLjYwMjAwMDAwMDAwMDAyIDc2Ljc0MjAwMDAwMDAwMDA2IEwgNDAuNDk4MDAwMDAwMDAwMDIgNzYuNzQyMDAwMDAwMDAwMDYgTCA0MC4zOTQwMDAwMDAwMDAwMiA3Ni42OTAwMDAwMDAwMDAwNSBMIDQwLjI5MDAwMDAwMDAwMDAyIDc2LjYzODAwMDAwMDAwMDA1IEwgNDAuMTg1MDAwMDAwMDAwMDI0IDc2LjU4NjAwMDAwMDAwMDA0IEwgNDAuMDgxMDAwMDAwMDAwMDI0IDc2LjUzNDAwMDAwMDAwMDAzIEwgNDAuMDI5MDAwMDAwMDAwMDI1IDc2LjUzNDAwMDAwMDAwMDAzIEMgMzkuNTYzMDAwMDAwMDAwMDI0IDc2LjMyNTAwMDAwMDAwMDAzIDM5LjA5NjAwMDAwMDAwMDAyNSA3NS45NjIwMDAwMDAwMDAwMyAzOC42MzAwMDAwMDAwMDAwMjQgNzUuNTQ4MDAwMDAwMDAwMDMgTCAxNC4xNDAwMDAwMDAwMDAwMjUgNTEuMDU5MDAwMDAwMDAwMDI2IEMgMTIuMjI5IDQ5LjEzNyAxMi4yMjkgNDYuMDI1IDE0LjE0OCA0NC4xMDUgeiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgo8L2c+Cjwvc3ZnPg==" alt="Company Logo" class="logo">
            <h1>Sure Trade</h1>
        </div>
        <div class="otp-info">
            <p>Your OTP code is:</p>
            <div class="otp-code" id="otpCode">{{$otp}}</div>
        </div>

        <div class="footer">
            <p>Sure Trade</p>
            <p>support@suretrade.com</p>
            <p>Phone: +1 234 7036 39</p>
            <p>Copyright © 2023. All rights reserved.</p>
        </div>
    </div>

</body>

</html>

`;

export const MESSAGE_TEMPLATE = `
    <!DOCTYPE html>
<html lang="en">

<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">

    <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

        <img src="https://plus.unsplash.com/premium_photo-1682310083671-e247ad36e0b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2712&q=80" alt="Header Image" style="width: 100%;max-height: 250px; border-top-left-radius: 10px; border-top-right-radius: 10px;">

        <div style="padding: 20px; font-size: 18px; color: #333;">
            <p>{{ $salutation }},</p>
            {{ $message }}
        </div>

        <div style="background-color: #7e7aca;color: white;padding: 10px;max-height: 200px;min-height: 100px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;display: flex !important;flex-direction: column; justify-content: space-between !important;">
            <p>&copy; 2023 Sure Trade. All rights reserved.</p>
            <p>Phone: +13322440569 | Email: hello@gamestar.exchange</p>
        </div>

    </div>

</body>

</html>
`;