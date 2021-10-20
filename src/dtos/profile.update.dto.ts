import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBase64, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class ProfileUpdateDTO {

  @ApiProperty({
    required: true,
    type: 'uuid',
    example: 'd0fa98cb-d225-4ef3-bc32-c39c7be56fb1'
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  id: string;

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'base64',
  })
  @IsOptional()
  @IsBase64()
  @MaxLength(300)
  @Expose()
  photo_url: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Penelope'
  })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  @Expose()
  nickname: string;
}
