import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { ticketsSchema } from './schema/tickets.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'tickets', schema: ticketsSchema }]),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST', 'mailhog'),
          port: configService.get('MAIL_PORT', 1025),
          ignoreTLS: true,
          secure: false,
          auth: {
            user: configService.get('MAIL_USER', ''),
            pass: configService.get('MAIL_PASS', '')
          }
        },
        defaults: {
          from: '"no-reply" <no-reply@example.com>',
        },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule { }
