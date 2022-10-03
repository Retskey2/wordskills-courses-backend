import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CourseHasTeacher } from "./CourseHasTeacher.entity";
import { User } from "./User.entity";

@Index("teacher_pk", ["id"], { unique: true })
@Index("teacher_id_idx", ["id"], {})
@Entity("teacher", { schema: "public" })
export class Teacher {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "fname" })
  fname: string;

  @Column("character varying", { name: "lname" })
  lname: string;

  @Column("text", { name: "desc", nullable: true })
  desc: string | null;

  @Column("character varying", { name: "email", nullable: true })
  email: string | null;

  @Column("character varying", { name: "img_src", nullable: true })
  imgSrc: string | null;

  @OneToMany(
    () => CourseHasTeacher,
    (courseHasTeacher) => courseHasTeacher.teacher
  )
  courseHasTeachers: CourseHasTeacher[];

  @ManyToOne(() => User, (user) => user.teachers, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
