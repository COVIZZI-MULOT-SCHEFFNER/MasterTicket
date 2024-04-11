import { Module } from '@nestjs/common';
import { tickets } from './schema/ticket.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsController } from './tickets.controller';
import { TicketService } from './tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([tickets])],
  controllers: [TicketsController],
  providers: [TicketService],
})
export class TicketModule {}
