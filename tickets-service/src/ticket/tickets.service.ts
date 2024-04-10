import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import mongoose from 'mongoose';
import { Ticket } from './schema/tickets.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { MongooseModule } from '@nestjs/mongoose';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketModel: mongoose.Model<Ticket>
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    return await this.ticketModel.create(createTicketDto);
  }

  async findById(id: string): Promise<Ticket> {
    const event = this.ticketModel.findById({ _id: id });
    if (!event) {
      new NotFoundException('Event not found');
    }
    return event;
  }

  async findByEventId(eventId: string): Promise<Ticket[]> {
    return await this.ticketModel.find({ where: { eventId } });
  }

  async update(id: string, updateTicketDto: CreateTicketDto): Promise<Ticket> {
    try {
      const ticket = await this.ticketModel.findByIdAndUpdate(
        id,
        updateTicketDto,
        {
          new: true,
          runValidators: true,
        }
      );
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<Ticket> {
    const ticket = this.ticketModel.findOneAndDelete({ _id: id });
    if (!ticket) {
      new NotFoundException('Event to delete was not found !');
    }
    return ticket;
  }
}
