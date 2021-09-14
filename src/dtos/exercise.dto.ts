import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { ActivityToRelationDTO } from './activity.dto';
import { UserToRelationDTO } from './user.dto';

export class ExerciseDTO {

  @ApiProperty({
    required: true,
    type: 'string',
    example: '10'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  @Expose()
  repetition: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '3'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  @Expose()
  serie: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '30'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  @Expose()
  breaktime: string;

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
    type: ActivityToRelationDTO,
    example: { 'id': 'a4db6f33-5d2e-40fe-8a05-c989a4c38541' }
  })
  @IsNotEmpty()
  @Type(() => ActivityToRelationDTO)
  @Expose()
  activity: ActivityToRelationDTO;
}

export class ExerciseToRelationDTO {

  @ApiProperty({
    required: true,
    type: 'uuid',
    example: '58bf3a0d-accd-44f8-880d-ee911e1dc66c'
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  id: string;
}