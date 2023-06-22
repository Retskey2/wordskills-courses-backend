import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Course } from "./Course.entity";
import { News } from "./News.entity";
import { Teacher } from "./Teacher.entity";
import { UserHasCourse } from "./UserHasCourse.entity";
import { UserProfile } from "./UserProfile.entity";
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty } from "class-validator";

@Index("user_id_idx", ["id"], {})
@Index("user_pk", ["id"], { unique: true })
@Entity("user", { schema: "public" })

export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ApiProperty()
  @Column("character varying", { name: "login" })
  login: string | null;

  @ApiProperty()
  @Column("character varying", { name: "password_hash" })
  passwordHash: string | null;

  @ApiProperty()
  @Column("boolean", { name: "is_admin", nullable: false, default: false})
  isAdmin: boolean | null;

  @ApiProperty()
  @Column("character varying", { name: "email", nullable: true })
  email: string | null;

  @ApiProperty()
  @Column("boolean", { name: "is_confirm", nullable: true, default: false })
  isConfirm: boolean | null;

  @ApiProperty()
  @Column("character varying", { name: "auth_key", nullable: true })
  authKey: string | null;

  @ApiProperty()
  @UpdateDateColumn({ name: 'reg_date' })
  regDate: string | null;

  @ApiProperty({ type: () => [Course] })
  @OneToMany(() => Course, (course) => course.createdBy)
  courses: Course[];

  @ApiProperty({ type: () => [Teacher] })
  @OneToMany(() => Teacher, (teacher) => teacher.user)
  teachers: Teacher[];

  @ApiProperty({ type: () => [UserHasCourse] })
  @OneToMany(() => UserHasCourse, (userHasCourse) => userHasCourse.user)
  userHasCourses: UserHasCourse[];

  @ApiProperty({ type: () => [UserProfile] })
  @OneToMany(() => UserProfile, (userProfile) => userProfile.user)
  userProfiles: UserProfile[];

  @ApiProperty({type: () => [Course]})
  @ManyToMany(
    () => Course, 
    course => course.users, //optional,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinTable({
    name: "user_has_course",
        joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'course_id',
          referencedColumnName: 'id',
        },
  })
  subscriptions?: Course[];
}
