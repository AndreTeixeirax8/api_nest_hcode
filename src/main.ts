import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //instalar o npm i --save class-validator class-transformer
  app.useGlobalPipes(new ValidationPipe()); // em seguida adicionar aqui
  await app.listen(3000);
  console.log('Serviço rodando na porta 3000');
}
bootstrap();
