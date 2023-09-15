import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  title?: string;

  @Column()
  content: string;

  @Column({ default: false })
  done?: boolean;

  @Column({ default: new Date() })
  lastChange: Date;

  @ManyToOne(type => User, user => user.id)
  userId: number;
}
