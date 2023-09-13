import { User } from "src/user/entities/user.entity";
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class Password {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
