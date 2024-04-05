import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(6901);
  console.log(`Auth Service is running on: ${await app.getUrl()}`);
}
bootstrap();
