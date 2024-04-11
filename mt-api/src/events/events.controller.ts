import { Controller, Get, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';

ApiTags('events');
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private jwtService: JwtService,
  ) {}

  @Get('ping')
  echoService() {
    return this.eventsService.echo();
  }

  @Get('getAll')
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get('getinfo/:id')
  async findById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }
}
