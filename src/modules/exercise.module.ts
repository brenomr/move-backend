import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseController } from 'src/controllers/exercise.controller';
import { ExerciseModel } from 'src/infra/models/exercise.model';
import { ExerciseRepository } from 'src/infra/repositories/exercise.repository';
import { ExerciseService } from 'src/services/exercise.service';


@Module({
  imports: [TypeOrmModule.forFeature([ExerciseModel])],
  controllers: [ExerciseController],
  providers: [ExerciseService, ExerciseRepository]
})
export class ExerciseModule { }
