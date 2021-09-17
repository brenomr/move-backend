import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsDateString, IsNotEmpty } from "class-validator";
import { CourseToRelationDTO } from "./course.dto";


export class PresenceResponseDTO {

  @ApiProperty({
    format: 'uuid',
    example: 'd0fa98cb-d225-4ef3-bc32-c39c7be56fb1'
  })
  @Expose()
  id: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '2021-09-16T08:30:00.333Z'
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  presencedate: Date;

  @ApiProperty({
    required: true,
    type: 'uuid',
    example: { 'id': '14caed1d-b311-4716-9910-969e6a96b4d5' }
  })
  @IsNotEmpty()
  @Type(() => CourseToRelationDTO)
  @Expose()
  course: CourseToRelationDTO;
}

