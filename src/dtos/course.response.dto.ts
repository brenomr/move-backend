import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { StudentResponseDTO } from './student.response.dto';
import { TrainingResponseDTO } from './training.response.dto';

export class CourseResponseDTO {

  @ApiProperty({
    format: 'uuid',
    example: 'cc77aa1a-f28b-4514-a05c-a37a7edc6342'
  })
  @Expose()
  id: string;

  @ApiProperty({
    format: 'string',
    example: 'Treino válido por 30 dias.'
  })
  @Expose()
  description: string;

  @ApiProperty({
    format: 'date',
    example: '2021-09-15T02:01:38.333Z'
  })
  @Expose()
  startDate: Date;

  @ApiProperty({
    format: 'date',
    example: '2021-09-15T02:01:38.333Z'
  })
  @Expose()
  endDate: Date;

  @ApiProperty({
    type: StudentResponseDTO,
  })
  @Expose()
  @Type(() => StudentResponseDTO)
  student: StudentResponseDTO;

  @ApiProperty({
    type: TrainingResponseDTO,
  })
  @Expose()
  @Type(() => TrainingResponseDTO)
  training: TrainingResponseDTO;
}
