import { Controller, Get } from '@nestjs/common';


@Controller('users')
export class AppController {
  @Get('healthcheck')
  healthCheck() {
    return { result: 'healty' };
  }
}
