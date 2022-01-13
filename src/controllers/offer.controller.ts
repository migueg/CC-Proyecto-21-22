import { Body, Controller, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import {OfferService} from '../services/offer.service'
import {FindOfferDto} from '../dtos/find-offer.dto';
import {ApplyOfferDto} from '../dtos/apply-offer.dto';
import {logger} from '../logger/logger';
import { ConfigService } from '@nestjs/config'

@Controller('offers')
export class offerController{
    constructor(private readonly offerService : OfferService,
        private configService: ConfigService){}
    @Get(':id')
    getOffers(@Param('id') id : string, @Req()req, @Res()res){
        logger.info('[/offers] New request- Method: '+req.method + " Content-type: " + req.headers['Content-Type'] + " Id: " + id);
        return this.offerService.getOffers(id,req,res);
    }

    @Post('find')
    find(@Body() findOfferDto : FindOfferDto, @Req() req , @Res() res) : any {
        logger.info('[/offers/find] New request- Method: '+req.method + " Content-type: " + req.headers['Content-Type'] + " Body: " + JSON.stringify(req.body));
        return this.offerService.find(findOfferDto,req,res);
    }

    @Get( ['afinity',':id'])
    getAfinity(@Param('id') id : string, @Req() req , @Res() res) : any {
        logger.info('[/offers/afinity] New request- Method: '+req.method + " Content-type: " + req.headers['Content-Type'] + " Id: " + id);
        return this.offerService.getAfinity(id,req,res);
    }

    @Put('apply')
    applyOffer(@Body() applyOfferDto : ApplyOfferDto, @Req() req , @Res() res) : any {
        logger.info('[/offers/apply] New request- Method: '+req.method + " Content-type: " + req.headers['Content-Type'] + " Body: " + JSON.stringify(req.body));
        return this.offerService.applyOffer(applyOfferDto,req,res);
    }
    
}