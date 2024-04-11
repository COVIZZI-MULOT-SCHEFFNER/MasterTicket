import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class tickets {
  @Prop()
  eventId: string;

  @Prop()
  userId: string;

  @Prop()
  number: string;

  @Prop()
  status: string;

  createdAt: Date;
  updatedAt: Date;
}

export const ticketsSchema = SchemaFactory.createForClass(tickets);
