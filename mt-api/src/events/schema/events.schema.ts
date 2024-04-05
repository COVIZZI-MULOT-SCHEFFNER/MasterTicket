import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Event {
  @Prop({ unique: true })
  name: string;

  @Prop()
  date: Date;

  @Prop()
  location: string;

  @Prop()
  numberOfPlace: number;

  @Prop()
  description: string;

  @Prop()
  ticketPrice: number;

  createtAd: Date;
  updatedAt: Date;
  _id: string;
}

export const EventsShema = SchemaFactory.createForClass(Event);
