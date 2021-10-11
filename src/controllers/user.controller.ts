import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { UserDTO } from 'src/dtos/user.dto';
import { UserResponseDTO } from 'src/dtos/user.response.dto';
import { UserUpdateDTO } from 'src/dtos/user.update.dto';
import { UserService } from 'src/services/user.service';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiCreatedResponse({
    type: UserResponseDTO,
    description: 'Create a new user'
  })
  @Post()
  @Roles(Role.Admin)
  @HttpCode(201)
  async create(@Body() userDTO: UserDTO) {
    return await this.userService.create(userDTO);
  }

  @ApiOkResponse({
    type: [UserResponseDTO],
    description: 'List users'
  })
  @Get()
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  @ApiQuery({ name: 'page', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'limit', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'orderBy', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'order', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'name', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'email', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'phone', allowEmptyValue: true, type: String, required: false })
  async findAll(
    @Query()
    pagination: PaginationDTO,
    @Query('name')
    name: string,
    @Query('email')
    email: string,
    @Query('phone')
    phone: string,
  ) {
    return await this.userService.findAll(
      pagination,
      name,
      email,
      phone
    );
  }

  @ApiOkResponse({
    type: UserResponseDTO,
    description: 'Get user by id'
  })
  @Get(':id')
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOkResponse({
    type: UserResponseDTO,
    description: 'Update an user by id'
  })
  @Put(':id')
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() userUpdateDTO: UserUpdateDTO) {
    return await this.userService.update(id, userUpdateDTO);
  }

  @ApiNoContentResponse({
    description: 'Delete an user by id'
  })
  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
