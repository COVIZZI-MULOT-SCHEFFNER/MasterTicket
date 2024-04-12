import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { tickets } from './schema/tickets.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(tickets.name)
    private ticketModel: mongoose.Model<tickets>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<tickets> {
    return await this.ticketModel.create(createTicketDto);
  }

  async getAll(): Promise<tickets[]> {
    return await this.ticketModel.find();
  }

  async findById(id: string): Promise<tickets> {
    const ticket = this.ticketModel.findById({ _id: id });
    if (!ticket) {
      new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async findByTicketId(id: string): Promise<tickets[]> {
    return await this.ticketModel.find({ _id: id });
  }

  async update(id: string, updateTicketDto: CreateTicketDto): Promise<tickets> {
    try {
      const ticket = await this.ticketModel.findByIdAndUpdate(
        id,
        updateTicketDto,
        {
          new: true,
          runValidators: true,
        }
      );
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<tickets> {
    const ticket = this.ticketModel.findOneAndDelete({ _id: id });
    if (!ticket) {
      new NotFoundException('Ticket to delete was not found !');
    }
    return ticket;
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const errors = await validate(createPaymentDto);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new HttpException(
        `Invalid fields: ${errorMessages}`,
        HttpStatus.BAD_REQUEST
      );
    }
    const { email, price } = createPaymentDto;
    try {
      const result = await this.mailerService.sendMail({
        from: this.configService.get('MAIL_SENDER'),
        to: email,
        subject: 'Payment confirmation',
        text: `Your payement has been processed successfully for a total of ${price} euros`,
      });
      return 'Payment created successfully';
    } catch (error) {
      throw new HttpException(
        `Error while processing payment: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
