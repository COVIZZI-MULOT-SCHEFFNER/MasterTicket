import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Event } from './schema/events.schema';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/update-events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly httpService: HttpService) { }

  async echo() {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.event_service_url + '/ping'),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error: Event service is offline.');
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
      throw new InternalServerErrorException(
        'Error: Microservice event is offline.',
      );
    }
  }


  async delete(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${process.env.event_service_url}/${id}`),
      );
      return response.data;
    } catch (error) {
      console.error('Error while deleting event:', error);
      throw new InternalServerErrorException('Error: Microservice event is offline.');
    }
}


  async update(id: string, updatedEvent: UpdateEventDto): Promise<Event> {
    try {
      return await firstValueFrom(
        this.httpService.patch(`${process.env.event_service_url}/${id}`, updatedEvent),
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
