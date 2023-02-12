
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique([ 'title' ])
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  category: string;

  @Column()
  backgroundStory: string;

  @Column()
  exampleQuote: string;

  @Column()
  synopsis: string;

  @Column()
  price: number;

  @Column()
  coverImage: string;
}
