import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { StudentDTO } from 'src/dtos/student.dto';
import { StudentResponseDTO } from 'src/dtos/student.response.dto';
import { StudentUpdateDTO } from 'src/dtos/student.update.dto';
import { StudentService } from 'src/services/student.service';


@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
  ) {}

  @ApiCreatedResponse({
    type: StudentResponseDTO,
    description: 'Create a new student'
  })
  @Post()
  @HttpCode(201)
  async create(@Body() studentDTO: StudentDTO) {
    return await this.studentService.create(studentDTO);
  }

  @ApiOkResponse({
    type: [StudentResponseDTO],
    description: 'List students'
  })
  @Get()
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
    return await this.studentService.findAll(
      pagination,
      name,
      email,
      phone
    );
  }

  @ApiOkResponse({
    type: StudentResponseDTO,
    description: 'Get a student by id'
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.studentService.findOne(id);
  }

  @ApiOkResponse({
    type: StudentResponseDTO,
    description: 'Update a student by id'
  })
  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() studentUpdateDTO: StudentUpdateDTO) {
    return await this.studentService.update(id, studentUpdateDTO);
  }

  @ApiNoContentResponse({
    description: 'Delete a student by id'
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
