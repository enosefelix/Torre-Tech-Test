import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError, map } from 'rxjs';
import { AxiosError } from 'axios';
import { DataTransformer } from '../utilities/app.utilities';
import { FetchExternalDataDto } from './dto/fetchExternalDataDto';
import { GetOpportunitiesDto } from './dto/getOpportunities';
import { GetOpportunitiesQueryDto } from './dto/getOpportunityQueryDto';

/**
 * Configuration options for external API requests.
 */
export interface ExternalApiConfig {
  searchTorrebaseUrl?: string;
  opportunitiesTorrebaseUrl?: string;
  genomeTorreBaseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
  transformResponse?: boolean;
}

/**
 * ExternalApiService - Flexible integration layer for external API calls.
 * 
 * This service provides a standardized way to interact with external APIs,
 * including error handling, logging, and optional data transformation.
 */
@Injectable()
export class ExternalApiService {
  private readonly logger = new Logger(ExternalApiService.name);
  private readonly dataTransformer: DataTransformer;
  private defaultConfig: ExternalApiConfig;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.dataTransformer = new DataTransformer();
    this.defaultConfig = {
        searchTorrebaseUrl: this.configService.get<string>('externalApi.searchTorrebaseUrl'),
        opportunitiesTorrebaseUrl: this.configService.get<string>('externalApi.opportunitiesTorrebaseUrl'),
        genomeTorreBaseUrl: this.configService.get<string>('externalApi.genomeTorreBaseUrl'),
      timeout: this.configService.get<number>('externalApi.timeout', 30000),
      headers: {
        'Content-Type': 'application/json',
      },
      transformResponse: true,
    };
  }
    
    async searchStream(dto: FetchExternalDataDto): Promise<any> {
        const url = this.buildUrl(`${this.defaultConfig.searchTorrebaseUrl}/api/entities/_searchStream`);

        const response = this.httpService.post(url, dto, {
            headers: this.defaultConfig.headers,
        }).pipe(
            map(res => {
                if (typeof res.data === 'string') {
                    return res.data
                        .split('\n')
                        .filter(line => line.trim() !== '')
                        .map(line => {
                            try {
                                return JSON.parse(line);
                            } catch (e) {
                                console.error('Failed to parse line:', line, e);
                                return null;
                            }
                        })
                        .filter(item => item !== null);
                }
                // If it's already an object/array, return it directly
                // This handles cases where the API might return standard JSON in some scenarios
                // or if axios automatically parsed it (though for NDJSON it usually returns string)
                return res.data;
            }),
            catchError((error: AxiosError) => {
                this.handleAxiosError(error, url);
            }),
        );

        return firstValueFrom(response);
    }
    
    
    async opportunities(dto: GetOpportunitiesDto, queryDto: GetOpportunitiesQueryDto): Promise<any> {
        const url = this.buildUrl(`${this.defaultConfig.opportunitiesTorrebaseUrl}/opportunities/_search`);

        console.log(this.defaultConfig.opportunitiesTorrebaseUrl);

        const response = this.httpService.post(url, {dto, queryDto}, {
            headers: this.defaultConfig.headers,
        }).pipe(
            map(res => {
                // console.log(JSON.parse(res.data));
                // console.log(JSON.stringify(res.data, null, 2));
                return res.data;
            }),
            catchError((error: AxiosError) => {
                this.handleAxiosError(error, url);
            }),
        );

        return firstValueFrom(response);
    }

    async getBio(username: string): Promise<any> {
        const url = this.buildUrl(`${this.defaultConfig.genomeTorreBaseUrl}/api/genome/bios/${username}`);
        console.log("getBio url", url);

        const response = this.httpService.get(url, {
            headers: this.defaultConfig.headers,
        }).pipe(
            map(res => res.data),
            catchError((error: AxiosError) => {
                this.handleAxiosError(error, url);
            }),
        );

        return firstValueFrom(response);
    }

  /**
   * Build the full URL from endpoint and optional base URL.
   */
  private buildUrl(endpoint: string, baseUrl?: string): string {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }

    if (baseUrl) {
      return `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    }

    return endpoint;
  }

  /**
   * Handle Axios errors and throw appropriate HTTP exceptions.
   */
  private handleAxiosError(error: AxiosError, url: string): never {
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.data || error.message || 'External API request failed';

    this.logger.error(`External API Error [${status}] at ${url}: ${JSON.stringify(message)}`);

    throw new HttpException(
      {
        statusCode: status,
        message: `External API Error: ${typeof message === 'string' ? message : JSON.stringify(message)}`,
        endpoint: url,
      },
      status,
    );
  }

  /**
   * Get the DataTransformer instance for custom transformations.
   */
  getTransformer(): DataTransformer {
    return this.dataTransformer;
  }
}
