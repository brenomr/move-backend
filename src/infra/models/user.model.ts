
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { ActivityModel } from "./activity.model";
import { AssessmentModel } from "./assessment.model";
import { Base } from "./base.model";
import { ExerciseModel } from "./exercise.model";
import { StudentModel } from "./student.model";
import { TrainingModel } from "./training.model";

@Entity({
  name: 'users'
})
export class UserModel extends Base {

  @PrimaryColumn({
    type: 'uuid'
  })
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 10,
  })
  whois: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  surname: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 13,
  })
  cref: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  street: string;

  @Column({
    type: 'varchar',
    length: 6,
  })
  number: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  district: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 2,
  })
  uf: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  complement: string;

  @Column({
    type: 'varchar',
    length: 8,
  })
  cep: string;

  @Column({
    type: 'varchar',
    length: 11,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  photo_url: string;

  @Column({
    type: 'varchar',
    length: 40,
  })
  nickname: string;

  @ManyToMany(() => StudentModel, student => student.personals)
  students: StudentModel[];

  @OneToMany(() => ActivityModel, activity => activity.user)
  activities: ActivityModel[];

  @OneToMany(() => AssessmentModel, assessment => assessment.personal)
  assessments: AssessmentModel[];

  @OneToMany(() => ExerciseModel, exercise => exercise.personal)
  exercises: ExerciseModel[];

  @OneToMany(() => TrainingModel, training => training.personal)
  trainings: TrainingModel[];
}
