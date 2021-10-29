import { Injectable } from '@nestjs/common';
import { ActivityDTO } from 'src/dtos/activity.dto';
import { ActivityResponseDTO } from 'src/dtos/activity.response.dto';
import { ActivityUpdateDTO } from 'src/dtos/activity.update.dto';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { ActivityModel } from 'src/infra/models/activity.model';
import { ActivityRepository } from 'src/infra/repositories/activity.repository';
import { autoMapper } from 'src/utils/autoMapper';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';


@Injectable()
export class ActivityService {

  constructor(
    private readonly activityRepositoty: ActivityRepository
  ) {}

  async uploadFile(dataBuffer: Buffer, fileName: string): Promise<string> {
    try {
      const s3 = new S3();

      const uploadResult = await s3.upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: `activities/image-${uuid()}-${fileName}`,
        ContentType: 'image/jpeg'
      }).promise();

      return uploadResult.Location;
    } catch(err) {
      throw new Error(`Something went wrong trying to upload the image`);
    }
  }

  async create(activityDTO: ActivityDTO) {
    activityDTO.user = JSON.parse(activityDTO.user);
    const newActivity = autoMapper(ActivityModel, activityDTO, false);
    
    const savedActivity = await this.activityRepositoty.create(newActivity);

    return autoMapper(ActivityResponseDTO, savedActivity);
  }

  async findAll(
    pagination: PaginationDTO,
    name: string,
    category: string,
  ) {
    
    const limit = Number(pagination.limit) > 10 ? 10 : Number(pagination.limit);
    const page = Number(pagination.page)

    const skip = (page - 1) * limit;
    const orderBy = pagination.orderBy ? pagination.orderBy : 'name';
    const order = pagination.order.toLocaleUpperCase()

    const { activities, total } = await this.activityRepositoty.findAll(
      limit,
      skip,
      orderBy,
      order,
      name,
      category,
    );

    const data = autoMapper(ActivityResponseDTO, activities);
    
    return { data, total };
  }

  async findOne(id: string) {
    const activity = await this.activityRepositoty.findOne(id);
    return autoMapper(ActivityResponseDTO, activity);
  }

  async update(id: string, activityUpdateDTO: ActivityUpdateDTO) {
    const activityFound = await this.findOne(id);
    
    activityUpdateDTO.user = JSON.parse(activityUpdateDTO.user);

    if(!activityUpdateDTO.image_url) {
      activityUpdateDTO.image_url = activityFound.image_url;
    }

    const activityToUpdate = autoMapper(ActivityModel, activityUpdateDTO, false);

    const updatedActivity = await this.activityRepositoty.update(id, activityToUpdate);

    return autoMapper(ActivityResponseDTO, updatedActivity);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.activityRepositoty.remove(id);

    return;
  }
}
