import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { TrainingDTO } from './training.dto';

export class TrainingUpdateDTO extends TrainingDTO {

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
