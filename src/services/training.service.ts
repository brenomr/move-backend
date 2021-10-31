import { Injectable } from '@nestjs/common';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { TrainingDTO } from 'src/dtos/training.dto';
import { TrainingResponseDTO } from 'src/dtos/training.response.dto';
import { TrainingUpdateDTO } from 'src/dtos/training.update.dto';
import { TrainingModel } from 'src/infra/models/training.model';
import { TrainingRepository } from 'src/infra/repositories/training.repository';
import { autoMapper } from 'src/utils/autoMapper';


@Injectable()
export class TrainingService {

  constructor(
    private readonly trainingRepository: TrainingRepository
  ) {}

  async create(trainingDTO: TrainingDTO) {
    const newTraining = autoMapper(TrainingModel, trainingDTO, false);
    
    const savedTraining = await this.trainingRepository.create(newTraining);

    return autoMapper(TrainingResponseDTO, savedTraining);
  }

  async findAll(
    pagination: PaginationDTO,
    title: string,
    description: string,
    personal_name: string,
    userId?: string,
  ) {
    
    // const limit = Number(pagination.limit) > 10 ? 10 : Number(pagination.limit);
    const limit = 200;
    const page = Number(pagination.page)

    const skip = (page - 1) * limit;
    const orderBy = pagination.orderBy ? pagination.orderBy : 'title';
    const order = (pagination.order.toUpperCase() === 'ASC') ? 'ASC' : 'DESC';

    const { trainings, total } = await this.trainingRepository.findAll(
      limit,
      skip,
      orderBy,
      order,
      title,
      description,
      personal_name,
      userId,
    );

    const data = autoMapper(TrainingResponseDTO, trainings);
    
    return { data, total };
  }

  async findOne(id: string) {
    const training = await this.trainingRepository.findOne(id);
    return autoMapper(TrainingResponseDTO, training);
  }

  async update(id: string, trainingUpdateDTO: TrainingUpdateDTO) {
    await this.findOne(id);

    const trainingToUpdate = autoMapper(TrainingModel, trainingUpdateDTO, false);

    const updatedTraining = await this.trainingRepository.update(id, trainingToUpdate);

    return autoMapper(TrainingResponseDTO, updatedTraining);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.trainingRepository.remove(id);

    return;
  }
}
