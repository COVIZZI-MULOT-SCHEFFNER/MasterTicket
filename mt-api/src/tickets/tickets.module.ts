import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketService } from './tickets.service';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({
      secret: '667im?betterthanvolvo!',
      signOptions: { expiresIn: '60m' },
    }),
    HttpModule,
  ],
  controllers: [TicketsController],
  providers: [TicketService],
})
export class TicketModule {}