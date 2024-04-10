import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from './schema/tickets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'tickets', schema: Ticket }]),
    JwtModule.register({
      secret: 'dqzdq!&FKODQJKLvEIRJ',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketModule {}
