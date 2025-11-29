import { z } from 'zod';

const envSchema = z.object({
  // Sanity (required)
  PUBLIC_SANITY_PROJECT_ID: z.string().min(1, 'Sanity Project ID is required'),
  PUBLIC_SANITY_DATASET: z.string().min(1, 'Sanity Dataset is required'),
  PUBLIC_SANITY_API_VERSION: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'API version must be in YYYY-MM-DD format'),
  SANITY_API_TOKEN: z.string().optional(),

  // Site
  PUBLIC_SITE_URL: z.string().url('Site URL must be a valid URL'),

  // Optional
  PUBLIC_ANALYTICS_ID: z.string().optional(),
  PUBLIC_SENTRY_DSN: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // Form providers (at least one should be configured)
  RESEND_API_KEY: z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  POSTMARK_API_KEY: z.string().optional(),
  FORM_RECIPIENT_EMAIL: z.string().email().optional(),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('\n');
      throw new Error(
        `Environment validation failed:\n${missingVars}\n\nCheck your .env file and compare with .env.example`
      );
    }
    throw error;
  }
}

export const env = validateEnv();
