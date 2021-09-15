import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { StudentToRelationDTO } from './student.dto';
import { TrainingToRelationDTO } from './training.dto';

export class CourseDTO {

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Treino válido por 30 dias.'
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  @Expose()
  description: string;

  @ApiProperty({
    required: true,
    type: 'date',
    example: '2021-09-15T02:01:38.333Z'
  })
  @IsNotEmpty()
  @IsDateString()
  @Expose()
  startDate: Date;

  @ApiProperty({
    required: true,
    type: 'date',
    example: '2021-09-15T02:01:38.333Z'
  })
  @IsNotEmpty()
  @IsDateString()
  @Expose()
  endDate: Date;

  @ApiProperty({
    required: true,
    type: StudentToRelationDTO,
    example: { 'id': '14caed1d-b311-4716-9910-969e6a96b4d5' }
  })
  @IsNotEmpty()
  @Type(() => StudentToRelationDTO)
  @Expose()
  student: StudentToRelationDTO;

  @ApiProperty({
    required: true,
    type: TrainingToRelationDTO,
    example: { 'id': 'c652944b-ca84-47ab-ad37-9e7b453c287a' }
  })
  @IsNotEmpty()
  @Type(() => TrainingToRelationDTO)
  @Expose()
  training: TrainingToRelationDTO;
}

export class CourseToRelationDTO {

  @ApiProperty({
    required: true,
    type: 'uuid',
    example: '22ef226a-d88f-4ddb-b2e8-70affcef3ac9'
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  id: string;
}
