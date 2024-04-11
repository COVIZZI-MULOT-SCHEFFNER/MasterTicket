import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Event } from './schema/events.schema';
import { CreateEventDto } from './dto/create-events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly httpService: HttpService) {}

  async echo() {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.event_service_url),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error: User service is offline.');
    }
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      return await firstValueFrom(
        this.httpService.post(process.env.event_service_url, {
          createEventDto,
        }),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Microservice event is offline.',
      );
    }
  }

  async delete(id: string): Promise<Event> {
    try {
      return await firstValueFrom(
        this.httpService.delete(process.env.event_service_url + '/' + id),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Microservice event is offline.',
      );
    }
  }

  async update(id: string, updatedEvent: CreateEventDto): Promise<Event> {
    try {
      return await firstValueFrom(
        this.httpService.patch(process.env.event_service_url + '/' + id, {
          updatedEvent,
        }),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Microservice event is offline.',
      );
    }
  }
}
