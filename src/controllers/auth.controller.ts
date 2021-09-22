
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthService } from 'src/services/auth.service';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @ApiCreatedResponse({
    type: String,
    description: 'Login'
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req
  ) {
    return this.authService.login(req.user);
  }
}