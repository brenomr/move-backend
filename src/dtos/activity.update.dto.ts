import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBase64, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ActivityDTO } from './activity.dto';

export class ActivityUpdateDTO extends ActivityDTO {

  @ApiProperty({
    required: true,
    type: 'uuid',
    example: 'fd584676-abb5-4262-8186-293fbc52acdf'
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
  @Expose()
  image_url: string;
}
