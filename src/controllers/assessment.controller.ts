import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { AssessmentDTO } from 'src/dtos/assessment.dto';
import { AssessmentResponseDTO } from 'src/dtos/assessment.response.dto';
import { AssessmentUpdateDTO } from 'src/dtos/assessment.update.dto';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { AssessmentService } from 'src/services/assessment.service';


@Controller('assessments')
export class AssessmentController {
  constructor(
    private readonly assessmentService: AssessmentService,
  ) {}

  @ApiCreatedResponse({
    type: AssessmentResponseDTO,
    description: 'Create a new assessment'
  })
  @Post()
  @HttpCode(201)
  async create(@Body() assessmentDTO: AssessmentDTO) {
    return await this.assessmentService.create(assessmentDTO);
  }

  @ApiOkResponse({
    type: [AssessmentResponseDTO],
    description: 'List assessments'
  })
  @Get()
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
  ) {
    return await this.assessmentService.findAll(
      pagination,
      name,
      student_name,
    );
  }

  @ApiOkResponse({
    type: AssessmentResponseDTO,
    description: 'Get an assessment by id'
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.assessmentService.findOne(id);
  }

  @ApiOkResponse({
    type: AssessmentResponseDTO,
    description: 'Update an assessment by id'
  })
  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() assessmentUpdateDTO: AssessmentUpdateDTO) {
    return await this.assessmentService.update(id, assessmentUpdateDTO);
  }

  @ApiNoContentResponse({
    description: 'Delete an assessment by id'
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.assessmentService.remove(id);
  }
}
