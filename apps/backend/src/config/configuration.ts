import { registerAs } from '@nestjs/config';

/**
 * Application configuration.
 */
export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}));

/**
 * External API configuration.
 */
export const externalApiConfig = registerAs('externalApi', () => ({
  searchTorrebaseUrl: process.env.SEARCH_TORRE_BASE_URL || '',
  opportunitiesTorrebaseUrl: process.env.OPPORTUNITIES_TORRE_BASE_URL || '',
  genomeTorreBaseUrl: process.env.GENOME_TORRE_BASE_URL || 'https://torre.ai',
  timeout: parseInt(process.env.EXTERNAL_API_TIMEOUT || '30000', 10),
  apiKey: process.env.EXTERNAL_API_KEY || '',
}));

/**
 * All configuration modules.
 */
export const configurations = [appConfig, externalApiConfig];
