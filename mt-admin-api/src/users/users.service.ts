import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async echo() {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.user_service_url+'/ping'),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error: User service is offline.');
    }
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    try {
      return await firstValueFrom(
        this.httpService.patch(`${process.env.user_service_url}/${id}`, updateUserDto)
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error: Microservice users is offline.');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.delete(`${process.env.user_service_url}/${id}`)
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error: Microservice users is offline.');
    }
  }

  
  async findAll(): Promise<User[]> {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.user_service_url)
      ).then((response) => {
        return response.data;
      }
      );
    } catch (error) {
      throw new InternalServerErrorException('Error: Microservice users is offline.');
    }
  }

  async loginUser(email: string, password: string): Promise<string> {
    try {
      return await firstValueFrom(
        this.httpService.post(process.env.user_service_url + '/validate', { email, password })
      ).then((response) => {
        return response.data;
      }
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error: Microservice users is offline.');
    }
  }
}