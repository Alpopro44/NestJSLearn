import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCats(): string{
    return "Bu endpoint bütün kedileri çeker";
  }

  @Get()
  getHello(): string {
    return "Hello World!"
  }
}
