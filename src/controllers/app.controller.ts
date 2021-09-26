import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('whois')
  whois(@Request() req) {
    return req.user;
  }
}
