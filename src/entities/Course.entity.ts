import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CourseDirection } from "./CourseDirection.entity";
import { User } from "./User.entity";
import { CourseHasAreasTraining } from "./CourseHasAreasTraining.entity";
import { CourseHasTeacher } from "./CourseHasTeacher.entity";
import { CoursePrerequisites } from "./CoursePrerequisites.entity";
import { UserHasCourse } from "./UserHasCourse.entity";
import { ArrayNotEmpty } from "class-validator";

@Index("course_pk", ["id"], { unique: true })
@Index("course_id_idx", ["id"], {})
@Entity("course", { schema: "public" })
export class Course {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("text", { name: "desc" })
  desc: string;

  @Column("character varying", { name: "price" })
  price: string;

  @Column("character varying", { name: "price_discount" })
  priceDiscount: string;

  @Column("integer", { name: "hours_in_week" })
  hoursInWeek: number;

  @Column("integer", { name: "course_duration_month", default: () => "6" })
  courseDurationMonth: number;

  @Column("boolean", { name: "is_online", default: () => "false" })
  isOnline: boolean;

  @Column("character varying", { name: "img_src", nullable: true })
  imgSrc: string | null;

  @Column("date", { name: "date_start", nullable: true })
  dateStart: string | null;

  @Column("date", { name: "date_end", nullable: true })
  dateEnd: string | null;

  @Column("date", { name: "created_at", nullable: true })
  createdAt: string | null;

  @Column("boolean", {
    name: "is_popular",
    nullable: true,
    default: () => "false",
  })
  isPopular: boolean | null;

  @ManyToOne(
    () => CourseDirection,
    (courseDirection) => courseDirection.courses,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "course_direction_id", referencedColumnName: "id" }])
  courseDirection: CourseDirection;

  @ManyToOne(() => User, (user) => user.courses, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;

  @OneToMany(
    () => CourseHasAreasTraining,
    (courseHasAreasTraining) => courseHasAreasTraining.course
  )
  courseHasAreasTrainings: CourseHasAreasTraining[];

  @OneToMany(
    () => CourseHasTeacher,
    (courseHasTeacher) => courseHasTeacher.course
  )
  courseHasTeachers: CourseHasTeacher[];

  @OneToMany(
    () => CoursePrerequisites,
    (coursePrerequisites) => coursePrerequisites.course
  )
  coursePrerequisites: CoursePrerequisites[];

  @OneToMany(
    () => CoursePrerequisites,
    (coursePrerequisites) => coursePrerequisites.prerequisit
  )
  coursePrerequisites2: CoursePrerequisites[];

  @OneToMany(() => UserHasCourse, (userHasCourse) => userHasCourse.course)
  userHasCourses: UserHasCourse[];

  @ManyToMany(() => User, 
  user => user.subscriptions,
  {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',}
  )
  users?: User[];
}
