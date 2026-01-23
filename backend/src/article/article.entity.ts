import { TagEntity } from '../tag/tag.entity';
import { UserEntity } from '../user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.articles, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  author: UserEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.articles)
  @JoinTable()
  tags: TagEntity[];
}
