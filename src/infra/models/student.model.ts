
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Base } from "./base.model";
import { UserModel } from "./user.model";

@Entity({
  name: 'students'
})
export class StudentModel extends Base {

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

  @ManyToMany(() => UserModel, user => user.students, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  personals: UserModel[];
}
