import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //instalar o npm i --save class-validator class-transformer
  app.useGlobalPipes(new ValidationPipe()); // em seguida adicionar aqui

  /**Nesse caso estamos usando o LogInterceptor de modo global
   * Com esse interceptador podemos intercptar qualquer rota e executar uma função antes dela
   * e devolver um resultado e só assim executar a função.
   * Com isso podemos criar um log d emonitoramento da aplicação para verificar desempenho
   */
  app.useGlobalInterceptors(new LogInterceptor());

  await app.listen(3000);
  console.log('Serviço rodando na porta 3000');
}
bootstrap();
