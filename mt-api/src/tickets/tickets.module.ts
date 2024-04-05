import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ticketSchema } from './schema/ticket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'tickets', schema: ticketSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class TicketModule {}
