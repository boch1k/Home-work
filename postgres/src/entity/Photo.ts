import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, Relation, JoinColumn, Generated } from "typeorm";
import { PhotoMetadata } from "./PhotoMetadata";
import { User } from "./User";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column("text")
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;

  // @OneToOne(() => PhotoMetadata, (PhotoMetadata) => PhotoMetadata.photo,)
  // metadata: Relation<PhotoMetadata>;

  @OneToOne(() => PhotoMetadata, (metadata) => metadata.photo, { cascade: true, })
  @JoinColumn()
  metadata: Relation<PhotoMetadata>;

  @ManyToOne(() => User, (User) => User.photos, { cascade: true, })
  user: Relation<User>;

}
