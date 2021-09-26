import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { ActivityDTO } from 'src/dtos/activity.dto';
import { ActivityResponseDTO } from 'src/dtos/activity.response.dto';
import { ActivityUpdateDTO } from 'src/dtos/activity.update.dto';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { ActivityService } from 'src/services/activity.service';


@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService
  ) {}

  @ApiCreatedResponse({
    type: ActivityResponseDTO,
    description: 'Create a new activity'
  })
  @Post()
  @Roles(Role.Admin)
  @HttpCode(201)
  async create(@Body() activityDTO: ActivityDTO) {
    return await this.activityService.create(activityDTO);
  }

  @ApiOkResponse({
    type: [ActivityResponseDTO],
    description: 'List activities'
  })
  @Get()
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  @ApiQuery({ name: 'page', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'limit', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'orderBy', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'order', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'name', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'category', allowEmptyValue: true, type: String, required: false })
    async findAll(
    @Query()
    pagination: PaginationDTO,
    @Query('name')
    name: string,
    @Query('category')
    category: string,
  ) {
    return await this.activityService.findAll(
      pagination,
      name,
      category,
    );
  }

  @ApiOkResponse({
    type: ActivityResponseDTO,
    description: 'Get an activity by id'
  })
  @Get(':id')
  @Roles(Role.Admin, Role.Personal)
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.activityService.findOne(id);
  }

  @ApiOkResponse({
    type: ActivityResponseDTO,
    description: 'Update an activity by id'
  })
  @Put(':id')
  @Roles(Role.Admin)
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() activityUpdateDTO: ActivityUpdateDTO) {
    return await this.activityService.update(id, activityUpdateDTO);
  }

  @ApiNoContentResponse({
    description: 'Delete an activity by id'
  })
  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
