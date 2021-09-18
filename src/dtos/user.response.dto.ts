import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDTO {

  @ApiProperty({
    format: 'uuid',
    example: 'd0fa98cb-d225-4ef3-bc32-c39c7be56fb1'
  })
  @Expose()
  id: string;

  @ApiProperty({
    format: 'boolean',
    example: false
  })
  @Expose()
  admin: boolean;

  @ApiProperty({
    format: 'string',
    example: 'Rafaela'
  })
  @Expose()
  name: string;

  @ApiProperty({
    format: 'string',
    example: 'da Silva'
  })
  @Expose()
  surname: string;

  @ApiProperty({
    format: 'string',
    example: 'rafa_silva@gmail.com'
  })
  @Expose()
  email: string;

  @ApiProperty({
    format: 'string',
    example: 'CREF123456PSP'
  })
  @Expose()
  cref: string;

  @ApiProperty({
    format: 'string',
    example: 'Avenida Presidente Kennedy'
  })
  @Expose()
  street: string;

  @ApiProperty({
    format: 'string',
    example: '4563'
  })
  @Expose()
  number: string;

  @ApiProperty({
    format: 'string',
    example: 'Vila Vitória'
  })
  @Expose()
  district: string;

  @ApiProperty({
    format: 'string',
    example: 'Indaiatuba'
  })
  @Expose()
  city: string;

  @ApiProperty({
    format: 'string',
    example: 'SP'
  })
  @Expose()
  uf: string;

  @ApiProperty({
    format: 'string',
    example: 'Bloco C'
  })
  @Expose()
  complement: string;

  @ApiProperty({
    format: 'string',
    example: '13333123'
  })
  @Expose()
  cep: string;

  @ApiProperty({
    format: 'string',
    example: '19998789878'
  })
  @Expose()
  phone: string;

  @ApiProperty({
    format: 'string',
    example: 'https://anyphoto.net.example/dfaoj3fad0jpo23jlasphoto2'
  })
  @Expose()
  photo_url: string;

  @ApiProperty({
    format: 'string',
    example: 'Rafinha'
  })
  @Expose()
  nickname: string;
}
