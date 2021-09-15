import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CourseDTO } from 'src/dtos/course.dto';
import { CourseResponseDTO } from 'src/dtos/course.response.dto';
import { CourseUpdateDTO } from 'src/dtos/course.update.dto';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { CourseService } from 'src/services/course.service';



@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
  ) {}

  @ApiCreatedResponse({
    type: CourseResponseDTO,
    description: 'Create a new course'
  })
  @Post()
  @HttpCode(201)
  async create(@Body() courseDTO: CourseDTO) {
    return await this.courseService.create(courseDTO);
  }

  @ApiOkResponse({
    type: [CourseResponseDTO],
    description: 'List courses'
  })
  @Get()
  @HttpCode(200)
  @ApiQuery({ name: 'page', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'limit', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'orderBy', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'order', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'description', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'startDate', allowEmptyValue: true, type: Date, required: false })
  @ApiQuery({ name: 'endDate', allowEmptyValue: true, type: Date, required: false })
  @ApiQuery({ name: 'student_name', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'training_title', allowEmptyValue: true, type: String, required: false })
  async findAll(
    @Query()
    pagination: PaginationDTO,
    @Query('description')
    description: string,
    @Query('startDate')
    startDate: string,
    @Query('endDate')
    endDate: string,
    @Query('student_name')
    student_name: string,
    @Query('training_title')
    training_title: string,
  ) {
    return await this.courseService.findAll(
      pagination,
      description,
      startDate,
      endDate,
      student_name,
      training_title,
    );
  }

  @ApiOkResponse({
    type: CourseResponseDTO,
    description: 'Get a course by id'
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(id);
  }

  @ApiOkResponse({
    type: CourseResponseDTO,
    description: 'Update a course by id'
  })
  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() courseUpdateDTO: CourseUpdateDTO) {
    return await this.courseService.update(id, courseUpdateDTO);
  }

  @ApiNoContentResponse({
    description: 'Delete a course by id'
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
