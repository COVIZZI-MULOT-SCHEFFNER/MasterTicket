import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { users } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(users.name)
    private userModel: mongoose.Model<users>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<users> {
      const createdUser = await this.userModel.create(createUserDto);
      createdUser.password = undefined;
      return createdUser;
  }

  async findAll() {
    const users = await this.userModel
      .find()
      .select('-password')
      .select('-__v')
      .exec();
    return users;
  }

  async findById(id: string): Promise<users> {
    let user;
    try {
      user = await this.userModel
        .findById(id)
        .select('-password');
    } catch (error) {
      throw new InternalServerErrorException('Invalid ID');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<users> {
    const user = await this.userModel.findOne({
      email: email,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.password = undefined;
    return user;
  }

  async update(id: string, updateUser: users): Promise<users> {
    if (updateUser.password) {
      updateUser.password = await bcrypt.hash(updateUser.password, 10);
    }
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUser, {
        new: true,
        runValidators: true,
      });
      user.password = undefined;
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async remove(id): Promise<users> {
    const userDelete = await this.userModel.findByIdAndDelete(id);

    if (!userDelete) {
      throw new NotFoundException('User not found');
    }
    userDelete.password = undefined;
    return userDelete;
  }

  async validateUser(email: string, password: string): Promise<users> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async generateJwt(user): Promise<string> {
    const payload = {
      firstname: user.firstname,
      sub: user._id,
      role: user.role,
    };
    return this.jwtService.sign(payload, { expiresIn: '2h' });
  }

  async validateToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }

}