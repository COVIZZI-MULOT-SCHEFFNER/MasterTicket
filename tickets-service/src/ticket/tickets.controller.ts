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

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

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
    return this.ticketsService.createPayment(createPaymentDto);
  }
}
