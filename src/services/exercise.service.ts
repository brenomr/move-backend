import { Injectable } from '@nestjs/common';
import { ExerciseDTO } from 'src/dtos/exercise.dto';
import { ExerciseResponseDTO } from 'src/dtos/exercise.response.dto';
import { ExerciseUpdateDTO } from 'src/dtos/exercise.update.dto';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { ExerciseModel } from 'src/infra/models/exercise.model';
import { ExerciseRepository } from 'src/infra/repositories/exercise.repository';
import { autoMapper } from 'src/utils/autoMapper';


@Injectable()
export class ExerciseService {

  constructor(
    private readonly exerciseRepository: ExerciseRepository
  ) {}

  async create(exerciseDTO: ExerciseDTO) {
    const newExercise = autoMapper(ExerciseModel, exerciseDTO, false);
    
    const savedExercise = await this.exerciseRepository.create(newExercise);

    return autoMapper(ExerciseResponseDTO, savedExercise);
  }

  async findAll(
    pagination: PaginationDTO,
    repetition: string,
    serie: string,
    breaktime: string,
    activity: string,
    userId?: string,
  ) {

    // const limit = Number(pagination.limit) > 10 ? 10 : Number(pagination.limit);
    const limit = 200;
    const page = Number(pagination.page)

    const skip = (page - 1) * limit;
    const orderBy = pagination.orderBy ? pagination.orderBy : 'repetition';
    const order = (pagination.order.toUpperCase() === 'ASC') ? 'ASC' : 'DESC';

    const { exercises, total } = await this.exerciseRepository.findAll(
      limit,
      skip,
      orderBy,
      order,
      repetition,
      serie,
      breaktime,
      activity,
      userId,
    );

    const data = autoMapper(ExerciseResponseDTO, exercises);
    
    return { data, total };
  }

  async findOne(id: string) {
    const exercise = await this.exerciseRepository.findOne(id);
    return autoMapper(ExerciseResponseDTO, exercise);
  }

  async update(id: string, exerciseUpdateDTO: ExerciseUpdateDTO) {
    await this.findOne(id);

    const exerciseToUpdate = autoMapper(ExerciseModel, exerciseUpdateDTO, false);

    const updatedExercise = await this.exerciseRepository.update(id, exerciseToUpdate);

    return autoMapper(ExerciseResponseDTO, updatedExercise);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.exerciseRepository.remove(id);

    return;
  }
}
