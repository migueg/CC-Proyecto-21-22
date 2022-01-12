import { FindOfferDto, FindOfferResponseDto } from './dtos/find-offer.dto';
export class Finder {
    // to implement
    public fetchAPI(url : string , params : object) : object{
        return {};
   }

   public find(findOfferDto : FindOfferDto) : FindOfferResponseDto{
    let response : FindOfferResponseDto;

    response = new FindOfferResponseDto();

    response.status = 'Not implemented'
    response.offers = [];
    response.id = "";

    return response;
   }

   public getOffers(id : string) : FindOfferResponseDto{

    let response : FindOfferResponseDto;

    response = new FindOfferResponseDto();

    response.status = 'Not implemented'
    response.offers = [];
    response.id = "";

    return response;
   }
}