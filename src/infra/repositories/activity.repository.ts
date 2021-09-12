import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { ActivityModel } from "../models/activity.model";


@Injectable()
export class ActivityRepository {

  constructor(
    @InjectRepository(ActivityModel)
    private activityRepository: Repository<ActivityModel>
  ) {}

  async create(data: ActivityModel): Promise<ActivityModel> {
    try {
      const newActivity = this.activityRepository.create(data);

      await this.activityRepository.save(newActivity);
      const createdActivity = await this.activityRepository.findOneOrFail(newActivity.id);

      return createdActivity;
    } catch {
      throw new Error(`Wasn't possible to create a new activity`);
    }
  }

  async findAll(
    limit: number,
    skip: number,
    orderBy: string,
    order: string,
    name: string,
    category: string,
  ): Promise<{ activities: ActivityModel[], total: number }> {
    try{
      const where = [];

      where.push({
        ...(name ? { name: ILike(`%${name}%`) } : {}),
        ...(category ? { category: ILike(`%${category}%`) } : {}),
      });

      const result = await this.activityRepository.findAndCount({
        take: limit,
        skip,
        order: {
          [orderBy]: order
        },
        where,
      });
      return { activities: result[0], total: result[1] };
    } catch {
      throw new Error(`Wasn't possible to list activities`);
    }
  }

  async findOne(id: string): Promise<ActivityModel> {
    try{
      return await this.activityRepository.findOneOrFail(id);
    } catch {
      throw new NotFoundException(
        `Wasn't possible to find an activity with the given id`
      );
    }
  }

  async update(id: string, data: ActivityModel): Promise<ActivityModel> {
    try {
      await this.activityRepository.update(id, data);
      return this.activityRepository.findOneOrFail(id);
    } catch {
      throw new Error(`Wasn't possible to update the activity with the given id`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.activityRepository.delete(id);
      return;
    } catch {
      throw new Error(`Wasn't possible remove the activity with the given id`);
    }
  }
}