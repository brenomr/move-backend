import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Not, Repository } from "typeorm";
import { StudentModel } from "../models/student.model";


@Injectable()
export class StudentRepository {

  constructor(
    @InjectRepository(StudentModel)
    private studentRepository: Repository<StudentModel>
  ) {}

  async create(data: StudentModel): Promise<StudentModel> {
    try {
      const newStudent = this.studentRepository.create(data);

      await this.studentRepository.save(newStudent);
      const createdStudent = await this.studentRepository.findOneOrFail(newStudent.id);

      return createdStudent;
    } catch {
      throw new Error(`Wasn't possible to create a new student`)
    }
  }

  async findAll(
    limit: number,
    skip: number,
    orderBy: string,
    order: string,
    name: string,
    email: string,
    phone: string,
  ): Promise<{ students: StudentModel[], total: number }> {
    try{
      const where = [];

      where.push({
        ...(name ? { name: ILike(`%${name}%`) } : {}),
        ...(email ? { email: ILike(`%${email}%`) } : {}),
        ...(phone ? { phone: ILike(`%${phone}%`) } : {}),
      });

      const result = await this.studentRepository.findAndCount({
        take: limit,
        skip,
        order: {
          [orderBy]: order
        },
        where,
      });
      return { students: result[0], total: result[1] };
    } catch {
      throw new Error(`Wasn't possible to list students`);
    }
  }

  async findOne(id: string): Promise<StudentModel> {
    try{
      return await this.studentRepository.findOneOrFail(id);
    } catch {
      throw new NotFoundException(
        `Wasn't possible to find a student with the given id`
      );
    }
  }

  async update(id: string, data: StudentModel): Promise<StudentModel> {
    try {
      await this.studentRepository.save(data);
      return this.studentRepository.findOneOrFail(id);
    } catch {
      throw new Error(`Wasn't possible to update the student with the given id`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.studentRepository.delete(id);
      return;
    } catch {
      throw new Error(`Wasn't possible remove the student with the given id`);
    }
  }

  async checkEmail(email: string, id?: string): Promise<number> {
    try {
      const where = [];

      where.push({
        ...(email && id ? { id: Not(id), email: email } : { email: email }),
      })
      return await this.studentRepository.count({ where });
    } catch {
      throw new Error(`Could not find an email`);
    }
  }
}