import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class tagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
