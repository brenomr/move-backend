import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDTO } from './user.response.dto';

export class ActivityResponseDTO {

  @ApiProperty({
    format: 'uuid',
    example: 'd0fa98cb-d225-4ef3-bc32-c39c7be56fb1'
  })
  @Expose()
  id: string;

  @ApiProperty({
    format: 'string',
    example: 'Abdominal'
  })
  @Expose()
  name: string;

  @ApiProperty({
    format: 'string',
    example: 'Musculação'
  })
  @Expose()
  category: string;

  @ApiProperty({
    format: 'string',
    example: 'https://anyphoto.net.example/dfaoj3fad0jpo23jlasphoto2'
  })
  @Expose()
  image_url: string;

  @ApiProperty({
    type: UserResponseDTO,
  })
  @Expose()
  @Type(() => UserResponseDTO)
  user: UserResponseDTO;
}
