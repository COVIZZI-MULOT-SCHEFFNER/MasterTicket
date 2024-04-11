import { Controller, Get, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { AdminGuard } from 'src/guards/adminGuard';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('ping')
  async echoservice() {
    return this.ticketsService.echo();
  }

  @Get('getAll')
  @UseGuards(AdminGuard)
  async getAll() {
    return this.ticketsService.getAll();
  }
}
