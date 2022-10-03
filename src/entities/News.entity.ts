import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NewsCategory } from "./NewsCategory.entity";
import { User } from "./User.entity";

@Index("news_pk", ["id"], { unique: true })
@Index("news_id_idx", ["id"], {})
@Entity("news", { schema: "public" })
export class News {
  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "body" })
  body: string;

  @Column("character varying", { name: "img_src" })
  imgSrc: string;

  @Column("character varying", { name: "intro", nullable: true })
  intro: string | null;

  @Column("date", { name: "created_at", nullable: true })
  createdAt: string | null;

  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => NewsCategory, (newsCategory) => newsCategory.news, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: NewsCategory;

  @ManyToOne(() => User, (user) => user.news, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: User;
}
