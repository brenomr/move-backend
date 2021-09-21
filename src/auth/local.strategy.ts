import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from "src/services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    private authService: AuthService
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    });
  }

  async validate({body}): Promise<any> {
    const user = await this.authService.validateUser(body.tag, body.email, body.password);
    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}