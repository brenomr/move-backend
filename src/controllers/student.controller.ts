import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode, UseInterceptors, Req, UploadedFile, UnsupportedMediaTypeException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { ProfileUpdateDTO } from 'src/dtos/profile.update.dto';
import { StudentDTO } from 'src/dtos/student.dto';
import { StudentResponseDTO } from 'src/dtos/student.response.dto';
import { StudentUpdateDTO } from 'src/dtos/student.update.dto';
import { StudentService } from 'src/services/student.service';
import { maxPhotoSize, photoChecker } from 'src/utils/fileChecker';
import { UserRequest } from 'src/utils/interfaces';


@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
  ) {}

  @ApiCreatedResponse({
    type: StudentResponseDTO,
    description: 'Create a new student',
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('photo_url', {
    fileFilter: photoChecker,
    limits: maxPhotoSize,
  }))
  async create(
    @Req() req: any,
    @Body() studentDTO: StudentDTO,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (req.fileValidationError) {
      throw new UnsupportedMediaTypeException(`Invalid file type, ${req.fileValidationError}`);
    }

    await this.studentService.checkEmail(studentDTO.email);

    if (file) {
      const { buffer, originalname } = file;

      studentDTO.photo_url = await this.studentService.uploadFile(buffer, originalname);
    }
    else {
      studentDTO.photo_url = process.env.DEFAULT_AVATAR;
    }

    return await this.studentService.create(studentDTO);
  }

  @ApiOkResponse({
    type: [StudentResponseDTO],
    description: 'List students'
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
    @Req()
    req: UserRequest,
  ) {
    const user = req.user;
    return await this.studentService.findAll(
      pagination,
      name,
      email,
      phone,
      user.whois.includes('personal') ? user.userId : undefined,
    );
  }

  @ApiOkResponse({
    type: StudentResponseDTO,
    description: 'Get a student by id'
  })
  @Get(':id')
  @Roles(Role.Admin, Role.Personal, Role.Student)
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.studentService.findOne(id);
  }

  @ApiOkResponse({
    type: StudentResponseDTO,
    description: 'Update a student by id'
  })
  @ApiConsumes('multipart/form-data')
  @Put(':id')
  @UseInterceptors(FileInterceptor('photo_url'))
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() studentUpdateDTO: StudentUpdateDTO) {
    return await this.studentService.update(id, studentUpdateDTO);
  }

  @ApiOkResponse({
    type: StudentResponseDTO,
    description: 'Update a student profile by id'
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

      return await this.studentService.profileUpdate(id, profileUpdateDTO, buffer, originalname);
    }

    return await this.studentService.profileUpdate(id, profileUpdateDTO);
  }

  @ApiNoContentResponse({
    description: 'Delete a student by id'
  })
  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
