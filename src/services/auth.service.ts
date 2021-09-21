import { ConflictException, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { StudentService } from './student.service';
import { UserService } from './user.service';

interface User {
  id: string,
  name: string,
  admin?: boolean,
}

@Injectable()
export class AuthService {

  constructor(
    private readonly studentService: StudentService,
    private readonly userService: UserService,
  ) { }


  async validateUser(tag: string, email: string, password: string): Promise<any> {
    const user: User = {id: '', name: '', admin: undefined};
    let result: any;

    if(tag === 'student') {
      result = await this.studentService.findByEmail(email);
    }
    else {
      result = await this.userService.findByEmail(email);
    }

    const passwordMatch = await compare(password, result.password);

    if(!passwordMatch) {
      throw new ConflictException(`Email or password incorrect`);
    }

    user.id = result.id;
    user.name = result.name;
    user.admin = result.admin;

    return user;
  }
}
