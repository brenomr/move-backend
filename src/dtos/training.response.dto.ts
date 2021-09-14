import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ExerciseResponseDTO } from './exercise.response.dto';
import { UserResponseDTO } from './user.response.dto';

export class TrainingResponseDTO {

  @ApiProperty({
    format: 'uuid',
    example: 'bc637731-ae16-48d0-80e3-1859a37959dc'
  })
  @Expose()
  id: string;

  @ApiProperty({
    format: 'string',
    example: 'Treino Supino Pesado'
  })
  @Expose()
  title: string;

  @ApiProperty({
    format: 'string',
    example: 'Exercício deve ser feito com auxílio de outra pessoa.'
  })
  @Expose()
  description: string;

  @ApiProperty({
    type: UserResponseDTO,
  })
  @Expose()
  @Type(() => UserResponseDTO)
  personal: UserResponseDTO;

  @ApiProperty({
    type: [ExerciseResponseDTO],
  })
  @Expose()
  @Type(() => ExerciseResponseDTO)
  exercises: ExerciseResponseDTO[];
}
