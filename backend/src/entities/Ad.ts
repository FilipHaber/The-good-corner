import { MinLength } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  @MinLength(10)
  description: string;

  @Column()
  owner: string;

  @Column()
  price: number;

  @Column()
  picture: string;

  @Column()
  location: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  tags: Tag[];
}
