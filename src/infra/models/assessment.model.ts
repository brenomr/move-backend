
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Base } from "./base.model";
import { StudentModel } from "./student.model";
import { UserModel } from "./user.model";

@Entity({
  name: 'assessments'
})
export class AssessmentModel extends Base {

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
    length: 100,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  attached_url: string;

  @ManyToOne(() => UserModel, user => user.assessments, {
    cascade: true,
  })
  personal: UserModel;

  @ManyToOne(() => StudentModel, student => student.assessments, {
    cascade: true,
  })
  student: StudentModel;
}
