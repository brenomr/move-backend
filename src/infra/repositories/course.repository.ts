import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { CourseModel } from "../models/course.model";


@Injectable()
export class CourseRepository {

  constructor(
    @InjectRepository(CourseModel)
    private courseRepository: Repository<CourseModel>
  ) {}

  async create(data: CourseModel): Promise<CourseModel> {
    try {
      const newCourse = this.courseRepository.create(data);

      await this.courseRepository.save(newCourse);
      const createdCourse = await this.courseRepository.findOneOrFail(newCourse.id);

      return createdCourse;
    } catch {
      throw new Error(`Wasn't possible to create a new course`)
    }
  }

  async findAll(
    limit: number,
    skip: number,
    orderBy: string,
    order: string,
    description: string,
    startDate: string,
    endDate: string,
    student: string,
    student_name: string,
    training_title: string,
  ): Promise<{ courses: CourseModel[], total: number }> {
    try{
      const where = [];

      where.push({
        ...(description ? { description: ILike(`%${description}%`) } : {}),
        ...(startDate ? { startDate: startDate } : {}),
        ...(endDate ? { endDate: endDate } : {}),
        ...(student ? { student: { id: student } } : {}),
        ...(student_name ? { student: { name: ILike(`%${student_name}%`) } } : {}),
        ...(training_title ? { trainings: { title: ILike(`%${training_title}%`) } } : {}),
      });

      const result = await this.courseRepository.findAndCount({
        take: limit,
        skip,
        order: {
          [orderBy]: order
        },
        where,
        relations: ["student", "training"],
      });
      return { courses: result[0], total: result[1] };
    } catch {
      throw new Error(`Wasn't possible to list courses`);
    }
  }

  async listByPersonal(
    limit: number,
    skip: number,
    orderBy: string,
    order: 'ASC' | 'DESC',
    user: string,
  ): Promise<{ courses: CourseModel[], total: number }> {
    try{
      const result = await this.courseRepository
        .createQueryBuilder("courses")
        .leftJoinAndSelect("courses.student", "student")
        .leftJoinAndSelect("courses.training", "training")
        .where(qb => {
          const subQuery = qb.subQuery()
            .select("spu.studentsId")
            .from("students_personals_users", "spu")
            .where("spu.usersId = :user")
            .getQuery()
          return "courses.studentId IN " + subQuery;
        })
        .setParameter("user", user)
        .take(limit)
        .skip(skip)
        .orderBy(`courses.${orderBy}`, `${order}`)
        .getManyAndCount();

        return { courses: result[0], total: result[1] };
    } catch {
      throw new Error(`Wasn't possible to list training by personal`);
    }
  }

  async findOne(id: string): Promise<CourseModel> {
    try{
      return await this.courseRepository.findOneOrFail(id, {
        relations: ["student", "training"],
      });
    } catch {
      throw new NotFoundException(
        `Wasn't possible to find a course with the given id`
      );
    }
  }

  async update(id: string, data: CourseModel): Promise<CourseModel> {
    try {
      await this.courseRepository.save(data);
      return this.courseRepository.findOneOrFail(id);
    } catch {
      throw new Error(`Wasn't possible to update the course with the given id`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.courseRepository.delete(id);
      return;
    } catch {
      throw new Error(`Wasn't possible remove the course with the given id`);
    }
  }
}