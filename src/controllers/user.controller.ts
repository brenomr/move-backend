import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode, UseInterceptors, UploadedFile, Req, UnsupportedMediaTypeException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { ProfileUpdateDTO } from 'src/dtos/profile.update.dto';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { UserDTO } from 'src/dtos/user.dto';
import { UserResponseDTO } from 'src/dtos/user.response.dto';
import { UserUpdateDTO } from 'src/dtos/user.update.dto';
import { UserService } from 'src/services/user.service';
import { photoChecker, maxPhotoSize } from 'src/utils/fileChecker';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiCreatedResponse({
    type: UserResponseDTO,
    description: 'Create a new user'
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @Roles(Role.Admin)
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('photo_url', {
    fileFilter: photoChecker,
    limits: maxPhotoSize,
  }))
  async create(
    @Req() req: any,
    @Body() userDTO: UserDTO,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (req.fileValidationError) {
      throw new UnsupportedMediaTypeException(`Invalid file type, ${req.fileValidationError}`);
    }

    await this.userService.checkCref(userDTO.cref);
    await this.userService.checkEmail(userDTO.email);

    if (file) {
      const { buffer, originalname } = file;

      userDTO.photo_url = await this.userService.uploadFile(buffer, originalname);
    }
    else {
      userDTO.photo_url = process.env.DEFAULT_AVATAR;
    }
    
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
  @ApiConsumes('multipart/form-data')
  @Put(':id')
  @UseInterceptors(FileInterceptor('photo_url'))
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() userUpdateDTO: UserUpdateDTO) {
    return await this.userService.update(id, userUpdateDTO);
  }

  @ApiOkResponse({
    type: UserResponseDTO,
    description: 'Update an user profile by id'
  })
  @ApiConsumes('multipart/form-data')
  @Put('profile/:id')
  @UseInterceptors(FileInterceptor('photo_url', {
    fileFilter: photoChecker,
    limits: maxPhotoSize,
  }))
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  async profileUpdate(
    @Param('id') id: string,
    @Req() req: any,
    @Body() profileUpdateDTO: ProfileUpdateDTO,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (req.fileValidationError) {
      throw new UnsupportedMediaTypeException(`Invalid file type, ${req.fileValidationError}`);
    }
    if (file) {
      const { buffer, originalname } = file;

      return await this.userService.profileUpdate(id, profileUpdateDTO, buffer, originalname);
    }

    return await this.userService.profileUpdate(id, profileUpdateDTO);
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
