import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateEventDto } from './dtos/create-events.dto';
import { Event } from './schema/events.schema';

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
      throw new InternalServerErrorException(
        'Error: Event service is offline.',
      );
    }
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      return await firstValueFrom(
        this.httpService.post(process.env.event_service_url, createEventDto),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error: Event cannot be created, service is offline.',
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

  async update(id: string, updatedEvent: Event): Promise<Event> {
    try {
      return await firstValueFrom(
        this.httpService.patch(
          process.env.event_service_url + '/' + id,
          updatedEvent,
        ),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Event service is offline.',
      );
    }
  }

  async remove(id: string): Promise<Event> {
    try {
      return await firstValueFrom(
        this.httpService.delete(process.env.event_service_url + '/' + id),
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
