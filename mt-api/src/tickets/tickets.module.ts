import { Module } from '@nestjs/common';
import { Ticket } from './schema/ticket.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsController } from './tickets.controller';
import { TicketService } from './tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketsController],
  providers: [TicketService],
})
export class TicketModule {}
