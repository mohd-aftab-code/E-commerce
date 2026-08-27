import nodemailer from "nodemailer";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

// Ensure SMTP settings are configured
const smtpOptions = {
  host: process.env.SMTP_HOST || "smtp.ethereal.email", // fallback for testing
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "test_user",
    pass: process.env.SMTP_PASS || "test_pass",
  },
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL || '"Print Studio 24" <no-reply@printstudio24.com>',
    ...data,
  });
};

export const sendOrderConfirmationEmail = async (
  customerEmail: string,
  orderId: string,
  totalAmount: number
) => {
  const subject = `Order Confirmation - #${orderId.slice(-8).toUpperCase()} | Print Studio 24`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #F3552F;">Thank you for your order!</h2>
      <p>Hi there,</p>
      <p>We have successfully received your order <strong>#${orderId.slice(-8).toUpperCase()}</strong>.</p>
      <p>Total Paid: <strong>$${(totalAmount / 100).toFixed(2)}</strong></p>
      <p>Your order is currently processing. You will receive another email once your items are printed and shipped.</p>
      <br />
      <p>Best regards,<br/>The Print Studio 24 Team</p>
    </div>
  `;

  return sendEmail({ to: customerEmail, subject, html });
};

export const sendPaymentFailedEmail = async (
  adminEmail: string,
  orderId: string,
  errorMessage: string
) => {
  const subject = `URGENT: Payment Failed for Order #${orderId.slice(-8).toUpperCase()}`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #D32F2F;">Payment Failed</h2>
      <p>A Stripe payment attempt failed for order <strong>#${orderId.slice(-8).toUpperCase()}</strong>.</p>
      <p>Error details: ${errorMessage}</p>
      <p>Please review the Stripe dashboard for more information.</p>
    </div>
  `;

  return sendEmail({ to: adminEmail, subject, html });
};
