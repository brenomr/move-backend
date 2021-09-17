import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { PresenceDTO } from 'src/dtos/presence.dto';
import { PresenceResponseDTO } from 'src/dtos/presence.response.dto';
import { PresenceService } from 'src/services/presence.service';


@Controller('presences')
export class PresenceController {
  constructor(
    private readonly presenceService: PresenceService,
  ) {}

  @ApiCreatedResponse({
    type: PresenceResponseDTO,
    description: 'Create a new presence'
  })
  @Post()
  @HttpCode(201)
  async create(@Body() presenceDTO: PresenceDTO) {
    return await this.presenceService.create(presenceDTO);
  }

  @ApiOkResponse({
    type: [PresenceResponseDTO],
    description: 'List presences'
  })
  @Get()
  @HttpCode(200)
  @ApiQuery({ name: 'page', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'limit', allowEmptyValue: true, type: Number, required: false })
  @ApiQuery({ name: 'orderBy', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'order', allowEmptyValue: true, type: String, required: false })
  @ApiQuery({ name: 'presencedate', allowEmptyValue: true, type: Date, required: false })
  async findAll(
    @Query()
    pagination: PaginationDTO,
    @Query('presencedate')
    presencedate: string,
  ) {
    return await this.presenceService.findAll(
      pagination,
      presencedate,
    );
  }

  @ApiOkResponse({
    type: PresenceResponseDTO,
    description: 'Get a presence by id'
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.presenceService.findOne(id);
  }

  @ApiNoContentResponse({
    description: 'Delete a presence by id'
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.presenceService.remove(id);
  }
}
