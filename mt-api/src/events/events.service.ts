import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Event } from './schema/events.schema';

@Injectable()
export class EventsService {
  constructor(private readonly httpService: HttpService) {}

  async echo() {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.event_service_url+'/ping'),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Event service is offline.',
      );
    }
  }

  async findAll(): Promise<Event[]> {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.event_service_url),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Event service is offline.',
      );
    }
  }

  async findById(id: string): Promise<Event> {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.event_service_url + '/getInfo/' + id),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Event service is offline.',
      );
    }
  }
}
