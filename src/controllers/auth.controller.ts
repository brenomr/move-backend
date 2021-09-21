
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';


@Controller('auth')
export class AuthController {
  constructor() { }

  @ApiCreatedResponse({
    type: String,
    description: 'Login'
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}