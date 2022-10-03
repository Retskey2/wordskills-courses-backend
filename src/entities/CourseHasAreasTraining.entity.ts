import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AreasTraining } from "./AreasTraining.entity";
import { Course } from "./Course.entity";

@Index("course_has_areas_training_id_idx", ["id"], {})
@Index("course_has_areas_training_pk", ["id"], { unique: true })
@Entity("course_has_areas_training", { schema: "public" })
export class CourseHasAreasTraining {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(
    () => AreasTraining,
    (areasTraining) => areasTraining.courseHasAreasTrainings,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "areas_training_id", referencedColumnName: "id" }])
  areasTraining: AreasTraining;

  @ManyToOne(() => Course, (course) => course.courseHasAreasTrainings, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "course_id", referencedColumnName: "id" }])
  course: Course;
}
