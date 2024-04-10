import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
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
}
