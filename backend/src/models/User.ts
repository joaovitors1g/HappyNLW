import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Orphanage from './Orphanage';
import bcrypt from 'bcryptjs';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar_url: string;

  @Column()
  password_hash: string;

  @Column({
    insert: false,
    select: false,
  })
  password: string;

  // @Column()
  // verified: boolean;

  @OneToMany(() => Orphanage, (orphanage) => orphanage.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({
    name: 'user_id',
  })
  orphanages: Orphanage[];

  @BeforeInsert()
  async hashPassword() {
    console.log(this);
    this.password_hash = await bcrypt.hash(this.password, 8);
  }
}
