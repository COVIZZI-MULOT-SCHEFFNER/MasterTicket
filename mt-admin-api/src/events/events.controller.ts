import {  Body,  Controller,  Delete,  Get,  Param,  Patch,  Post,  UseGuards} from '@nestjs/common';
import { AdminGuard } from 'src/guards/adminGuard';
import { CreateEventDto } from './dto/create-events.dto';
import { EventsService } from './events.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Get('ping')
  echoservice() {
    return this.eventsService.echo();
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createEventDto: CreateEventDto) {
    console.log('Received event data:', createEventDto);
    return this.eventsService.create(createEventDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updatedEvent: CreateEventDto) {
    return this.eventsService.update(id, updatedEvent);
  }
}
