import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { StudentResponseDTO } from './student.response.dto';
import { UserResponseDTO } from './user.response.dto';

export class AssessmentResponseDTO {

  @ApiProperty({
    format: 'uuid',
    example: 'd0fa98cb-d225-4ef3-bc32-c39c7be56fb1'
  })
  @Expose()
  id: string;

  @ApiProperty({
    format: 'string',
    example: 'Anamnese Fernando'
  })
  @Expose()
  name: string;

  @ApiProperty({
    format: 'string',
    example: 'Anamnese realizada no dia 27/8 para contemplação do aluno'
  })
  @Expose()
  description: string;

  @ApiProperty({
    format: 'string',
    example: 'https://attachedfile.net.example/dfaoj3fad0jpo23jlasphoto2'
  })
  @Expose()
  attached_url: string;

  @ApiProperty({
    type: UserResponseDTO,
  })
  @Expose()
  @Type(() => UserResponseDTO)
  personal: UserResponseDTO;

  @ApiProperty({
    type: StudentResponseDTO,
  })
  @Expose()
  @Type(() => StudentResponseDTO)
  student: StudentResponseDTO;
}
