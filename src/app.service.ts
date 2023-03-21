import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): object {
    return {
      name: 'Hello Home API',
      version: '0.0.1',
    };
  }
}
