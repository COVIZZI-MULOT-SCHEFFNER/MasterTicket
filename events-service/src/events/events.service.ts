import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './schema/events.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEventDto } from './dtos/create-events.dto';
import { UpdateEventDto } from './dtos/update-events.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Repository<Event>,
    private jwtService: JwtService
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = await this.eventModel.create(createEventDto);
    return createdEvent;
  }

  async findAll() {
    const events = await this.eventModel.find();
    return events;
  }

  async update(id: string, updatedEvent: UpdateEventDto): Promise<Event> {
    try {
      const event = await this.eventModel.findOne({ where: { id } });
      const newEvent = this.eventModel.merge(event, updatedEvent);
      return newEvent;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Event> {
    const event = this.eventModel.findOne({ where: { id } });
    if (!event) {
      new NotFoundException('Event not found');
    }
    return event;
  }

  async remove(id: string): Promise<Event> {
    const event = this.eventModel.findOne({ where: { id } });
    if (!event) {
      new NotFoundException('Event to delete was not found !');
    }
    await this.eventModel.delete(id);
    return event;
  }
}
