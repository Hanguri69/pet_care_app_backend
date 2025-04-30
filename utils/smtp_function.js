const nodemailer = require("nodemailer");

async function sendMail(userEmail, otpCode) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: userEmail,
    subject: "🛡️ Баталгаажуулах код | Тэжээвэр амьтан систем",
    html: `
    <!DOCTYPE html>
    <html lang="mn">
    <head>
      <meta charset="UTF-8" />
      <title>Баталгаажуулах код</title>
    </head>
    <body style="margin:0; padding:20px; background-color:#f0f4f8; font-family: 'Noto Sans', Arial, sans-serif;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; border-collapse:collapse;">
        <tr>
          <td style="background-color:#0033A0; padding:20px; text-align:center;">
            <h1 style="color:#ffffff; font-size:24px; margin:0;">🐾 Тэжээвэр амьтны систем</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:30px; color:#333333;">
            <p style="font-size:16px; margin-bottom:10px;">Сайн байна уу?</p>
            <p style="font-size:14px; margin-bottom:20px;">Таны бүртгэл баталгаажуулах OTP код:</p>
            <div style="display:inline-block; background-color:#FF6B35; color:#ffffff; font-size:22px; font-weight:bold; letter-spacing:2px; padding:12px 24px; border-radius:4px; margin-bottom:20px;">
              ${otpCode}
            </div>
            <p style="font-size:12px; color:#777777; margin-top:0;">
              Энэхүү код 10 минутын дотор хүчинтэй.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#f9f9f9; padding:15px; text-align:center; font-size:12px; color:#999999;">
            © 2025 Тэжээвэр амьтны систем. Бүх эрх хуулиар хамгаалагдсан.
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendMail;
