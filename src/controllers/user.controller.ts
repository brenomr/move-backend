import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode, UseInterceptors, UploadedFile, Req, UnsupportedMediaTypeException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { UserDTO } from 'src/dtos/user.dto';
import { UserResponseDTO } from 'src/dtos/user.response.dto';
import { UserUpdateDTO } from 'src/dtos/user.update.dto';
import { UserService } from 'src/services/user.service';
import { fileChecker, maxFileSize } from 'src/utils/fileChecker';


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

  // Setting up new post endpoint for file upload
  @ApiConsumes('multipart/form-data')
  @Post('newuser')
  @UseInterceptors(FileInterceptor('photo_url', {
    fileFilter: fileChecker,
    limits: maxFileSize,
  }))
  async newUser(
    @Req() req: any,
    @Body() UserDTO: UserDTO,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (req.fileValidationError) {
      throw new UnsupportedMediaTypeException(`Invalid file type, ${req.fileValidationError}`);
    }
    console.log(UserDTO);
    console.log(file);
  }

  // Example extract from NestJS documentation
  // @Post('uploadfile')
  // @UseInterceptors(FileInterceptor('photo_url'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }

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
