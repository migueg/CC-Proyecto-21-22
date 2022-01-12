import {ApplyOfferResponseDto} from './dtos/apply-offer-response.dto'
import { ApplyOfferDto } from 'src/dtos/apply-offer.dto';
export module offers {
    export type infoOffer = {
        name: string;
        company: string;
        other: Array<string>;
    }

    export class JobOffers{

        private offers : Array<JobOffer>
        constructor(){

        }

        public applyOffer(applyOfferDto : ApplyOfferDto){
            let response : ApplyOfferResponseDto;

            response = new ApplyOfferResponseDto();
            
            response.status = 'Not implemented'
            response.message = 'Not implemented';
            response.id = "";

            return response;
        }
t
        public getAfinity(offerId:string){
            let response : ApplyOfferResponseDto;

            response = new ApplyOfferResponseDto();
            
            response.status = 'Not implemented'
            response.message = 'Not implemented';
            response.id = "";

            return response;
        }
        public getOffers(userId : string) : void {

        }
    }
    export class JobOffer{
        private afinity : number;
        private info: infoOffer;
        private criteria : object | undefined;

        constructor(){
            this.afinity = -1;
            this.info = <infoOffer>{};
            this.criteria = undefined;
        }

       
        public getAfinity(): number{
            return this.afinity;
        }

        public setAfinity(afinity: number){
            this.afinity = afinity;
        }

        public getInfo(): infoOffer{
            return this.info;
        }

        public setInfo(info: infoOffer){
            this.info = info;
        }

        public getCriteria(): object|undefined{
            return this.criteria;
        }

        public setCriteria(criteria: object|undefined){
            this.criteria = criteria;
        }

        public apply(): ApplyOfferResponseDto | any {

        }
        
    }
}
