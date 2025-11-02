import type { APIRoute } from 'astro';
import { handleFormSubmission } from '@lib/forms/handler';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const result = await handleFormSubmission({
      name: data.name,
      email: data.email,
      message: data.message,
      honeypot: data.website, // Bot trap
      timestamp: data.timestamp, // Time trap
    });

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Server error. Please try again later.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
