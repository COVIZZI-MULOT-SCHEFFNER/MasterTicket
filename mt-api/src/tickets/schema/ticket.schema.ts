import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class Ticket {
  @Prop()
  eventId: string;
  @Prop()
  userId: string;
  @Prop()
  number: string;
  @Prop()
  status: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;

  @Prop()
  _id: string;
}
