import { Injectable , HttpStatus} from '@nestjs/common';
import { ApplyOfferDto } from 'src/dtos/apply-offer.dto';
import {AfinityOfferResponseDto} from 'src/dtos/afinity-offer-response.dto'
import { FindOfferDto } from 'src/dtos/find-offer.dto';
import {Finder} from '../finder';
import {logger} from '../logger/logger'
import {offers} from '../jobOffer'

@Injectable()
export class OfferService{
    find(findOfferDto: FindOfferDto, req : any, res : any) : any{

        if(req.headers['Content-Type'] != 'application/json' ){
            logger.error("[find offer service] Error found: Incorrect content-type"  )
            res.status(HttpStatus.BAD_REQUEST)
            res.json({error: 'Incorrect content-type. Content-type should be application/json'})
            logger.info("[find offer service] Send response with status code : " + HttpStatus.BAD_REQUEST + " and message : Incorrect content-type. Content-type should be application/json")
            return res;
          }
      
        if(findOfferDto.range === undefined || findOfferDto.range === null){
            logger.error("[find offer service] Error found: No Kilometres range found in request body"  )
            res.status(HttpStatus.BAD_REQUEST)
            res.json({error: 'No Kilometres range found in request body'})
            logger.info("[find offer service] Send response with status code : " + HttpStatus.BAD_REQUEST + " and message : No Kilometres range found in request body")
            return res;  
        }

        if(findOfferDto.location === undefined || findOfferDto.location === null
            || findOfferDto.location === ""){

            logger.error("[find offer service] Error found: No location found in request body"  )
            res.status(HttpStatus.BAD_REQUEST)
            res.json({error: 'No location found in request body'})
            logger.info("[find offer service] Send response with status code : " + HttpStatus.BAD_REQUEST + " and message : No location found in request body")
            return res;  
        }

        if((findOfferDto.education === undefined || findOfferDto.education === null || findOfferDto.education == [])
            && (findOfferDto.competences === undefined || findOfferDto.competences === null || findOfferDto.competences == [])
            && (findOfferDto.experience === undefined || findOfferDto.experience === null || findOfferDto.experience == [])){

            logger.error("[find offer service] Error found: Competences, experience and eductaiton are empty. It must be necessary to have information in this fields"  )
            res.status(HttpStatus.BAD_REQUEST)
            res.json({error: 'Competences, experience and eductaiton are empty. It must be necessary to have information in this fields'})
            logger.info("[find offer service] Send response with status code : " + HttpStatus.BAD_REQUEST + " and message : Competences, experience and eductaiton are empty. It must be necessary to have information in this fields")
            return res;  
        }

        let finder = new Finder();
        let responseDto = finder.find(findOfferDto)

        switch (responseDto.status){
            case 'Not implemented':
                res.status(HttpStatus.OK)
                res.json(responseDto)
                logger.info("[find offer service] Send response with status code : " + HttpStatus.OK + " and message :" + responseDto.status)
                break;
            case 'Failure':
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                logger.info("[find offer service] Send response with status code : " + HttpStatus.INTERNAL_SERVER_ERROR + " and message :" +responseDto.status)
                res.json(responseDto)
                break;
            case 'Success':
                res.status(HttpStatus.CREATED)
                res.json(responseDto)
                logger.info("[find offer service] Send response with status code : " + HttpStatus.INTERNAL_SERVER_ERROR + " and message :" +responseDto.status + " " + responseDto.offers)
                break;
        }
        
 

        return res

    }
    getOffers(id : string, req : any, res : any) : any{
        let finder = new Finder();
        let responseDto = finder.getOffers(id)

        switch (responseDto.status){
            case 'Not implemented':
                res.status(HttpStatus.OK)
                logger.info("[get offers service] Send response with status code : " + HttpStatus.OK + " and message :" + responseDto.status)
                res.json(responseDto)
                break;
            case 'Failure':
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                logger.info("[get offers service] Send response with status code : " + HttpStatus.INTERNAL_SERVER_ERROR + " and message :" + responseDto.status)
                res.json(responseDto)
                break;
            case 'Success':
                res.status(HttpStatus.OK)
                res.json(responseDto)
                logger.info("[get offers service] Send response with status code : " + HttpStatus.INTERNAL_SERVER_ERROR + " and message :" +responseDto.status + " " + responseDto.offers)
                break;
        }

        return res;
    }

    getAfinity(id: string, req : any, res : any) : any{
        let jobOffers = new offers.JobOffers();
        let responseDto = jobOffers.getAfinity(id)

        switch (responseDto.status){
            case 'Not implemented':
                res.status(HttpStatus.OK)
                logger.info("[get afinity service] Send response with status code : " + HttpStatus.OK + " and message :" + responseDto.message)
                res.json(responseDto)
                break;
            case 'Failure':
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                logger.info("[get afinity service] Send response with status code : " + HttpStatus.INTERNAL_SERVER_ERROR + " and message :" + responseDto.message)
                res.json(responseDto)
                break;
            case 'Success':
                res.status(HttpStatus.OK)
                res.json(responseDto)
                logger.info("[get afinity service] Send response with status code : " + HttpStatus.INTERNAL_SERVER_ERROR + " and message :" +responseDto.status + " " + responseDto.message)
                break;
        }

        return res;
    }

    applyOffer(applyOfferDto: ApplyOfferDto, req : any, res : any) : any{
        let jobOffers = new offers.JobOffers();

        if(req.headers['Content-Type'] != 'application/json' ){
            logger.error("[apply offer service] Error found: Incorrect content-type"  )
            res.status(HttpStatus.BAD_REQUEST)
            res.json({error: 'Incorrect content-type. Content-type should be application/json'})
            logger.info("[apply offer service] Send response with status code : " + HttpStatus.BAD_REQUEST + " and message : Incorrect content-type. Content-type should be application/json")
            return res;
          }

        if(applyOfferDto.id == null || applyOfferDto.id == undefined || applyOfferDto.id == "" ||
        applyOfferDto.email == null || applyOfferDto.email == undefined || applyOfferDto.email == "" ||
        applyOfferDto.name == null || applyOfferDto.name == undefined || applyOfferDto.name == "" ){
            logger.error("[apply offer service] Error found: Missing params. Id, email, and name must have values"  )
            res.status(HttpStatus.BAD_REQUEST)
            res.json({error: 'Bad Request. Missing params'})
            logger.info("[apply offer service] Send response with status code : " + HttpStatus.BAD_REQUEST + " and message : Incorrect content-type. Content-type should be application/json")
            return res;
        }
        let responseDto = jobOffers.applyOffer(applyOfferDto)

       
        switch (responseDto.status){
            case 'Not implemented':
                res.status(HttpStatus.OK)
                logger.info("[get afinity service] Send response with status code : " + HttpStatus.OK + " and message :" + responseDto.message)
                res.json(responseDto)
                break;
            case 'Failure':
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                logger.info("[get afinity service] Send response with status code : " + HttpStatus.INTERNAL_SERVER_ERROR + " and message :" + responseDto.message)
                res.json(responseDto)
                break;
            case 'Success':
                res.status(HttpStatus.CREATED)
                res.json(responseDto)
                logger.info("[get afinity service] Send response with status code : " + HttpStatus.INTERNAL_SERVER_ERROR + " and message :" +responseDto.status + " " + responseDto.message)
                break;
        }

        return res;
    }
}