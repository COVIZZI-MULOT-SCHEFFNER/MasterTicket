import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
.setTitle('MT ADMIN API')
.setDescription('The MT Admin API for the MT Project. Its the back office for the MT Project.')
.setVersion('0.1')
.addTag('api')
.build();
