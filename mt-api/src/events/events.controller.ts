import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/create-events.dto';
import { Event } from './schema/events.schema';

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

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get('getinfo')
  async findById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatedEvent: Event) {
    return this.eventsService.update(id, updatedEvent);
  }

  @Delete()
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
