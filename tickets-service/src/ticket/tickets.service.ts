import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './schema/tickets.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto);
    return await this.ticketRepository.save(ticket);
  }

  async findById(id: string): Promise<Ticket> {
    return await this.ticketRepository.findOne({ where: { id } });
  }

  async findByEventId(eventId: string): Promise<Ticket[]> {
    return await this.ticketRepository.find({ where: { eventId } });
  }

  async update(id: string, updateTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    this.ticketRepository.merge(ticket, updateTicketDto);
    return await this.ticketRepository.save(ticket);
  }

  async remove(id: string): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}
