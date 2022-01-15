import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {logger} from './logger/logger';
import { ConfigService } from '@nestjs/config';
import { Etcd3Config} from './Etcd3Config'

const etcd3 = new Etcd3Config();



async function up() {
    logger.info('Using nestjs configuration');
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService)
    app.setGlobalPrefix('Set global prefix to ' + configService.get('baseURL')); 
    logger.info(configService.get('baseURL'));
    await app.listen(configService.get('port'));
    logger.info('Listen in port ' + configService.get('port'));
  
}
logger.info('Iniciando app')
up();
logger.info('App iniciada en el puerto 3000');