import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExternalApiService } from './external-api.service';
import { ExternalServiceController } from './external-service.controller';

/**
 * ExternalModule - Encapsulates all external API integration components.
 * 
 * This module provides:
 * - HttpModule for making HTTP requests via Axios
 * - ExternalApiService for standardized external API calls
 * - ExternalServiceController for REST endpoints
 */
@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
    }),
  ],
  controllers: [ExternalServiceController],
  providers: [ExternalApiService],
  exports: [ExternalApiService],
})
export class ExternalModule {}
