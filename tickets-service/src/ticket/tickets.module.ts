import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { ticketsSchema } from './schema/tickets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'tickets', schema: ticketsSchema }]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
