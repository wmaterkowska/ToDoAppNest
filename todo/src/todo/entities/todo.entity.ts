import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title?: string;

  @Column()
  content: string;

  @Column({ default: false })
  done: boolean;

  @Column()
  lastChange: Date;
}
