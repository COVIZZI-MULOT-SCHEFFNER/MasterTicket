import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TicketsService {
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
        'Error: Ticket service is offline.',
      );
    }
  }
  async getAll() {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.ticket_service_url + '/getAll'),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Ticket service is offline.',
      );
    }
  }
}
