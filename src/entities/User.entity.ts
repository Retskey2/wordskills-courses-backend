import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course.entity";
import { News } from "./News.entity";
import { Teacher } from "./Teacher.entity";
import { UserHasCourse } from "./UserHasCourse.entity";
import { UserProfile } from "./UserProfile.entity";

@Index("user_id_idx", ["id"], {})
@Index("user_pk", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "login" })
  login: string | null;

  @Column("character varying", { name: "password_hash" })
  passwordHash: string | null;

  @Column("character varying", { name: "email", nullable: true })
  email: string | null;

  @Column("boolean", { name: "is_confirm", nullable: true })
  isConfirm: boolean | null;

  @Column("character varying", { name: "auth_key", nullable: true })
  authKey: string | null;

  @Column({ name: 'reg_date', nullable: true })
  regDate: string | null;

  @OneToMany(() => Course, (course) => course.createdBy)
  courses: Course[];

  @OneToMany(() => News, (news) => news.createdBy)
  news: News[];

  @OneToMany(() => Teacher, (teacher) => teacher.user)
  teachers: Teacher[];

  @OneToMany(() => UserHasCourse, (userHasCourse) => userHasCourse.user)
  userHasCourses: UserHasCourse[];

  @OneToMany(() => UserProfile, (userProfile) => userProfile.user)
  userProfiles: UserProfile[];
}
