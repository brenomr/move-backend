import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';
import { UserUpdateDTO } from 'src/dtos/usuario.update.dto';
import { UserService } from 'src/services/user.service';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() userDTO: UserDTO) {
    return await this.userService.create(userDTO);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userUpdateDTO: UserUpdateDTO) {
    return await this.userService.update(id, userUpdateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
