import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Req, BadRequestException, } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { LoginUserDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

ApiTags('users');
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) { }

  @Get('ping')
  echoservice() {
    return this.usersService.echo();
  }

  @Get('/me')
  findOne(@Req() req: Request) {
    const token = (req.headers as any).authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token);
    const id = payload.sub;
    return this.usersService.findById(id);
  }

  @Patch()
  update(
    @Req() req: Request,
    @Body() updateUser: User
  ) {
    const token = (req.headers as any).authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token);
    const id = payload.sub;
    return this.usersService.update(id, updateUser);
  }

  @Delete()
  remove(@Req() req: Request,) {
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
    let token = await this.usersService.loginUser(
      createUserDto.email,
      createUserDto.password,
    );
    if (!token) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      try {
        await this.usersService.create(createUserDto);
      } catch (error) {
        throw new BadRequestException('Error: Cant create user.');
      }
      token = await this.usersService.loginUser(
        createUserDto.email,
        createUserDto.password,
      );
    }
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }


}
