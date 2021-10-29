import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBase64, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class StudentDTO {

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'student'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Expose()
  whois: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Daniel'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Expose()
  name: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Salva Junior'
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Expose()
  surname: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'danijunior@gmail.com'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Expose()
  email: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'senhasecreta'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Expose()
  password: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Rua XV de Novembro'
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Expose()
  street: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: '105'
  })
  @IsOptional()
  @IsString()
  @MaxLength(6)
  @Expose()
  number: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Centro'
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Expose()
  district: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Indaiatuba'
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Expose()
  city: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'SP'
  })
  @IsOptional()
  @IsString()
  @MaxLength(2)
  @Expose()
  uf: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Apartamento 25'
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Expose()
  complement: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: '13330000'
  })
  @IsOptional()
  @IsString()
  @MaxLength(8)
  @Expose()
  cep: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: '19994543355'
  })
  @IsOptional()
  @IsString()
  @MaxLength(11)
  @Expose()
  phone: string;

  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsBase64()
  @Expose()
  photo_url: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Dani'
  })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  @Expose()
  nickname: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: "[{ 'id': '77d04f2c-fde5-42f5-8ca1-7178bb4aca15' }]"
  })
  @IsNotEmpty()
  @Expose()
  personals: string;
}

export class StudentToRelationDTO {

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
