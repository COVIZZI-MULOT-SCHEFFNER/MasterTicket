import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-events.dto';

export class updateEventDto extends PartialType(CreateEventDto) {}
