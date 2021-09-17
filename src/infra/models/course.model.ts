
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Base } from "./base.model";
import { PresenceModel } from "./presence.model";
import { StudentModel } from "./student.model";
import { TrainingModel } from "./training.model";

@Entity({
  name: 'courses'
})
export class CourseModel extends Base {

  @PrimaryColumn({
    type: 'uuid'
  })
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 300,
  })
  description: string;

  @Column({
    type: 'timestamp',
  })
  startDate: Date;

  @Column({
    type: 'timestamp',
  })
  endDate: Date;

  @ManyToOne(() => StudentModel, student => student.courses, {
    eager: true,
  })
  student: StudentModel;

  @ManyToOne(() => TrainingModel, training => training.courses, {
    eager: true,
  })
  training: TrainingModel;

  @OneToMany(() => PresenceModel, presence => presence.course)
  presences: PresenceModel[];
}
