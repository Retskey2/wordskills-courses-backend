import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("review_pk", ["id"], { unique: true })
@Entity("review", { schema: "public" })
export class Review {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "heading" })
  heading: string;

  @Column("integer", { name: "rating", default: () => "5" })
  rating: number;

  @Column("text", { name: "desc" })
  desc: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("boolean", {
    name: "is_publish",
    nullable: true,
    default: () => "false",
  })
  isPublish: boolean | null;

  @Column("character varying", { name: "img_src", nullable: true })
  imgSrc: string | null;
}
