import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column()
  numberOfPlace: number;

  @Column()
  description: string;

  @Column()
  ticketPrice: number;

  createtAd: Date;
  updatedAt: Date;
}
