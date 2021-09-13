
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Base } from "./base.model";
import { ExerciseModel } from "./exercise.model";
import { UserModel } from "./user.model";

@Entity({
  name: 'activities'
})
export class ActivityModel extends Base {

  @PrimaryColumn({
    type: 'uuid'
  })
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  category: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  image_url: string;

  @ManyToOne(() => UserModel, user => user.activities, {
    eager: true,
  })
  user: UserModel;

  @OneToMany(() => ExerciseModel, exercise => exercise.activity)
  exercises: ExerciseModel[];
}
