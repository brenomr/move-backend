import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from 'src/controllers/course.controller';
import { CourseModel } from 'src/infra/models/course.model';
import { CourseRepository } from 'src/infra/repositories/course.repository';
import { CourseService } from 'src/services/course.service';


@Module({
  imports: [TypeOrmModule.forFeature([CourseModel])],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository]
})
export class CourseModule { }
