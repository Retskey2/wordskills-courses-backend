import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course.entity";

@Index("course_direction_pk", ["id"], { unique: true })
@Index("course_direction_id_idx", ["id"], {})
@Entity("course_direction", { schema: "public" })
export class CourseDirection {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("text", { name: "desc" })
  desc: string;

  @Column("character varying", { name: "img_src", nullable: true })
  imgSrc: string | null;

  @Column("character varying", { name: "icon_src", nullable: true })
  iconSrc: string | null;

  @OneToMany(() => Course, (course) => course.courseDirection)
  courses: Course[];
}
