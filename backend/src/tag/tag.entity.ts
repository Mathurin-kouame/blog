import { ArticleEntity } from '../article/article.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToMany(() => ArticleEntity, (article) => article.tags)
  articles: ArticleEntity[];
}
