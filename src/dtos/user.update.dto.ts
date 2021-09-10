import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UserDTO } from './user.dto';

export class UserUpdateDTO extends UserDTO {

  @ApiProperty({
    required: true,
    type: 'uuid',
    example: 'd0fa98cb-d225-4ef3-bc32-c39c7be56fb1'
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  id: string;
}
