import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBase64, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { UserToRelationDTO } from './user.dto';

export class ActivityDTO {

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Abdominal'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Expose()
  name: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Musculação'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Expose()
  category: string;

  @ApiProperty({
    required: false,
    type: 'string'
  })
  @IsOptional()
  @IsBase64()
  @MaxLength(300)
  @Expose()
  image_url: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: "{ 'id': '77d04f2c-fde5-42f5-8ca1-7178bb4aca15' }"
  })
  @IsNotEmpty()
  @Expose()
  user: string;
}

export class ActivityToRelationDTO {

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
