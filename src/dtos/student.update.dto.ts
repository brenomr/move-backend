import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { UserToRelationDTO } from './user.dto';


export class StudentUpdateDTO {

  @ApiProperty({
    required: true,
    type: 'uuid',
    example: 'ec77baf9-db9b-4475-b00e-6573727345d9'
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  id: string;

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
    required: false,
  })
  @Exclude()
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
    example: 'https://anyphoto.net.example/dfaoj3fad0jpo23jlasphoto2'
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
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
    type: [UserToRelationDTO],
    example: [
      { 'id': '77d04f2c-fde5-42f5-8ca1-7178bb4aca15' },
      { 'id': 'a4db6f33-5d2e-40fe-8a05-c989a4c38541' }
    ]
  })
  @IsNotEmpty()
  @Type(() => UserToRelationDTO)
  @Expose()
  personals: UserToRelationDTO[];
}
