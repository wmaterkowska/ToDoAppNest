import { User } from "src/user/entities/user.entity";
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

  @Column({ default: new Date() })
  lastChange: Date;

  @Column()
  userId: string;
}
