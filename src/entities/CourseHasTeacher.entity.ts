import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course.entity";
import { Teacher } from "./Teacher.entity";

@Index("course_has_teacher_pk", ["id"], { unique: true })
@Index("course_has_teacher_id_idx", ["id"], {})
@Entity("course_has_teacher", { schema: "public" })
export class CourseHasTeacher {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Course, (course) => course.courseHasTeachers, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "course_id", referencedColumnName: "id" }])
  course: Course;

  @ManyToOne(() => Teacher, (teacher) => teacher.courseHasTeachers, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "teacher_id", referencedColumnName: "id" }])
  teacher: Teacher;
}
