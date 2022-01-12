import {Module} from '@nestjs/common';
import {cvController} from "./controllers/cvController";
import {CurriculumService} from "./services/curriculums.service";
import { MulterModule } from '@nestjs/platform-express';
import { offerController } from '../src/controllers/offer.controller';
import {OfferService} from '../src/services/offer.service';

@Module({
  imports: [MulterModule.register({
      dest: './files', //La carpeta de destino empieza en el root del proyecto
  })],
  controllers: [cvController,offerController], 
  providers: [CurriculumService, OfferService], 
})
export class AppModule {}