
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { Public } from 'src/auth/public.decorator';
import { LoginDTO } from 'src/dtos/login.dto';
import { AuthService } from 'src/services/auth.service';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @ApiCreatedResponse({
    type: LoginDTO,
    description: 'Login'
  })
  @ApiBody({
    type: LoginDTO
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}