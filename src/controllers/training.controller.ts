import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { TrainingDTO } from 'src/dtos/training.dto';
import { TrainingResponseDTO } from 'src/dtos/training.response.dto';
import { TrainingUpdateDTO } from 'src/dtos/training.update.dto';
import { TrainingService } from 'src/services/training.service';


@Controller('trainings')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) {}

  @ApiCreatedResponse({
    type: TrainingResponseDTO,
    description: 'Create a new training'
  })
  @Post()
  @HttpCode(201)
  async create(@Body() trainingDTO: TrainingDTO) {
    return await this.trainingService.create(trainingDTO);
  }

  @ApiOkResponse({
    type: [TrainingResponseDTO],
    description: 'List trainings'
  })
  @Get()
  @HttpCode(200)
  @ApiQuery({ name: 'page', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'limit', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'orderBy', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'order', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'title', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'description', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'personal_name', allowEmptyValue: true, type: String, required: false })
  async findAll(
    @Query()
    pagination: PaginationDTO,
    @Query('title')
    title: string,
    @Query('description')
    description: string,
    @Query('personal_name')
    personal_name: string,
  ) {
    return await this.trainingService.findAll(
      pagination,
      title,
      description,
      personal_name,
    );
  }

  @ApiOkResponse({
    type: TrainingResponseDTO,
    description: 'Get a training by id'
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.trainingService.findOne(id);
  }

  @ApiOkResponse({
    type: TrainingResponseDTO,
    description: 'Update a training by id'
  })
  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() trainingUpdateDTO: TrainingUpdateDTO) {
    return await this.trainingService.update(id, trainingUpdateDTO);
  }

  @ApiNoContentResponse({
    description: 'Delete a training by id'
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.trainingService.remove(id);
  }
}
