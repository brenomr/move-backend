import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { StudentService } from './student.service';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt'

interface User {
  id: string,
  name: string,
  whois: string,
  avatar: string,
}

@Injectable()
export class AuthService {

  constructor(
    private readonly studentService: StudentService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) { }


  async validateUser(tag: string, email: string, password: string): Promise<any> {
    const user: User = {id: '', name: '', whois: '', avatar: ''};
    let result: any;

    if(tag === 'student') {
      result = await this.studentService.findByEmail(email);
    }
    else if(tag === 'personal') {
      result = await this.userService.findByEmail(email);
    }
    else {
      throw new BadRequestException(`Error on tag provided`)
    }

    const passwordMatch = await compare(password, result.password);

    if(!passwordMatch) {
      throw new ConflictException(`Email or password incorrect`);
    }

    user.id = result.id;
    user.name = result.name;
    user.whois = result.whois;
    user.avatar = result.photo_url;

    return user;
  }

  async login(user: any){
    const payload = { username: user.name, sub: user.id, whois: user.whois, avatar: user.avatar };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
