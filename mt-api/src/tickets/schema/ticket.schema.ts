import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Ticket {
  eventId: string;
  userId: string;
  number: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export const ticketSchema = SchemaFactory.createForClass(Ticket);
