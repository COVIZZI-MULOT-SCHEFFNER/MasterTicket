import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Ticket {
  @Column()
  eventId: string;
  @Column()
  userId: string;
  @Column()
  number: string;
  @Column()
  status: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;

  @PrimaryGeneratedColumn()
  _id: string;
}
