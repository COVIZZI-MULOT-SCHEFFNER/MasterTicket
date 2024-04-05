import { Module } from '@nestjs/common';
import { Event } from './schema/events.schema';
import { JwtModule } from '@nestjs/jwt';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    JwtModule.register({
      secret: 'dqzdq!&FKODQJKLvEIRJ',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
