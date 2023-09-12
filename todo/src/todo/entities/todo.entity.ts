import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  userId: string;
}
