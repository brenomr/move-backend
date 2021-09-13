import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ActivityResponseDTO } from './activity.response.dto';
import { UserResponseDTO } from './user.response.dto';

export class ExerciseResponseDTO {

  @ApiProperty({
    format: 'uuid',
    example: 'd0fa98cb-d225-4ef3-bc32-c39c7be56fb1'
  })
  @Expose()
  id: string;

  @ApiProperty({
    format: 'string',
    example: '10'
  })
  @Expose()
  repetition: string;

  @ApiProperty({
    format: 'string',
    example: '3'
  })
  @Expose()
  serie: string;

  @ApiProperty({
    format: 'string',
    example: '3'
  })
  @Expose()
  breaktime: string;

  @ApiProperty({
    type: UserResponseDTO,
  })
  @Expose()
  @Type(() => UserResponseDTO)
  personal: UserResponseDTO;

  @ApiProperty({
    type: ActivityResponseDTO,
  })
  @Expose()
  @Type(() => ActivityResponseDTO)
  activity: ActivityResponseDTO;
}
