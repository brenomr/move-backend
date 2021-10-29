import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode, Req, UseInterceptors, UploadedFile, UnsupportedMediaTypeException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { ActivityDTO } from 'src/dtos/activity.dto';
import { ActivityResponseDTO } from 'src/dtos/activity.response.dto';
import { ActivityUpdateDTO } from 'src/dtos/activity.update.dto';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { ActivityService } from 'src/services/activity.service';
import { maxPhotoSize, photoChecker } from 'src/utils/fileChecker';


@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService
  ) {}

  @ApiCreatedResponse({
    type: ActivityResponseDTO,
    description: 'Create a new activity'
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @Roles(Role.Admin)
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('image_url', {
    fileFilter: photoChecker,
    limits: maxPhotoSize,
  }))
  async create(
    @Req() req: any,
    @Body() activityDTO: ActivityDTO,
    @UploadedFile() file: Express.Multer.File
  ) {
    
    if (req.fileValidationError) {
      throw new UnsupportedMediaTypeException(`Invalid file type, ${req.fileValidationError}`);
    }

    if (file) {
      const { buffer, originalname } = file;

      activityDTO.image_url = await this.activityService.uploadFile(buffer, originalname);
    }
    else {
      activityDTO.image_url = process.env.DEFAULT_ACTIVITY;
    }
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
  @ApiConsumes('multipart/form-data')
  @Put(':id')
  @Roles(Role.Admin)
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image_url', {
    fileFilter: photoChecker,
    limits: maxPhotoSize,
  }))
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() activityUpdateDTO: ActivityUpdateDTO,
    @UploadedFile() file: Express.Multer.File
  ) {

    if (req.fileValidationError) {
      throw new UnsupportedMediaTypeException(`Invalid file type, ${req.fileValidationError}`);
    }

    if (file) {
      const { buffer, originalname } = file;

      activityUpdateDTO.image_url = await this.activityService.uploadFile(buffer, originalname);
    }

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
