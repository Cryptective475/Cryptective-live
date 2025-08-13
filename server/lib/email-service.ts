import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL || 'support@cryptective.xyz',
    pass: process.env.ZOHO_PASSWORD || '7ZR6Bwq20biL'
  }
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.ZOHO_EMAIL || 'support@cryptective.xyz',
      to: options.to,
      cc: options.cc,
      subject: options.subject,
      html: options.html
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
}

export function generateInvestmentEmail(data: any) {
  return `
    <h2>New Investment Application - ${data.tier}</h2>
    <p><strong>Full Name:</strong> ${data.fullName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Preferred Contact:</strong> ${data.preferredContact}</p>
    <p><strong>Investment Amount:</strong> $${data.amount}</p>
    <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
    <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
  `;
}

export function generateRecoveryEmail(data: any) {
  return `
    <h2>New Crypto Recovery Request</h2>
    <p><strong>Full Name:</strong> ${data.fullName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    <p><strong>Loss Type:</strong> ${data.lossType}</p>
    <p><strong>Estimated Loss:</strong> $${data.estimatedLoss}</p>
    <p><strong>Cryptocurrency:</strong> ${data.cryptocurrency}</p>
    <p><strong>Incident Date:</strong> ${new Date(data.incidentDate).toLocaleDateString()}</p>
    <p><strong>Description:</strong></p>
    <p>${data.description}</p>
    <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
  `;
}

export function generateContactEmail(data: any) {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Emergency:</strong> ${data.isEmergency ? 'YES' : 'No'}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message}</p>
    <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
  `;
}

export function generateAutoReply() {
  return `
    <h2>Thank you for contacting Cryptective</h2>
    <p>We have received your message and will respond within 24 hours.</p>
    <p>For urgent matters, please mark your message as emergency.</p>
    <p>Best regards,<br>The Cryptective Team</p>
  `;
}
