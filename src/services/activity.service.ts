import { Injectable } from '@nestjs/common';
import { ActivityDTO } from 'src/dtos/activity.dto';
import { ActivityResponseDTO } from 'src/dtos/activity.response.dto';
import { ActivityUpdateDTO } from 'src/dtos/activity.update.dto';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { ActivityModel } from 'src/infra/models/activity.model';
import { ActivityRepository } from 'src/infra/repositories/activity.repository';
import { autoMapper } from 'src/utils/autoMapper';


@Injectable()
export class ActivityService {

  constructor(
    private readonly activityRepositoty: ActivityRepository
  ) {}

  async create(activityDTO: ActivityDTO) {
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
    return await this.activityRepositoty.findOne(id);
  }

  async update(id: string, activityUpdateDTO: ActivityUpdateDTO) {
    await this.findOne(id);

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
