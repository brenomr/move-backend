import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { ExerciseModel } from "../models/exercise.model";


@Injectable()
export class ExerciseRepository {

  constructor(
    @InjectRepository(ExerciseModel)
    private exerciseRepository: Repository<ExerciseModel>
  ) {}

  async create(data: ExerciseModel): Promise<ExerciseModel> {
    try {
      const newExercise = this.exerciseRepository.create(data);

      await this.exerciseRepository.save(newExercise);
      const createdExercise = await this.exerciseRepository.findOneOrFail(newExercise.id);

      return createdExercise;
    } catch {
      throw new Error(`Wasn't possible to create a new exercise`)
    }
  }

  async findAll(
    limit: number,
    skip: number,
    orderBy: string,
    order: string,
    repetition: string,
    serie: string,
    breaktime: string,
    activity: string,
  ): Promise<{ exercises: ExerciseModel[], total: number }> {
    try{
      const where = [];

      where.push({
        ...(repetition ? { repetition: ILike(`%${repetition}%`) } : {}),
        ...(serie ? { serie: ILike(`%${serie}%`) } : {}),
        ...(breaktime ? { breaktime: ILike(`%${breaktime}%`) } : {}),
        ...(activity ? { activity: { name: ILike(`%${activity}%`) } } : {}),
      });

      const result = await this.exerciseRepository.findAndCount({
        take: limit,
        skip,
        order: {
          [orderBy]: order
        },
        where,
        relations: ["personal", "activity"],
      });
      return { exercises: result[0], total: result[1] };
    } catch {
      throw new Error(`Wasn't possible to list exercises`);
    }
  }

  async findOne(id: string): Promise<ExerciseModel> {
    try{
      return await this.exerciseRepository.findOneOrFail(id, {
        relations: ["activity", "personal"],
      });
    } catch {
      throw new NotFoundException(
        `Wasn't possible to find an exercise with the given id`
      );
    }
  }

  async update(id: string, data: ExerciseModel): Promise<ExerciseModel> {
    try {
      await this.exerciseRepository.save(data);
      return this.exerciseRepository.findOneOrFail(id);
    } catch {
      throw new Error(`Wasn't possible to update the exercise with the given id`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.exerciseRepository.delete(id);
      return;
    } catch {
      throw new Error(`Wasn't possible remove the exercise with the given id`);
    }
  }
}