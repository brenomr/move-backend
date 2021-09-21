import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { StudentDTO } from 'src/dtos/student.dto';
import { StudentResponseDTO } from 'src/dtos/student.response.dto';
import { StudentUpdateDTO } from 'src/dtos/student.update.dto';
import { StudentModel } from 'src/infra/models/student.model';
import { StudentRepository } from 'src/infra/repositories/student.repository';
import { autoMapper } from 'src/utils/autoMapper';


@Injectable()
export class StudentService {

  constructor(
    private readonly studentRepository: StudentRepository
  ) {}

  async checkEmail(email: string, id?: string) {
    const result = await this.studentRepository.checkEmail(email, id);
    if(result) {
      throw new ConflictException(`Email already in use`);
    }
  }

  async create(studentDTO: StudentDTO) {
    await this.checkEmail(studentDTO.email);

    studentDTO.password = await hash(studentDTO.password, 8);

    const newStudent = autoMapper(StudentModel, studentDTO, false);
    
    const savedStudent = await this.studentRepository.create(newStudent);

    return autoMapper(StudentResponseDTO, savedStudent);
  }

  async findAll(
    pagination: PaginationDTO,
    name: string,
    email: string,
    phone: string,
  ) {
    
    const limit = Number(pagination.limit) > 10 ? 10 : Number(pagination.limit);
    const page = Number(pagination.page)

    const skip = (page - 1) * limit;
    const orderBy = pagination.orderBy ? pagination.orderBy : 'name';
    const order = pagination.order.toLocaleUpperCase()

    const { students, total } = await this.studentRepository.findAll(
      limit,
      skip,
      orderBy,
      order,
      name,
      email,
      phone,
    );

    const data = autoMapper(StudentResponseDTO, students);
    
    return { data, total };
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOne(id);
    return autoMapper(StudentResponseDTO, student);
  }

  async findByEmail(email: string) {
    return await this.studentRepository.findByEmail(email);
  }

  async update(id: string, studentUpdateDTO: StudentUpdateDTO) {
    await this.findOne(id);
    await this.checkEmail(studentUpdateDTO.email, studentUpdateDTO.id);

    const studentToUpdate = autoMapper(StudentModel, studentUpdateDTO, false);

    const updatedStudent = await this.studentRepository.update(id, studentToUpdate);

    return autoMapper(StudentResponseDTO, updatedStudent);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.studentRepository.remove(id);

    return;
  }
}
