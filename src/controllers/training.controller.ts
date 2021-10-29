import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { TrainingDTO } from 'src/dtos/training.dto';
import { TrainingResponseDTO } from 'src/dtos/training.response.dto';
import { TrainingUpdateDTO } from 'src/dtos/training.update.dto';
import { TrainingService } from 'src/services/training.service';
import { UserRequest } from 'src/utils/interfaces';


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
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(201)
  async create(@Body() trainingDTO: TrainingDTO) {
    return await this.trainingService.create(trainingDTO);
  }

  @ApiOkResponse({
    type: [TrainingResponseDTO],
    description: 'List trainings'
  })
  @Get()
  @Roles(Role.Admin, Role.Personal)
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
    @Req()
    req: UserRequest,
  ) {
    const user = req.user;
    return await this.trainingService.findAll(
      pagination,
      title,
      description,
      personal_name,
      user.whois.includes('personal') ? user.userId : undefined,
    );
  }

  @ApiOkResponse({
    type: TrainingResponseDTO,
    description: 'Get a training by id'
  })
  @Get(':id')
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.trainingService.findOne(id);
  }

  @ApiOkResponse({
    type: TrainingResponseDTO,
    description: 'Update a training by id'
  })
  @Put(':id')
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() trainingUpdateDTO: TrainingUpdateDTO) {
    return await this.trainingService.update(id, trainingUpdateDTO);
  }

  @ApiNoContentResponse({
    description: 'Delete a training by id'
  })
  @Delete(':id')
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.trainingService.remove(id);
  }
}
