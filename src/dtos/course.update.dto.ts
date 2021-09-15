import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CourseDTO } from './course.dto';

export class CourseUpdateDTO extends CourseDTO {

  @ApiProperty({
    required: true,
    type: 'uuid',
    example: '51006bb1-08c0-4120-b814-ec8c64b0e391'
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  id: string;
}
