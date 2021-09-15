
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Base } from "./base.model";
import { ExerciseModel } from "./exercise.model";
import { CourseModel } from "./course.model";
import { UserModel } from "./user.model";

@Entity({
  name: 'trainings'
})
export class TrainingModel extends Base {

  @PrimaryColumn({
    type: 'uuid'
  })
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  description: string;

  @ManyToOne(() => UserModel, user => user.trainings)
  personal: UserModel;

  @ManyToMany(() => ExerciseModel, exercise => exercise.trainings, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  exercises: ExerciseModel[];

  @OneToMany(() => CourseModel, course => course.training)
  courses: CourseModel[];
}
