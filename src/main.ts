import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {logger} from './logger/logger';
import { ConfigService } from '@nestjs/config';

async function up() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  app.setGlobalPrefix(configService.get('baseURL')); 
  logger.info(configService.get('baseURL'));
  await app.listen(configService.get('port'));
}
logger.info('Iniciando app')
up();
logger.info('App iniciada en el puerto 3000');