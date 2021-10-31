import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { StudentDTO } from 'src/dtos/student.dto';
import { StudentResponseDTO } from 'src/dtos/student.response.dto';
import { StudentUpdateDTO } from 'src/dtos/student.update.dto';
import { StudentModel } from 'src/infra/models/student.model';
import { StudentRepository } from 'src/infra/repositories/student.repository';
import { autoMapper } from 'src/utils/autoMapper';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ProfileUpdateDTO } from 'src/dtos/profile.update.dto';


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

  async uploadFile(dataBuffer: Buffer, fileName: string): Promise<string> {
    try {
      const s3 = new S3();

      const uploadResult = await s3.upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: `photo/avatar-${uuid()}-${fileName}`,
        ContentType: 'image/jpeg'
      }).promise();

      return uploadResult.Location;
    } catch(err) {
      throw new Error(`Something went wrong trying to upload the photo`);
    }
  }

  async create(studentDTO: StudentDTO) {
    studentDTO.password = await hash(studentDTO.password, 8);
    studentDTO.personals = JSON.parse(studentDTO.personals);

    const newStudent = autoMapper(StudentModel, studentDTO, false);
    
    const savedStudent = await this.studentRepository.create(newStudent);

    return autoMapper(StudentResponseDTO, savedStudent);
  }

  async findAll(
    pagination: PaginationDTO,
    name: string,
    email: string,
    phone: string,
    userId?: string,
  ) {
    
    // const limit = Number(pagination.limit) > 10 ? 10 : Number(pagination.limit);
    const limit = 200;
    const page = Number(pagination.page)

    const skip = (page - 1) * limit;
    const orderBy = pagination.orderBy ? pagination.orderBy : 'name';
    const order = (pagination.order.toUpperCase() === 'ASC') ? 'ASC' : 'DESC';

    const { students, total } = await this.studentRepository.findAll(
      limit,
      skip,
      orderBy,
      order,
      name,
      email,
      phone,
      userId,
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
    studentUpdateDTO.personals = JSON.parse(studentUpdateDTO.personals);

    const studentToUpdate = autoMapper(StudentModel, studentUpdateDTO, false);

    const updatedStudent = await this.studentRepository.update(id, studentToUpdate);

    return autoMapper(StudentResponseDTO, updatedStudent);
  }

  async profileUpdate(
    id: string,
    profileUpdate: ProfileUpdateDTO,
    buffer?: Buffer,
    originalname?: string
    ) {

    const student = await this.findOne(id);

    if (buffer && originalname) {
      student.photo_url = await this.uploadFile(buffer, originalname);
    }

    if(profileUpdate.nickname) {
      student.nickname = profileUpdate.nickname;
    }

    const studentToUpdate = autoMapper(StudentModel, student, false);

    const updatedStudent = await this.studentRepository.update(id, studentToUpdate);

    return autoMapper(StudentResponseDTO, updatedStudent);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.studentRepository.remove(id);

    return;
  }
}
