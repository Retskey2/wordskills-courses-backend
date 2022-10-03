import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CourseHasAreasTraining } from "./CourseHasAreasTraining.entity";

@Index("areas_of_training_id_idx", ["id"], {})
@Index("areas_of_training_pk", ["id"], { unique: true })
@Entity("areas_training", { schema: "public" })
export class AreasTraining {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("character varying", { name: "code", nullable: true })
  code: string | null;

  @OneToMany(
    () => CourseHasAreasTraining,
    (courseHasAreasTraining) => courseHasAreasTraining.areasTraining
  )
  courseHasAreasTrainings: CourseHasAreasTraining[];
}
