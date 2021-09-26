import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { ExerciseDTO } from 'src/dtos/exercise.dto';
import { ExerciseResponseDTO } from 'src/dtos/exercise.response.dto';
import { ExerciseUpdateDTO } from 'src/dtos/exercise.update.dto';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { ExerciseService } from 'src/services/exercise.service';


@Controller('exercises')
export class ExerciseController {
  constructor(
    private readonly exerciseService: ExerciseService,
  ) {}

  @ApiCreatedResponse({
    type: ExerciseResponseDTO,
    description: 'Create a new exercise'
  })
  @Post()
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(201)
  async create(@Body() exerciseDTO: ExerciseDTO) {
    return await this.exerciseService.create(exerciseDTO);
  }

  @ApiOkResponse({
    type: [ExerciseResponseDTO],
    description: 'List exercises'
  })
  @Get()
  @Roles(Role.Admin, Role.Personal, Role.Student)
  @HttpCode(200)
  @ApiQuery({ name: 'page', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'limit', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'orderBy', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'order', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'repetition', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'serie', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'breaktime', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'activity', allowEmptyValue: true, type: String, required: false })
  async findAll(
    @Query()
    pagination: PaginationDTO,
    @Query('repetition')
    repetition: string,
    @Query('serie')
    serie: string,
    @Query('breaktime')
    breaktime: string,
    @Query('activity')
    activity: string,
  ) {
    return await this.exerciseService.findAll(
      pagination,
      repetition,
      serie,
      breaktime,
      activity,
    );
  }

  @ApiOkResponse({
    type: ExerciseResponseDTO,
    description: 'Get an exercise by id'
  })
  @Get(':id')
  @Roles(Role.Admin, Role.Personal, Role.Student)
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.exerciseService.findOne(id);
  }

  @ApiOkResponse({
    type: ExerciseResponseDTO,
    description: 'Update an exercise by id'
  })
  @Put(':id')
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() exerciseUpdateDTO: ExerciseUpdateDTO) {
    return await this.exerciseService.update(id, exerciseUpdateDTO);
  }

  @ApiNoContentResponse({
    description: 'Delete an exercise by id'
  })
  @Delete(':id')
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(id);
  }
}
