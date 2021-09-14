
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { ActivityModel } from "./activity.model";
import { Base } from "./base.model";
import { TrainingModel } from "./training.model";
import { UserModel } from "./user.model";

@Entity({
  name: 'exercises'
})
export class ExerciseModel extends Base {

  @PrimaryColumn({
    type: 'uuid'
  })
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 3,
  })
  repetition: string;

  @Column({
    type: 'varchar',
    length: 3,
  })
  serie: string;

  @Column({
    type: 'varchar',
    length: 3,
  })
  breaktime: string;

  @ManyToOne(() => UserModel, user => user.exercises, {
    eager: true,
  })
  personal: UserModel;

  @ManyToOne(() => ActivityModel, activity => activity.exercises, {
    eager: true,
  })
  activity: ActivityModel;

  @ManyToMany(() => TrainingModel, training => training.exercises)
  trainings: TrainingModel[];
}
