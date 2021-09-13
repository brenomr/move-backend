import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { StudentToRelationDTO } from './student.dto';
import { UserDTO, UserToRelationDTO } from './user.dto';

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
    example: 'https://attachedfile.net.example/dfaoj3fad0jpo23jlasphoto2'
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  @Expose()
  attached_url: string;

  @ApiProperty({
    required: true,
    type: UserToRelationDTO,
    example: { 'id': 'a4db6f33-5d2e-40fe-8a05-c989a4c38541' }
  })
  @IsNotEmpty()
  @Type(() => UserToRelationDTO)
  @Expose()
  personal: UserToRelationDTO;

  @ApiProperty({
    required: true,
    type: StudentToRelationDTO,
    example: { 'id': 'a4db6f33-5d2e-40fe-8a05-c989a4c38541' }
  })
  @IsNotEmpty()
  @Type(() => StudentToRelationDTO)
  @Expose()
  student: StudentToRelationDTO;
}
