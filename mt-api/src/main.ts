import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('MT API')
    .setDescription('The MT API for the MT Project. Its the front office for the MT Project.')
    .setVersion('0.1')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3500);
  console.log(`Front Office is running on: ${await app.getUrl()}`);
}
bootstrap();
