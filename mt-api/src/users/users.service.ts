import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) { }

  async echo() {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.user_service_url + '/ping'),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error: User service is offline.');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await firstValueFrom(
        this.httpService.post(process.env.user_service_url, createUserDto),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error: Users cannot be created, service is offline.',
      );
    }
  }

  async loginUser(email: string, password: string): Promise<string> {
    try {
      return await firstValueFrom(
        this.httpService.post(process.env.user_service_url + '/validate', {
          email,
          password,
        }),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: Validation failed, service is offline.',
      );
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await firstValueFrom(
        this.httpService.get(process.env.user_service_url + '/me/' + id),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: User not found, service is offline.',
      );
    }
  }

  async update(id: string, updateUser: User): Promise<User> {
    try {
      return await firstValueFrom(
        this.httpService.patch(
          process.env.user_service_url + '/' + id,
          updateUser,
        ),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: User cannot be updated, service is offline.',
      );
    }
  }

  async remove(id): Promise<User> {
    try {
      return await firstValueFrom(
        this.httpService.delete(process.env.user_service_url + '/' + id),
      ).then((response) => {
        return response.data;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error: User cannot be deleted, service is offline.',
      );
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      return await firstValueFrom(
        this.httpService.get(`${process.env.user_service_url}/verify-token`, { 
          headers: { Authorization: `Bearer ${token}` } 
        }),
      ).then((response) => response.data);
    } catch (error) {
      throw new InternalServerErrorException('Error: User service is offline.');
    }
}
}
