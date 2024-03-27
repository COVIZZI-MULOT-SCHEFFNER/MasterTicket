import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { AdminGuard } from 'src/guards/adminGuard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('ping')
  echoservice() {
    return this.usersService.echo();
  }
  
  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<string> {
    const token = await this.usersService.loginUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!token) {
      throw new UnauthorizedException();
    }
    return token
  }
}