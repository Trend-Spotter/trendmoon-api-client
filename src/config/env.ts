import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  TRENDMOON_API_KEY: z.string(),
  TRENDMOON_API_URL: z.string(),
});

/**
 * Validates that an environment variable is defined
 * @param name - The environment variable name
 * @param value - The environment variable value
 * @returns The validated value
 * @throws Error if the variable is not defined
 */
function validateEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Environment variable ${name} is required but not defined`);
  }
  return value;
}

/**
 * Environment configuration with necessary variables for Trendmoon API
 */
export const config = {
  // API key required for authentication
  TRENDMOON_API_KEY: validateEnvVar('TRENDMOON_API_KEY', process.env.TRENDMOON_API_KEY),

  // API URL with default value for QA environment
  TRENDMOON_API_URL: process.env.TRENDMOON_API_URL || 'https://api.qa.trendmoon.ai',
} as const;

// Environment schema validation
envSchema.parse(config);

export default config;