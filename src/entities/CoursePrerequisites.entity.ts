import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course.entity";

@Index("course_prerequisites_id_idx", ["id"], {})
@Index("course_prerequisites_pk", ["id"], { unique: true })
@Entity("course_prerequisites", { schema: "public" })
export class CoursePrerequisites {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Course, (course) => course.coursePrerequisites, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "course_id", referencedColumnName: "id" }])
  course: Course;

  @ManyToOne(() => Course, (course) => course.coursePrerequisites2, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "prerequisit_id", referencedColumnName: "id" }])
  prerequisit: Course;
}
