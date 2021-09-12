import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { StudentDTO } from './student.dto';


export class StudentUpdateDTO extends StudentDTO {

  @ApiProperty({
    required: true,
    type: 'uuid',
    example: 'ec77baf9-db9b-4475-b00e-6573727345d9'
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  id: string;
}
