import { Controller, Get, Post, Query, Body, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { ApiResponse } from '@torre/shared';
import { FetchExternalDataDto } from './dto/fetchExternalDataDto';
import { GetOpportunitiesDto } from './dto/getOpportunities';
import { GetOpportunitiesQueryDto } from './dto/getOpportunityQueryDto';

/**
 * ExternalServiceController - Exposes endpoints to interact with external APIs.
 * 
 * All responses are wrapped in the standardized ApiResponse format.
 */
@Controller('external')
export class ExternalServiceController {
  constructor(private readonly externalApiService: ExternalApiService) {}


  /**
   * Health check for external API connectivity.
   * 
   * @returns ApiResponse with service status
   */
  @Get('health')
  getHealth(): ApiResponse<{ status: string; service: string }> {
    return {
      statusCode: HttpStatus.OK,
      data: {
        status: 'operational',
        service: 'ExternalApiService',
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Post('/search')
  async search(@Body() dto: FetchExternalDataDto): Promise<ApiResponse<any>> {
    try {
      const response = await this.externalApiService.searchStream(dto);

      console.log("response", response);

      // return response;
      return {
        statusCode: HttpStatus.OK,
        data: response,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  @Post('/opportunities/search')
  async opportunities(
    @Query() query: GetOpportunitiesQueryDto,
    @Body() dto: GetOpportunitiesDto) {
    try {
      const response = await this.externalApiService.opportunities(dto, query);

      console.log("dto", dto);
      console.log("response", response);

      // return dto;
      return {
        statusCode: HttpStatus.OK,
        data: response,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  @Get('/bios/:username')
  async getBio(@Param('username') username: string) {
    try {
      const response = await this.externalApiService.getBio(username);
        
      return {
        statusCode: HttpStatus.OK,
        data: response,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
        return this.handleError(error);
    }
  }

  /**
   * Handle errors and return ApiResponse format.
   */
  private handleError(error: any): never {
    const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'An error occurred while fetching external data';

    throw new HttpException(
      {
        data: null,
        timestamp: new Date().toISOString(),
        metadata: {
          error: true,
          message,
        },
      },
      statusCode,
    );
  }
}
