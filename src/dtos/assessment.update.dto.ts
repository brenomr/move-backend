import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { AssessmentDTO } from './assessment.dto';

export class AssessmentUpdateDTO extends AssessmentDTO {

  @ApiProperty({
    required: true,
    type: 'uuid',
    example: 'fd584676-abb5-4262-8186-293fbc52acdf'
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  id: string;
}
