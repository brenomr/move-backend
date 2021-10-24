import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { AssessmentModel } from "../models/assessment.model";


@Injectable()
export class AssessmentRepository {

  constructor(
    @InjectRepository(AssessmentModel)
    private assessmentRepository: Repository<AssessmentModel>
  ) {}

  async create(data: AssessmentModel): Promise<AssessmentModel> {
    try {
      const newAssessment = this.assessmentRepository.create(data);

      await this.assessmentRepository.save(newAssessment);
      const createdAssessment = await this.assessmentRepository.findOneOrFail(newAssessment.id);

      return createdAssessment;
    } catch {
      throw new Error(`Wasn't possible to create a new assessment`)
    }
  }

  async findAll(
    limit: number,
    skip: number,
    orderBy: string,
    order: string,
    name: string,
    student_name: string,
    {
      studentId,
      personalId,
    }
  ): Promise<{ assessments: AssessmentModel[], total: number }> {
    try{
      const where = [];

      where.push({
        ...(studentId ? { student: { id: studentId }} : {}),
        ...(personalId ? { personal: { id: personalId }} : {}),
        ...(name ? { name: ILike(`%${name}%`) } : {}),
        ...(student_name ? { student: { name: ILike(`%${student_name}%`) } } : {}),
      });

      const result = await this.assessmentRepository.findAndCount({
        take: limit,
        skip,
        order: {
          [orderBy]: order
        },
        where,
        relations: ["student", "personal"],
      });
      return { assessments: result[0], total: result[1] };
    } catch {
      throw new Error(`Wasn't possible to list assessments`);
    }
  }

  async findOne(id: string): Promise<AssessmentModel> {
    try{
      return await this.assessmentRepository.findOneOrFail(id, {
        relations: ["student", "personal"],
      });
    } catch {
      throw new NotFoundException(
        `Wasn't possible to find an assessment with the given id`
      );
    }
  }

  async update(id: string, data: AssessmentModel): Promise<AssessmentModel> {
    try {
      await this.assessmentRepository.save(data);
      return this.assessmentRepository.findOneOrFail(id);
    } catch {
      throw new Error(`Wasn't possible to update the assessment with the given id`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.assessmentRepository.delete(id);
      return;
    } catch {
      throw new Error(`Wasn't possible remove the assessment with the given id`);
    }
  }
}