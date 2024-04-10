import { Injectable, NotFoundException } from '@nestjs/common';
import { events } from './schema/events.schema';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEventDto } from './dtos/create-events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(events.name)
    private eventModel: mongoose.Model<events>,
    private jwtService: JwtService
  ) {}

  async create(createEventDto: CreateEventDto): Promise<events> {
    const createdEvent = await this.eventModel.create(createEventDto);
    return createdEvent;
  }

  async findAll() {
    const events = await this.eventModel.find().exec();
    return events;
  }

  async update(id: string, updatedEvent: events): Promise<events> {
    try {
      const event = await this.eventModel.findByIdAndUpdate(id, updatedEvent, {
        new: true,
        runValidators: true,
      });
      return event;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<events> {
    const event = this.eventModel.findById({ _id: id });
    if (!event) {
      new NotFoundException('Event not found');
    }
    return event;
  }

  async remove(id: string): Promise<events> {
    const event = this.eventModel.findOneAndDelete({ _id: id });
    if (!event) {
      new NotFoundException('Event to delete was not found !');
    }
    return event;
  }
}
