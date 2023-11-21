'use server';

import ContactFormEmail from '@/email/contact-form-email';
import { getErrorMessage, isStringValid } from '@/lib/utils';
import React from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get('senderEmail');
  const senderMessage = formData.get('senderMessage');

  if (!isStringValid(senderEmail, 500)) {
    return {
      error: 'Invalid Email',
    };
  }

  if (!isStringValid(senderMessage, 5000)) {
    return {
      error: 'Invalid Message',
    };
  }

  let data;

  try {
    data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'robin.dang@live.se',
      subject: 'Robin Dang Me',
      reply_to: senderEmail as string,
      react: React.createElement(ContactFormEmail, {
        message: senderMessage as string,
        senderEmail: senderEmail as string,
      }),
    });
  } catch (error: unknown) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }

  return {
    data,
  };
};
