import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { News } from "./News.entity";

@Index("news_category_pk", ["id"], { unique: true })
@Index("news_category_id_idx", ["id"], {})
@Entity("news_category", { schema: "public" })
export class NewsCategory {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("text", { name: "desc", nullable: true })
  desc: string | null;

  @Column("character varying", { name: "img_src", nullable: true })
  imgSrc: string | null;

  @Column("character varying", { name: "icon_src", nullable: true })
  iconSrc: string | null;

  @OneToMany(() => News, (news) => news.category)
  news: News[];
}
