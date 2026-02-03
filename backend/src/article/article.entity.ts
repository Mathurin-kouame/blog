import { TagEntity } from '../tag/tag.entity';
import { UserEntity } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  description: string;

  @Column('text')
  body: string;

  @ManyToOne(() => UserEntity, (user) => user.articles, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  author: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.favorites, {
    cascade: false,
  })
  likedBy: UserEntity[];

  @Column({ default: 0 })
  favoritesCount: number;

  @ManyToMany(() => TagEntity, (tag) => tag.articles)
  @JoinTable()
  tags: TagEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
