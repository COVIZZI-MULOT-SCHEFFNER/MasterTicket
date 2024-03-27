import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({
      secret: '667im?betterthanvolvo!',
      signOptions: { expiresIn: '60m' },
    }),
    HttpModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}