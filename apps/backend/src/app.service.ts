import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@torre/shared';

@Injectable()
export class AppService {
  getHello(): ApiResponse<{ message: string }> {
    return {
      statusCode: 200,
      data: { message: 'Hello World from Torre Test Backend!' },
      timestamp: new Date().toISOString(),
      metadata: { version: '1.0.0' },
    };
  }

  getHealth(): ApiResponse<{ status: string }> {
    return {
      statusCode: 200,
      data: { status: 'healthy' },
      timestamp: new Date().toISOString(),
    };
  }
}
