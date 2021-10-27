import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { AssessmentDTO } from 'src/dtos/assessment.dto';
import { AssessmentResponseDTO } from 'src/dtos/assessment.response.dto';
import { AssessmentUpdateDTO } from 'src/dtos/assessment.update.dto';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { AssessmentModel } from 'src/infra/models/assessment.model';
import { AssessmentRepository } from 'src/infra/repositories/assessment.repository';
import { autoMapper } from 'src/utils/autoMapper';


@Injectable()
export class AssessmentService {

  constructor(
    private readonly assessmentRepository: AssessmentRepository
  ) {}

  async uploadFile(dataBuffer: Buffer, fileName: string): Promise<string> {
    try {
      const s3 = new S3();

      const uploadResult = await s3.upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: `assessments/file-${uuid()}-${fileName}`,
      }).promise();

      return uploadResult.Location;
    } catch(err) {
      throw new Error(`Something went wrong trying to upload the file`);
    }
  }

  async create(assessmentDTO: AssessmentDTO) {
    assessmentDTO.student = JSON.parse(assessmentDTO.student);
    assessmentDTO.personal = JSON.parse(assessmentDTO.personal);
    const newAssessment = autoMapper(AssessmentModel, assessmentDTO, false);
    
    const savedAssessment = await this.assessmentRepository.create(newAssessment);

    return autoMapper(AssessmentResponseDTO, savedAssessment);
  }

  async findAll(
    pagination: PaginationDTO,
    name: string,
    student_name: string,
    {
      studentId,
      personalId,
    }
  ) {
    
    const limit = Number(pagination.limit) > 10 ? 10 : Number(pagination.limit);
    const page = Number(pagination.page)

    const skip = (page - 1) * limit;
    const orderBy = pagination.orderBy ? pagination.orderBy : 'name';
    const order = (pagination.order.toUpperCase() === 'ASC') ? 'ASC' : 'DESC';

    const { assessments, total } = await this.assessmentRepository.findAll(
      limit,
      skip,
      orderBy,
      order,
      name,
      student_name,
      {
        studentId,
        personalId,
      }
    );

    const data = autoMapper(AssessmentResponseDTO, assessments);
    
    return { data, total };
  }

  async findOne(id: string) {
    const assessment = await this.assessmentRepository.findOne(id);
    return autoMapper(AssessmentResponseDTO, assessment);
  }

  async update(id: string, assessmentUpdateDTO: AssessmentUpdateDTO) {
    await this.findOne(id);
    assessmentUpdateDTO.student = JSON.parse(assessmentUpdateDTO.student);
    assessmentUpdateDTO.personal = JSON.parse(assessmentUpdateDTO.personal);

    const assessmentToUpdate = autoMapper(AssessmentModel, assessmentUpdateDTO, false);

    const updatedAssessment = await this.assessmentRepository.update(id, assessmentToUpdate);

    return autoMapper(AssessmentResponseDTO, updatedAssessment);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.assessmentRepository.remove(id);

    return;
  }
}
