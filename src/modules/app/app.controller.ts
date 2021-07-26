import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { } // eslint-disable-line

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
