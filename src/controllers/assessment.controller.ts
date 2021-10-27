import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode, Req, UseInterceptors, UnsupportedMediaTypeException, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { AssessmentDTO } from 'src/dtos/assessment.dto';
import { AssessmentResponseDTO } from 'src/dtos/assessment.response.dto';
import { AssessmentUpdateDTO } from 'src/dtos/assessment.update.dto';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { AssessmentService } from 'src/services/assessment.service';
import { fileChecker, maxFileSize } from 'src/utils/fileChecker';
import { UserRequest } from 'src/utils/interfaces';


@Controller('assessments')
export class AssessmentController {
  constructor(
    private readonly assessmentService: AssessmentService,
  ) {}

  @ApiCreatedResponse({
    type: AssessmentResponseDTO,
    description: 'Create a new assessment'
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('attached_url', {
    fileFilter: fileChecker,
    limits: maxFileSize,
  }))
  async create(
    @Body() assessmentDTO: AssessmentDTO,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {

    if (req.fileValidationError) {
      throw new UnsupportedMediaTypeException(`Invalid file type, ${req.fileValidationError}`);
    }

    if (file) {
      const { buffer, originalname } = file;

      assessmentDTO.attached_url = await this.assessmentService.uploadFile(buffer, originalname);
    }

    return await this.assessmentService.create(assessmentDTO);
  }

  @ApiOkResponse({
    type: [AssessmentResponseDTO],
    description: 'List assessments'
  })
  @Get()
  @Roles(Role.Admin, Role.Personal, Role.Student)
  @HttpCode(200)
  @ApiQuery({ name: 'page', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'limit', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'orderBy', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'order', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'name', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'student_name', allowEmptyValue: true, type: String, required: false })
  async findAll(
    @Query()
    pagination: PaginationDTO,
    @Query('name')
    name: string,
    @Query('student_name')
    student_name: string,
    @Req()
    req: UserRequest,
  ) {
    const user = req.user;
    return await this.assessmentService.findAll(
      pagination,
      name,
      student_name,
      {
        studentId: user.whois.includes('student') ? user.userId : undefined,
        personalId: user.whois.includes('personal') ? user.userId : undefined,
      }
    );
  }

  @ApiOkResponse({
    type: AssessmentResponseDTO,
    description: 'Get an assessment by id'
  })
  @Get(':id')
  @Roles(Role.Admin, Role.Personal, Role.Student)
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.assessmentService.findOne(id);
  }

  @ApiOkResponse({
    type: AssessmentResponseDTO,
    description: 'Update an assessment by id'
  })
  @ApiConsumes('multipart/form-data')
  @Put(':id')
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('attached_url', {
    fileFilter: fileChecker,
    limits: maxFileSize,
  }))
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() assessmentUpdateDTO: AssessmentUpdateDTO,
    @UploadedFile() file: Express.Multer.File
  ) {

    if (req.fileValidationError) {
      throw new UnsupportedMediaTypeException(`Invalid file type, ${req.fileValidationError}`);
    }

    if (file) {
      const { buffer, originalname } = file;

      assessmentUpdateDTO.attached_url = await this.assessmentService.uploadFile(buffer, originalname);
    }

    return await this.assessmentService.update(id, assessmentUpdateDTO);
  }

  @ApiNoContentResponse({
    description: 'Delete an assessment by id'
  })
  @Delete(':id')
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.assessmentService.remove(id);
  }
}
