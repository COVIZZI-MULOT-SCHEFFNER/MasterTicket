import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ticketSchema } from './schema/tickets.schema';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ticket', schema: ticketSchema }]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
