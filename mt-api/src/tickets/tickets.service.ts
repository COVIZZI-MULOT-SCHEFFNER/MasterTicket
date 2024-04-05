import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './schema/ticket.schema';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private readonly httpService: HttpService) {}

  async echo() {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.ticket_service_url),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Ticket Service is offline.',
      );
    }
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    try {
      return await firstValueFrom(
        this.httpService.post(process.env.ticket_service_url, createTicketDto),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Ticket Service is offline.',
      );
    }
  }

  async findById(id: string): Promise<Ticket> {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.ticket_service_url + id),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Ticket Service is offline.',
      );
    }
  }

  async findByEventId(id: string): Promise<Ticket> {
    try {
      return await firstValueFrom(
        this.httpService.get(
          process.env.ticket_service_url + '/byEventId/' + id,
        ),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Ticket Service is offline.',
      );
    }
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    try {
      return await firstValueFrom(
        this.httpService.patch(
          process.env.ticket_service_url + id,
          updateTicketDto,
        ),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Ticket Service is offline.',
      );
    }
  }

  async remove(id: string): Promise<Ticket> {
    try {
      return await firstValueFrom(
        this.httpService.delete(process.env.ticket_service_url + id),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Ticket Service is offline.',
      );
    }
  }
}
