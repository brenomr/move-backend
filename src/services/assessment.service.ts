import { Injectable } from '@nestjs/common';
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

  async create(assessmentDTO: AssessmentDTO) {
    const newAssessment = autoMapper(AssessmentModel, assessmentDTO, false);
    
    const savedAssessment = await this.assessmentRepository.create(newAssessment);

    return autoMapper(AssessmentResponseDTO, savedAssessment);
  }

  async findAll(
    pagination: PaginationDTO,
    name: string,
    student_name: string,
  ) {
    
    const limit = Number(pagination.limit) > 10 ? 10 : Number(pagination.limit);
    const page = Number(pagination.page)

    const skip = (page - 1) * limit;
    const orderBy = pagination.orderBy ? pagination.orderBy : 'name';
    const order = pagination.order.toLocaleUpperCase()

    const { assessments, total } = await this.assessmentRepository.findAll(
      limit,
      skip,
      orderBy,
      order,
      name,
      student_name,
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
