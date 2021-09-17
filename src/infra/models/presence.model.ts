
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Base } from "./base.model";
import { CourseModel } from "./course.model";

@Entity({
  name: 'presences'
})
export class PresenceModel extends Base {

  @PrimaryColumn({
    type: 'uuid'
  })
  id: string = uuid();

  @Column({
    type: 'timestamp',
  })
  presencedate: Date;

  @ManyToOne(() => CourseModel, course => course.presences)
  course: CourseModel;
}
