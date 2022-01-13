import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {logger} from './logger/logger';
import { ConfigService } from '@nestjs/config';
import { Etcd3Config} from './Etcd3Config'

const etcd3 = new Etcd3Config();

if(process.env.CONFIG == 'distributed'){
  etcd3.put('PORT', '3000');
  etcd3.put('HOST', 'localhost');
  etcd3.put('URL', 'workwith-api/v1');
  etcd3.put('ROUTES_CV', 'routes');
  etcd3.put('ROUTES_OFFER', 'routes');
}

async function up() {
  if(process.env.CONFIG == 'distributed'){
    logger.info('Distributed configuration detected');
    const app = await NestFactory.create(AppModule);
   
    app.setGlobalPrefix(etcd3.get('URL') || 'workwith-api/v1'); 
    logger.info('Set global prefix to '+ etcd3.get('baseURL'));
    await app.listen(parseInt(etcd3.get('PORT'),10)|| 3000);
    logger.info('Listen in port ' + etcd3.get('PORT'));
  }else{
    logger.info('Using nestjs configuration');
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService)
    app.setGlobalPrefix('Set global prefix to ' + configService.get('baseURL')); 
    logger.info(configService.get('baseURL'));
    await app.listen(configService.get('port'));
    logger.info('Listen in port ' + configService.get('port'));
  }
  
}
logger.info('Iniciando app')
up();
logger.info('App iniciada en el puerto 3000');