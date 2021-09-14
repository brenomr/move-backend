import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { TrainingModel } from "../models/training.model";


@Injectable()
export class TrainingRepository {

  constructor(
    @InjectRepository(TrainingModel)
    private trainingRepository: Repository<TrainingModel>
  ) {}

  async create(data: TrainingModel): Promise<TrainingModel> {
    try {
      const newTraining = this.trainingRepository.create(data);

      await this.trainingRepository.save(newTraining);
      const createdTraining = await this.trainingRepository.findOneOrFail(newTraining.id);

      return createdTraining;
    } catch {
      throw new Error(`Wasn't possible to create a new training`)
    }
  }

  async findAll(
    limit: number,
    skip: number,
    orderBy: string,
    order: string,
    title: string,
    description: string,
    personal_name: string,
  ): Promise<{ trainings: TrainingModel[], total: number }> {
    try{
      const where = [];

      where.push({
        ...(title ? { title: ILike(`%${title}%`) } : {}),
        ...(description ? { description: ILike(`%${description}%`) } : {}),
        ...(personal_name ? { personal: { name: ILike(`%${personal_name}%`) } } : {}),
      });

      const result = await this.trainingRepository.findAndCount({
        take: limit,
        skip,
        order: {
          [orderBy]: order
        },
        where,
        relations: ["personal", "exercises"],
      });
      return { trainings: result[0], total: result[1] };
    } catch {
      throw new Error(`Wasn't possible to list trainings`);
    }
  }

  async findOne(id: string): Promise<TrainingModel> {
    try{
      return await this.trainingRepository.findOneOrFail(id, {
        relations: ["personal", "exercises"],
      });
    } catch {
      throw new NotFoundException(
        `Wasn't possible to find an exercise with the given id`
      );
    }
  }

  async update(id: string, data: TrainingModel): Promise<TrainingModel> {
    try {
      await this.trainingRepository.save(data);
      return this.trainingRepository.findOneOrFail(id);
    } catch {
      throw new Error(`Wasn't possible to update the training with the given id`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.trainingRepository.delete(id);
      return;
    } catch {
      throw new Error(`Wasn't possible remove the training with the given id`);
    }
  }
}