import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'support@cryptective.xyz',
    pass: process.env.SMTP_PASSWORD || '7ZR6Bwq20biL'
  }
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string[];
}

export async function sendEmail(options: EmailOptions) {
  try {
    const result = await transporter.sendMail({
      from: 'support@cryptective.xyz',
      ...options
    });
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}

export async function sendInvestmentNotification(application: any) {
  const adminEmail = 'davecarter645@gmail.com';
  
  // Send to admin
  await sendEmail({
    to: adminEmail,
    cc: ['support@cryptective.xyz'],
    subject: `New Investment Application - ${application.tier.toUpperCase()}`,
    html: `
      <h2>New Investment Application Received</h2>
      <p><strong>Tier:</strong> ${application.tier}</p>
      <p><strong>Name:</strong> ${application.fullName}</p>
      <p><strong>Email:</strong> ${application.email}</p>
      <p><strong>Phone:</strong> ${application.phone}</p>
      <p><strong>Amount:</strong> $${application.amount}</p>
      <p><strong>Payment Method:</strong> ${application.paymentMethod}</p>
      <p><strong>Preferred Contact:</strong> ${application.preferredContact}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    `
  });

  // Send auto-reply to client
  await sendEmail({
    to: application.email,
    subject: 'Investment Application Received - Cryptective',
    html: `
      <h2>Thank you for your investment application</h2>
      <p>Dear ${application.fullName},</p>
      <p>We have received your ${application.tier} investment application for $${application.amount}.</p>
      <p>A representative will contact you within 24 hours to discuss your investment strategy and next steps.</p>
      <p>Thank you for choosing Cryptective for your cryptocurrency investment needs.</p>
      <br>
      <p>Best regards,<br>The Cryptective Team</p>
    `
  });
}

export async function sendRecoveryNotification(request: any) {
  const adminEmail = 'davecarter645@gmail.com';
  
  // Send to admin
  await sendEmail({
    to: adminEmail,
    cc: ['support@cryptective.xyz'],
    subject: `New Crypto Recovery Request - ${request.lossType}`,
    html: `
      <h2>New Crypto Recovery Request</h2>
      <p><strong>Name:</strong> ${request.fullName}</p>
      <p><strong>Email:</strong> ${request.email}</p>
      <p><strong>Phone:</strong> ${request.phone || 'Not provided'}</p>
      <p><strong>Loss Type:</strong> ${request.lossType}</p>
      <p><strong>Estimated Loss:</strong> $${request.estimatedLoss}</p>
      <p><strong>Crypto Type:</strong> ${request.cryptoType || 'Not specified'}</p>
      <p><strong>Description:</strong></p>
      <p>${request.description}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    `
  });

  // Send auto-reply to client
  await sendEmail({
    to: request.email,
    subject: 'Recovery Request Received - Cryptective',
    html: `
      <h2>Your Recovery Request Has Been Received</h2>
      <p>Dear ${request.fullName},</p>
      <p>We have received your cryptocurrency recovery request regarding ${request.lossType}.</p>
      <p><strong>Estimated Loss:</strong> $${request.estimatedLoss}</p>
      <p>Our expert recovery team will review your case and contact you within 24 hours with a detailed recovery plan.</p>
      <p><strong>What happens next:</strong></p>
      <ul>
        <li>Case review by our specialists</li>
        <li>Initial assessment call within 24 hours</li>
        <li>Detailed recovery strategy presentation</li>
        <li>No upfront fees - we only charge upon successful recovery</li>
      </ul>
      <p>Thank you for trusting Cryptective with your recovery needs.</p>
      <br>
      <p>Best regards,<br>The Cryptective Recovery Team</p>
    `
  });
}

export async function sendContactNotification(message: any) {
  const adminEmail = 'davecarter645@gmail.com';
  
  // Send to admin
  await sendEmail({
    to: adminEmail,
    cc: ['support@cryptective.xyz'],
    subject: `New Contact Message - ${message.subject}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${message.firstName} ${message.lastName}</p>
      <p><strong>Email:</strong> ${message.email}</p>
      <p><strong>Phone:</strong> ${message.phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${message.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.message}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    `
  });

  // Send auto-reply to client
  await sendEmail({
    to: message.email,
    subject: 'Message Received - Cryptective Support',
    html: `
      <h2>Thank you for contacting Cryptective</h2>
      <p>Dear ${message.firstName},</p>
      <p>We have received your message regarding "${message.subject}".</p>
      <p>A representative will reach out to you shortly with a detailed response.</p>
      <p>Our typical response time is within 2-4 hours during business hours.</p>
      <p>For urgent matters, please mark your subject as "EMERGENCY" for priority handling.</p>
      <br>
      <p>Best regards,<br>The Cryptective Support Team</p>
    `
  });
}
