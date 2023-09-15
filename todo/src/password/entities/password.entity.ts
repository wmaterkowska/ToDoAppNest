import 'reflect-metadata';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Password {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  @OneToOne(() => User)
  userId: number;
}
