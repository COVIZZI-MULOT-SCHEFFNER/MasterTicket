import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsShema } from './schema/events.schema';
import { JwtModule } from '@nestjs/jwt';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'events', schema: EventsShema }]),
    JwtModule.register({
      secret: 'dqzdq!&FKODQJKLvEIRJ',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
