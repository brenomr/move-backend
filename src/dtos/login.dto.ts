import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDTO {

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'bobbyesponja@email.com'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Expose()
  email: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Mysecretpassword#123'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Expose()
  password: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'personal'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  @Expose()
  whois: string;
}
