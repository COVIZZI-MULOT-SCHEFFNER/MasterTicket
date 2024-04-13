import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tickets } from './schema/tickets.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { validate } from 'class-validator';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(tickets.name) private ticketModel: Model<tickets>,
    private mailerService: MailerService,
    private configService: ConfigService
  ) { }

  async create(createTicketDto: CreateTicketDto): Promise<tickets> {
    console.log('createTicketDto', createTicketDto);
    return await this.ticketModel.create(createTicketDto);
  }

  async getAll(): Promise<tickets[]> {
    return await this.ticketModel.find();
  }

  async findById(id: string): Promise<tickets> {
    const ticket = await this.ticketModel.findById(id);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async findByUserId(id: string): Promise<tickets[]> {
    return await this.ticketModel.find({ userId: id }).exec();
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<tickets> {
    const updatedTicket = await this.ticketModel.findByIdAndUpdate(id, updateTicketDto, {
      new: true,
      runValidators: true,
    });
    if (!updatedTicket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return updatedTicket;
  }

  async remove(id: string): Promise<tickets> {
    const ticket = await this.ticketModel.findOneAndDelete({ _id: id });
    if (!ticket) {
      throw new NotFoundException('Ticket to delete was not found');
    }
    return ticket;
  }

  async processPayment(createPaymentDto: CreatePaymentDto): Promise<boolean> {
    const errors = await validate(createPaymentDto);
    if (errors.length > 0) {
      const errorMessages = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(`Invalid fields: ${errorMessages}`, HttpStatus.BAD_REQUEST);
    }

    if (!await this.simulatePayment(createPaymentDto)) {
      throw new HttpException('Payment failed', HttpStatus.BAD_REQUEST);
    }

    this.sendConfirmationEmail(createPaymentDto);

    return true;
  }

  private async simulatePayment(paymentDto: CreatePaymentDto): Promise<boolean> {
    // Simulate or implement actual payment processing logic
    return true;
  }

  async sendConfirmationEmail(createPaymentDto: CreatePaymentDto): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      try {
        await this.mailerService.sendMail({
          from: this.configService.get<string>('EMAIL_USER'),
          to: createPaymentDto.email,
          subject: 'Payment Confirmation',
          text: `Your payment of ${createPaymentDto.price} euros for ${createPaymentDto.numberOfTickets} tickets has been processed successfully.`,
        });
        console.log('Email sent successfully');
      } catch (error) {
        console.error(`Error while sending confirmation email: ${error.message}`);
      }
    } else {
      console.log('Skipping email send in non-production environment.');
    }
  }



}
