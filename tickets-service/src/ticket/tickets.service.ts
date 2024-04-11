import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';
import { tickets } from './schema/tickets.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(tickets.name)
    private ticketModel: mongoose.Model<tickets>
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<tickets> {
    return await this.ticketModel.create(createTicketDto);
  }

  async getAll(): Promise<tickets[]> {
    return await this.ticketModel.find();
  }

  async findById(id: string): Promise<tickets> {
    const ticket = this.ticketModel.findById({ _id: id });
    if (!ticket) {
      new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async findByTicketId(id: string): Promise<tickets[]> {
    return await this.ticketModel.find({ _id: id });
  }

  async update(id: string, updateTicketDto: CreateTicketDto): Promise<tickets> {
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

  async remove(id: string): Promise<tickets> {
    const ticket = this.ticketModel.findOneAndDelete({ _id: id });
    if (!ticket) {
      new NotFoundException('Ticket to delete was not found !');
    }
    return ticket;
  }
}
