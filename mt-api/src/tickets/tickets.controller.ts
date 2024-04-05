import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketService } from './tickets.service';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketService) {}

  @Get('ping')
  echoService() {
    return this.ticketsService.echo();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ticketsService.findById(id);
  }

  @Get('byEventId/:id')
  findbyEventId(@Param('id') id: string) {
    return this.ticketsService.findByEventId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
