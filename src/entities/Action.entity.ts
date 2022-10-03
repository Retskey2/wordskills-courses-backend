import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("action_pk", ["id"], { unique: true })
@Entity("action", { schema: "public" })
export class Action {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "desc", nullable: true })
  desc: string | null;

  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("time without time zone", { name: "time", nullable: true })
  time: string | null;

  @Column("character varying", { name: "img_src", length: 255 })
  imgSrc: string;

  @Column("text", { name: "body" })
  body: string;

  @Column("character varying", { name: "link", nullable: true })
  link: string | null;

  @Column("integer", { name: "created_by", nullable: true })
  createdBy: number | null;
}
