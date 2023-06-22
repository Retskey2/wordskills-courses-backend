import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course.entity";
import { User } from "./User.entity";

@Entity("user_has_course", { schema: "public" })
export class UserHasCourse {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'course_id' })
  courseId: number;

  @ManyToOne(() => Course, (course) => course.userHasCourses, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
  @JoinColumn([{ name: "course_id", referencedColumnName: "id" }])
  course: Course[];

  @ManyToOne(() => User, (user) => user.userHasCourses, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User[];
}
