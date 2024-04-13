import { IsEmail, IsNotEmpty, IsNumber, IsString, Min, Length } from 'class-validator';

export class CreatePaymentDto {
  @IsEmail()
  email: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsNumber()
  @Min(1)
  numberOfTickets: number;

  @IsString()
  @Length(16, 16)
  cardNumber: number;

  @IsString()
  @Length(5, 5)
  expiryDate: number; // Format MM/YY

  @IsString()
  @Length(3, 3)
  cvv: number;
}
