export class CreateEventDto {
  readonly name: string;
  readonly date: Date;
  readonly location: string;
  readonly numberOfPlace: number;
  readonly description: string;
  readonly ticketPrice: number;
}
