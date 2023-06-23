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
import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

@Index("news_pk", ["id"], { unique: true })
@Index("news_id_idx", ["id"], {})
@Entity("news", { schema: "public" })

export class News {
  @ApiProperty()
  @Column("text", { name: "title" })
  title: string;

  @ApiProperty()
  @Column("text", { name: "body" })
  body: string;

  @ApiProperty()
  @Column("character varying", { name: "img_src" })
  imgSrc: string;

  @ApiProperty()
  @Column("character varying", { name: "intro", nullable: true })
  intro: string | null;

  @ApiProperty()
  @Column("date", { name: "created_at", nullable: true })
  createdAt: string | null;
  
  @Column("integer", { name: "countOpened", default:() => "0"})
  countOpened: number;

  @ApiProperty()
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ApiProperty({ type: () => NewsCategory })
  @ManyToOne(() => NewsCategory, (newsCategory) => newsCategory.news, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: NewsCategory[];
}
