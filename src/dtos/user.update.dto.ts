import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UserUpdateDTO {

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
    required: true,
    type: 'string',
    example: 'personal'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Expose()
  whois: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Rafaela'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Expose()
  name: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'da Silva'
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Expose()
  surname: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'rafa_silva@gmail.com'
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
    required: true,
    type: 'string',
    example: 'CREF123456PSP'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  @Expose()
  cref: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Avenida Presidente Kennedy'
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Expose()
  street: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: '4563'
  })
  @IsOptional()
  @IsString()
  @MaxLength(6)
  @Expose()
  number: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Vila Vitória'
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
    example: 'Bloco C'
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Expose()
  complement: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: '13333123'
  })
  @IsOptional()
  @IsString()
  @MaxLength(8)
  @Expose()
  cep: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: '19998789878'
  })
  @IsOptional()
  @IsString()
  @MaxLength(11)
  @Expose()
  phone: string;

  @ApiProperty({
    required: false,
  })
  @Exclude()
  photo_url: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Rafinha'
  })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  @Expose()
  nickname: string;
}
