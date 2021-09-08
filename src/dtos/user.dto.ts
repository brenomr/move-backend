import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UserDTO {

  @ApiProperty({
    required: true,
    type: 'boolean',
    example: false
  })
  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  admin: boolean;

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
    required: true,
    type: 'string',
    example: 'T5bal:3sL1-#'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Expose()
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
    example: 'Rafinha'
  })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  @Expose()
  nickname: string;
}
