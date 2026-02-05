import { ArticleEntity } from '../article/article.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  password: string;

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];

  @ManyToMany(() => ArticleEntity, (article) => article.likedBy)
  @JoinTable()
  favorites: ArticleEntity[];
}
