import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ExerciseToRelationDTO } from './exercise.dto';
import { UserToRelationDTO } from './user.dto';

export class TrainingDTO {

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Treino Supino Pesado'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Expose()
  title: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Exercício deve ser feito com auxílio de outra pessoa.'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  @Expose()
  description: string;

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
    type: [ExerciseToRelationDTO],
    example: [
      { 'id': '77d04f2c-fde5-42f5-8ca1-7178bb4aca15' },
      { 'id': 'a4db6f33-5d2e-40fe-8a05-c989a4c38541' }
    ]
  })
  @IsNotEmpty()
  @Type(() => ExerciseToRelationDTO)
  @Expose()
  exercises: ExerciseToRelationDTO[];
}
