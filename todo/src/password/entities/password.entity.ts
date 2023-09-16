import 'reflect-metadata';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Password {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  // @OneToOne(() => User)
  // @JoinColumn()
  userId: number;
}
