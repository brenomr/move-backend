import { autoMapper } from 'src/utils/autoMapper';
import { Injectable } from '@nestjs/common';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { CourseDTO } from 'src/dtos/course.dto';
import { CourseModel } from 'src/infra/models/course.model';
import { CourseResponseDTO } from 'src/dtos/course.response.dto';
import { CourseRepository } from 'src/infra/repositories/course.repository';


@Injectable()
export class CourseService {

  constructor(
    private readonly courseRepository: CourseRepository
  ) {}

  async create(courseDTO: CourseDTO) {
    const newCourse = autoMapper(CourseModel, courseDTO, false);
    
    const savedCourse = await this.courseRepository.create(newCourse);

    return autoMapper(CourseResponseDTO, savedCourse);
  }

  async findAll(
    pagination: PaginationDTO,
    description: string,
    startDate: string,
    endDate: string,
    student: string,
    student_name: string,
    training_title: string,
  ) {
    
    const limit = Number(pagination.limit) > 10 ? 10 : Number(pagination.limit);
    const page = Number(pagination.page)

    const skip = (page - 1) * limit;
    const orderBy = pagination.orderBy ? pagination.orderBy : 'startDate';
    const order = pagination.order.toLocaleUpperCase()

    const { courses, total } = await this.courseRepository.findAll(
      limit,
      skip,
      orderBy,
      order,
      description,
      startDate,
      endDate,
      student,
      student_name,
      training_title,
    );

    const data = autoMapper(CourseResponseDTO, courses);
    
    return { data, total };
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne(id);
    return autoMapper(CourseResponseDTO, course);
  }

  async update(id: string, courseDTO: CourseDTO) {
    await this.findOne(id);

    const courseToUpdate = autoMapper(CourseModel, courseDTO, false);

    const updatedCourse = await this.courseRepository.update(id, courseToUpdate);

    return autoMapper(CourseResponseDTO, updatedCourse);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.courseRepository.remove(id);

    return;
  }
}
