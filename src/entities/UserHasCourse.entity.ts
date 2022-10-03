import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course.entity";
import { User } from "./User.entity";

@Index("user_has_course_pk", ["id"], { unique: true })
@Index("user_has_course_id_idx", ["id"], {})
@Entity("user_has_course", { schema: "public" })
export class UserHasCourse {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Course, (course) => course.userHasCourses, {
    onDelete: "CASCADE",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "course_id", referencedColumnName: "id" }])
  course: Course;

  @ManyToOne(() => User, (user) => user.userHasCourses, {
    onDelete: "CASCADE",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
