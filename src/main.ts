import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {logger} from './logger/logger';
async function up() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('workwith-api/v1'); 
  await app.listen(3000);
}
logger.info('Iniciando app')
up();
logger.info('App iniciada en el puerto 3000');