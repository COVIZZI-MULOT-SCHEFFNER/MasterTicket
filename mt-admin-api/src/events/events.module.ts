import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '667im?betterthanvolvo!',
      signOptions: { expiresIn: '60m' },
    }),
    HttpModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
