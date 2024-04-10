import { Body, Controller, Post, Get, Patch, Delete } from '@nestjs/common';
import { Ticket } from './schema/tickets.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findById(@Body() id: string) {
    return this.ticketsService.findById(id);
  }

  @Get('byEventId/')
  findByEventId(@Body() eventId: string) {
    return this.ticketsService.findByEventId(eventId);
  }

  @Patch()
  update(@Body() id: string, @Body() ticket: Ticket) {
    return this.ticketsService.update(id, ticket);
  }

  @Delete()
  remove(@Body() id: string) {
    return this.ticketsService.remove(id);
  }
}
