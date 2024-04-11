import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { users } from './schemas/user.schema';
import { GetJwtToken } from '../common/decorators/get-jwt-token.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/ping')
  ping() {
    return "User Service is up and running !";
  }

  @Get('verify-token')
  async verifyToken(@GetJwtToken() token: string) {
    try {
      const decoded = await this.usersService.validateToken(token);
      return { isValid: true, decoded };
    } catch (error) {
      return { isValid: false, message: 'Invalid token' };
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/getInfo/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get('/me/:id')
  findOne(
    @Param('id') id: string
  ) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: users
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }


  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validateUser(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.usersService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.usersService.generateJwt(user);
    return { token };
  }

}