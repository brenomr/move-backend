import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentController } from 'src/controllers/assessment.controller';
import { AssessmentModel } from 'src/infra/models/assessment.model';
import { AssessmentRepository } from 'src/infra/repositories/assessment.repository';
import { AssessmentService } from 'src/services/assessment.service';

@Module({
  imports: [TypeOrmModule.forFeature([AssessmentModel])],
  controllers: [AssessmentController],
  providers: [AssessmentService, AssessmentRepository]
})
export class AssessmentModule { }
