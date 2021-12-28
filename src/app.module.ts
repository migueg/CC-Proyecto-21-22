import {Module} from '@nestjs/common';
import {cvController} from "./controllers/cvController";
import {CurriculumService} from "./services/curriculums.service";
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
      dest: './files', //La carpeta de destino empieza en el root del proyecto
  })],
  controllers: [cvController], 
  providers: [CurriculumService], 
})
export class AppModule {}