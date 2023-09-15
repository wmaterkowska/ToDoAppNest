import { Todo } from "src/todo/entities/todo.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Password } from "src/password/entities/password.entity";

@Unique(["email"])
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @OneToOne(() => Password)
  @JoinColumn()
  password: string;

  @OneToMany(type => Todo, todo => todo.userId)
  todos: Todo[]


}
