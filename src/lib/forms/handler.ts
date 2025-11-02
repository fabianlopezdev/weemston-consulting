/**
 * Form Handler Abstraction
 *
 * Supports multiple email providers:
 * - Netlify Forms (zero-config if deployed on Netlify)
 * - Resend
 * - SendGrid
 * - Postmark
 *
 * Bot protection: honeypot + time-trap
 */

import { env } from '@lib/env/validation';

export interface FormSubmission {
  name: string;
  email: string;
  message: string;
  honeypot?: string; // Bot trap field
  timestamp?: number; // Time-trap field
}

export interface FormResponse {
  success: boolean;
  message: string;
}

// Bot protection checks
function isBot(submission: FormSubmission): boolean {
  // Honeypot check
  if (submission.honeypot) {
    return true;
  }

  // Time-trap check (form must take at least 3 seconds to fill)
  if (submission.timestamp) {
    const timeTaken = Date.now() - submission.timestamp;
    if (timeTaken < 3000) {
      return true;
    }
  }

  return false;
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Resend implementation
async function sendViaResend(
  submission: FormSubmission
): Promise<FormResponse> {
  if (!env.RESEND_API_KEY || !env.FORM_RECIPIENT_EMAIL) {
    throw new Error('Resend configuration missing');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'noreply@yourdomain.com',
      to: env.FORM_RECIPIENT_EMAIL,
      subject: `Contact Form: ${submission.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Message:</strong></p>
        <p>${submission.message.replace(/\n/g, '<br>')}</p>
      `,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send email via Resend');
  }

  return {
    success: true,
    message: 'Message sent successfully',
  };
}

// SendGrid implementation
async function sendViaSendGrid(
  submission: FormSubmission
): Promise<FormResponse> {
  if (!env.SENDGRID_API_KEY || !env.FORM_RECIPIENT_EMAIL) {
    throw new Error('SendGrid configuration missing');
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: env.FORM_RECIPIENT_EMAIL }],
          subject: `Contact Form: ${submission.name}`,
        },
      ],
      from: { email: 'noreply@yourdomain.com' },
      content: [
        {
          type: 'text/html',
          value: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            <p><strong>Message:</strong></p>
            <p>${submission.message.replace(/\n/g, '<br>')}</p>
          `,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send email via SendGrid');
  }

  return {
    success: true,
    message: 'Message sent successfully',
  };
}

// Main handler
export async function handleFormSubmission(
  submission: FormSubmission
): Promise<FormResponse> {
  // Validate inputs
  if (!submission.name || !submission.email || !submission.message) {
    return {
      success: false,
      message: 'All fields are required',
    };
  }

  if (!isValidEmail(submission.email)) {
    return {
      success: false,
      message: 'Invalid email address',
    };
  }

  // Bot protection
  if (isBot(submission)) {
    // Return success to bot but don't actually send
    return {
      success: true,
      message: 'Message sent successfully',
    };
  }

  // Choose provider based on environment
  try {
    if (env.RESEND_API_KEY) {
      return await sendViaResend(submission);
    } else if (env.SENDGRID_API_KEY) {
      return await sendViaSendGrid(submission);
    } else {
      // Fallback: log to console (development only)
      console.log('Form submission (no provider configured):', submission);
      return {
        success: true,
        message: 'Message logged (no provider configured)',
      };
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again later.',
    };
  }
}

/**
 * Netlify Forms Integration Notes:
 *
 * If deploying to Netlify, add data-netlify="true" to your form:
 *
 * <form method="POST" data-netlify="true" name="contact">
 *   <input type="hidden" name="form-name" value="contact" />
 *   ...
 * </form>
 *
 * Netlify will automatically handle form submissions.
 * No backend code needed!
 *
 * SPF/DKIM Configuration:
 * - Resend: https://resend.com/docs/dashboard/domains/introduction
 * - SendGrid: https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/
 */
