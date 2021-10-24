import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserToRelationResponseDTO } from './user.response.dto';

export class StudentResponseDTO {

  @ApiProperty({
    format: 'uuid',
    example: 'bc637731-ae16-48d0-80e3-1859a37959dc'
  })
  @Expose()
  id: string;

  @ApiProperty({
    format: 'string',
    example: 'student'
  })
  @Expose()
  whois: string;

  @ApiProperty({
    format: 'string',
    example: 'Marcelo'
  })
  @Expose()
  name: string;

  @ApiProperty({
    format: 'string',
    example: 'Fernandes'
  })
  @Expose()
  surname: string;

  @ApiProperty({
    format: 'string',
    example: 'marcelof@gmail.com'
  })
  @Expose()
  email: string;

  @ApiProperty({
    format: 'string',
    example: 'Rua 13 de Maio'
  })
  @Expose()
  street: string;

  @ApiProperty({
    format: 'string',
    example: '750'
  })
  @Expose()
  number: string;

  @ApiProperty({
    format: 'string',
    example: 'Centro'
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
    example: 'Sala 25'
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
    example: 'Marcel'
  })
  @Expose()
  nickname: string;

  @ApiProperty({
    type: [UserToRelationResponseDTO],
  })
  @Expose()
  @Type(() => UserToRelationResponseDTO)
  personals: UserToRelationResponseDTO[];
}

export class StudentToRelationResponseDTO {

  @ApiProperty({
    format: 'uuid',
    example: 'bc637731-ae16-48d0-80e3-1859a37959dc'
  })
  @Expose()
  id: string;

  @ApiProperty({
    format: 'string',
    example: 'student'
  })
  @Expose()
  whois: string;

  @ApiProperty({
    format: 'string',
    example: 'Marcelo'
  })
  @Expose()
  name: string;
}
