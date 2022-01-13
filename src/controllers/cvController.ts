import { Body, Controller, Get, HttpStatus, Injectable,Param, Post, Req, Res, UploadedFile, UseInterceptors  } from '@nestjs/common';
import {CurriculumService} from '../services/curriculums.service'
import { FileInterceptor} from '@nestjs/platform-express';
import {logger} from '../logger/logger';
import { ConfigService } from '@nestjs/config'
import {ROUTES} from '../routes/routes' 

@Injectable()
@Controller('curriculum')
export class cvController {
    routes : any
    constructor(private readonly curriculumService: CurriculumService, 
      private configService: ConfigService ) {
        const config = configService
        const routes = require('../routes/'+ configService.get('routesCV')).ROUTES.UPLOAD;

      } 
  
  
    @Post('upload')
    @UseInterceptors(
      FileInterceptor('file'),
    )
    upload(@UploadedFile() file,@Req() req ,@Res() res) :any{
      logger.info('[/curriculum/upload] New request- Method: '+req.method + " Content-type: " + req.headers['Content-Type'] + " Body: " + req.body);
      return this.curriculumService.upload(file,req,res);
    }

    @Get(':name')
    convert(@Param('name') name : string, @Req() req, @Res() res) : any {
      logger.info('[/curriculum/convert] New request- Method: '+req.method + " Content-type: " + req.headers['Content-Type'] + " param: " + name);
      return this.curriculumService.convert(name,req,res);
    }


  }
  