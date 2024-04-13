import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { tickets } from './schema/tickets.schema';

@Injectable()
export class TicketsService {
  constructor(private readonly httpService: HttpService) {}

  async echo() {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.ticket_service_url+'/ping'),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Ticket service is offline.',
      );
    }
  }
  async getAll(): Promise<tickets[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${process.env.ticket_service_url}/getAll`)
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching all tickets:', error);
      throw new InternalServerErrorException(
        'Error: Ticket service is offline.',
        error.response?.data?.message || error.message
      );
    }
  }
}
