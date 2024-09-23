import User from "@/models/User";
import { Resend } from "resend";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Check if the emailType is valid (either "VERIFY" or "RESET")
    if (emailType !== "VERIFY" && emailType !== "RESET") {
      throw new Error(
        "Invalid emailType. It should be either 'VERIFY' or 'RESET'."
      );
    }

    // create a hashed token
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });

      const mailresponse = await resend.emails.send({
        from: "dev@ravindrachoudhary.in",
        to: `${email}`,
        subject: `Market Bridge: Verify your email`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
  img {
    -ms-interpolation-mode: bicubic;
  }
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #1C658C;
  }
  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>
</head>
<body style="background-color: #EEEEEE;">
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    Verify your email address for Market Bridge - Connecting Manufacturers and Shop Owners
  </div>
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" bgcolor="#EEEEEE">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://www.marketbridge.com" target="_blank" style="display: inline-block;">
                <img src="https://via.placeholder.com/150x50?text=Market+Bridge" alt="Logo" border="0" width="150" style="display: block; width: 150px; max-width: 150px; min-width: 150px;">
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#EEEEEE">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #1C658C;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px; color: #1C658C;">Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#EEEEEE">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; color: #666;">
              <p style="margin: 0;">Thank you for joining Market Bridge, the premier B2B platform connecting manufacturers and shop owners. To get started, please confirm your email address by tapping the button below.</p>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#398AB9" style="border-radius: 6px;">
                          <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify Email</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; color: #666;">
              <p style="margin: 0;">If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="margin: 0;"><a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" target="_blank" style="color: #1C658C;">${process.env.DOMAIN}/verifyemail?token=${hashedToken}</a></p>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #1C658C;">
              <p style="margin: 0;">Best regards,<br> The Market Bridge Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#EEEEEE" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#EEEEEE" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because you registered for an account on Market Bridge. If you didn't request this, you can safely ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#EEEEEE" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">To stop receiving these emails, you can <a href="${process.env.DOMAIN}/unsubscribe?token=${hashedToken}" target="_blank" style="color: #1C658C;">unsubscribe</a> at any time.</p>
              <p style="margin: 0;">Market Bridge, 123 Business Street, City, Country</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      });
      return mailresponse;
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });

      const mailOptions = await resend.emails.send({
        from: "dev@ravindrachoudhary.in",
        to: email,
        subject: `Market Bridge: Reset your password`,
        html: `
<!DOCTYPE html>
<html>
<head>
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #EEEEEE;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #1C658C;
        }
        p {
            color: #666666;
        }
        .button {
            display: inline-block;
            margin: 10px 0;
            padding: 10px 20px;
            background-color: #398AB9;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #1C658C;
        }
        .reset-link {
            word-break: break-all;
            color: #1C658C;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset</h1>
        <p>
            You've requested to reset your password for your Market Bridge account. Click the button below to reset your password:
        </p>
        <p>
            <a class="button" href="${process.env.DOMAIN}/reset-password?token=${hashedToken}">Reset Password</a>
        </p>
        <p>
            If the button doesn't work, copy and paste the following link into your browser:
        </p>
        <p class="reset-link">${process.env.DOMAIN}/reset-password?token=${hashedToken}</p>
        <p>
            If you didn't request a password reset, please ignore this email or contact support if you have concerns.
        </p>
        <p>
            Best regards,<br>
            The Market Bridge Team
        </p>
    </div>
</body>
</html>
        `,
      });

      return mailOptions;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
