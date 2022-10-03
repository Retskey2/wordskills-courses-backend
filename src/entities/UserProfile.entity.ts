import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("user_profile", { schema: "public" })
export class UserProfile {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "fname", nullable: true })
  fname: string | null;

  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

  @Column("character varying", { name: "lname", nullable: true })
  lname: string | null;

  @Column("date", { name: "bitrh_date", nullable: true })
  bitrhDate: string | null;

  @Column("text", { name: "bio", nullable: true })
  bio: string | null;

  @Column("text", { name: "edu_place", nullable: true })
  eduPlace: string | null;

  @ManyToOne(() => User, (user) => user.userProfiles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })

  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
