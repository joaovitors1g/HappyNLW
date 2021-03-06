import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Image from './Image';
import User from './User';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, (image) => image.orphanage, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({
    name: 'orphanage_id',
  })
  images: Image[];

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.orphanages, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
