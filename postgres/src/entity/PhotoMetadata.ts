import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Relation,
} from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column("int")
  height: number;

  @Column("int")
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;

  // @OneToOne(() => Photo, (photo) => photo.metadata, { cascade: true, })
  // @JoinColumn()
  // photo: Relation<Photo>;

  @OneToOne(() => Photo, (Photo) => Photo.metadata)
  photo: Relation<Photo>;

}
