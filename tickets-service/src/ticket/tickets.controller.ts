import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService
  ) { }

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get('/ping')
  ping() {
    return "Ticket Service is up and running!";
  }

  @Get('/getAll')
  getAll() {
    return this.ticketsService.getAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.ticketsService.findById(id);
  }

  @Get('/user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.ticketsService.findByUserId(userId);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }

  @Post('/createPayment')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const paymentSuccessful = await this.ticketsService.processPayment(createPaymentDto);

    if (paymentSuccessful) {
      const ticket = await this.ticketsService.create({
        userId: createPaymentDto.userId,
        eventId: createPaymentDto.eventId,
        number: createPaymentDto.numberOfTickets,
        status: 'Success'
      });

      return {
        message: 'Payment and ticket created successfully',
        ticket: ticket
      };
    } else {
      throw new HttpException('Payment failed', HttpStatus.BAD_REQUEST);
    }
  }

}
