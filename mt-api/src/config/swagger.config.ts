import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('MT API')
  .setDescription('The MT API for the MT Project. It\'s the front office for the MT Project.')
  .setVersion('0.1')
  .addTag('api')
  .build();
