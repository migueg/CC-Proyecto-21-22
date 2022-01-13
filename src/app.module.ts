import {Module} from '@nestjs/common';
import {cvController} from "./controllers/cvController";
import {CurriculumService} from "./services/curriculums.service";
import { MulterModule } from '@nestjs/platform-express';
import { offerController } from './controllers/offer.controller';
import {OfferService} from './services/offer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Config from './Config';

@Module({
  imports: [MulterModule.register({
      dest: './files', //La carpeta de destino empieza en el root del proyecto
  }),
  ConfigModule.forRoot({
    load: [Config],
  }),],
  controllers: [cvController,offerController], 
  providers: [CurriculumService, OfferService]
})
export class AppModule {}