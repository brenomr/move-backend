import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingController } from 'src/controllers/training.controller';
import { TrainingModel } from 'src/infra/models/training.model';
import { TrainingRepository } from 'src/infra/repositories/training.repository';
import { TrainingService } from 'src/services/training.service';


@Module({
  imports: [TypeOrmModule.forFeature([TrainingModel])],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository]
})
export class TrainingModule { }
