import 'reflect-metadata';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Todo } from "src/todo/entities/todo.entity";
import { Password } from "src/password/entities/password.entity";
import { IsUniqueColumn } from 'src/shared/UniqueValidation';

@Entity()
@Unique(["email"])
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  @IsUniqueColumn({ message: "Error" })
  email: string;

  @OneToOne(() => Password)
  @JoinColumn({ name: "id" })
  password: Password;

  @OneToMany(type => Todo, todo => todo.userId)
  todos: Todo[]

}
