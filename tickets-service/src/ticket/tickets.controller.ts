import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { tickets } from './schema/tickets.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { validate } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get('getAll')
  getAll() {
    return this.ticketsService.getAll();
  }

  @Get()
  findById(@Body() id: string) {
    return this.ticketsService.findById(id);
  }

  @Get('byTicketId/')
  findByTicketId(@Body() id: string) {
    return this.ticketsService.findByTicketId(id);
  }

  @Patch()
  update(@Body() id: string, @Body() ticket: tickets) {
    return this.ticketsService.update(id, ticket);
  }

  @Delete()
  remove(@Body() id: string) {
    return this.ticketsService.remove(id);
  }

  @Post('createPayment')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const errors = await validate(createPaymentDto);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new HttpException(
        `Invalid fields: ${errorMessages}`,
        HttpStatus.BAD_REQUEST
      );
    }
    const { email, price } = createPaymentDto;
    try {
      const result = await this.mailerService.sendMail({
        from: 'Please enter your email here',
        to: email,
        subject: 'Payment confirmation',
        text: `Your payement has been processed successfully for a total of ${price} euros`,
      });
      return 'Payment created successfully';
    } catch (error) {
      throw new HttpException(
        `Error while processing payment: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
