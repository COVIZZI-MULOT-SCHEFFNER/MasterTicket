import {  Controller,  Get,  Post,  Body,  Patch,  Param,  Delete,  UnauthorizedException,  Req,  BadRequestException,} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { User } from './schemas/user.schema';
import { LoginUserDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { GetJwtToken } from '../common/decorators/get-jwt-token.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get('ping')
  echoservice() {
    return this.usersService.echo();
  }

  @Get('verify-token')
  async verifyToken(@GetJwtToken() token: string) {
    try {
      const decoded = await this.usersService.validateToken(token);
      return decoded;
    } catch (error) {
      return error;
    }
  }

  @Get('/me')
  findOne(@Req() req: Request) {
    const token = (req.headers as any).authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token);
    const id = payload.sub;
    return this.usersService.findById(id);
  }

  @Patch()
  update(@Req() req: Request, @Body() updateUser: User) {
    const token = (req.headers as any).authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token);
    const id = payload.sub;
    return this.usersService.update(id, updateUser);
  }

  @Delete()
  remove(@Req() req: Request) {
    const token = (req.headers as any).authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token);
    const id = payload.sub;
    return this.usersService.remove(id);
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
    return token;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<string> {
    try {
      const token = await this.usersService.loginUser(
        createUserDto.email,
        createUserDto.password,
      );
      return token;
    } catch (error) {
      const password = createUserDto.password;
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      await this.usersService.create(createUserDto);

      const token = await this.usersService.loginUser(
        createUserDto.email,
        password,
      );

      return token;
    }
  }
}
