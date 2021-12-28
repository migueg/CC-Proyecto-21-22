import { Injectable , HttpStatus} from '@nestjs/common';
import {Converter} from '../converterToJSON';
import {logger} from '../logger/logger'

@Injectable()
export class CurriculumService {
  upload(file : any, req : any, res : any) : any {

    if(req.headers['Content-Type'] != 'application/pdf' ){
      logger.error("[upload curriculum service] Error found in: Incorrect content-type"  )
      res.status(HttpStatus.BAD_REQUEST)
      res.json({error: 'Incorrect content-type'})
      logger.info("[upload curriculum service] Send response with status code : " + HttpStatus.BAD_REQUEST + " and message : Incorrect content-type")
      return res;
    }

    if(file == undefined || file == null){
      logger.error("upload curriculum service] Error found in request: file null or undefined"  )
      res.status(HttpStatus.BAD_REQUEST)
      res.json({error: 'file null or undefined'});
      logger.info("[upload curriculum service] Send response with status code : " + HttpStatus.BAD_REQUEST + " and message : file null or undefined")
      return res;
    }

    res.status(HttpStatus.OK);
    res.json({
      success: true,
      originalname: file.originalname,
      filename: file.filename,
      destination: file.destination
    });
    
    logger.info("[upload curriculum service] Send response with status code : " + HttpStatus.OK + " and message :" + {
      success: true,
      originalname: file.originalname,
      filename: file.filename,
      destination: file.destination
    })

    return res;
    
  }

  convert(name : string, req : any, res : any) : any {

    const path = process.env.PWD+'/test/mocks/' + name;

    let converterToJSON = new Converter.ConverterToJson([],"");

    if(!converterToJSON.isAvailableFormat(name)){
      logger.error("[convert curriculum service] Error found in request : forbidden file format. It must be in pdf format" )
      res.status(HttpStatus.BAD_REQUEST);
      res.json({error: 'forbidden file format. It must be in pdf format'})
      logger.info("[convert curriculum service] Send response with status code : " + HttpStatus.BAD_REQUEST + " and message : forbidden file format. It must be in pdf format")
      return res;
    }

    if(!converterToJSON.loadPDF(path)){
      logger.error("[convert curriculum service] Error found in request : Fail to load pdf" )
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.json({error: 'Fail to load pdf'});
      logger.info("[convert curriculum service] Send response with status code : " + HttpStatus.INTERNAL_SERVER_ERROR + " and message : Fail to load pdf")
      return res;
    }
    

    let cv = converterToJSON.convertToJson(path);

    if( cv == undefined || cv == null ){
      logger.error("[convert curriculum service] Error found in request : Fail to convert pdf to json" )
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.json({error: 'Fail to convert pdf to json'});
      logger.info("[convert curriculum service] Send response with status code : " + HttpStatus.INTERNAL_SERVER_ERROR + " and message : Fail to convert pdf to json")
      return res;
    }
   
    res.status(HttpStatus.OK)
    res.json({curriculum: converterToJSON.cvToString()})
    logger.info("[convert curriculum service] Send response with status code : " + HttpStatus.OK + ". The curriculum has been converted successfully")
    return res;

  }
  
}