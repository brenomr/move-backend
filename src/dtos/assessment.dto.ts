import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBase64, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class AssessmentDTO {

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Anamnese Fernando'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Expose()
  name: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Anamnese realizada no dia 27/8 para contemplação do aluno'
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Expose()
  description: string;

  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsBase64()
  @Expose()
  attached_url: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: "{ 'id': '77d04f2c-fde5-42f5-8ca1-7178bb4aca15' }"
  })
  @IsNotEmpty()
  @Expose()
  personal: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: "{ 'id': '77d04f2c-fde5-42f5-8ca1-7178bb4aca15' }"
  })
  @IsNotEmpty()
  @Expose()
  student: string;
}
