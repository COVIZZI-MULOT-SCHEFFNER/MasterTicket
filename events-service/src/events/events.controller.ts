import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/create-events.dto';
import { events } from './schema/events.schema';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('/getInfo/:id')
  findById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedEvent: events) {
    return this.eventsService.update(id, updatedEvent);
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
