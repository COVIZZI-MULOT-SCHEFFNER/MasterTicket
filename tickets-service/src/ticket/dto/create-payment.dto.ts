import {
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  cardNumber: string;

  @IsString()
  expirationDate: string;

  @IsNumber()
  @Min(100)
  @Max(999)
  cryptogram: number;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  billingAddress: string;

  @IsNumber()
  price: number;
}
