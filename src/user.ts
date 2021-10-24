import * as schemas from './Schemas/cvSchema';
import { offers } from './jobOffer';
export class User{

    private cv : Array<schemas.cvSchemas.cvSchema>;
    private offers : Array<offers.JobOffer>;
    private username : string | undefined;
    private languages : Array<string> | undefined;
    private email : string | undefined;
    private age : number | undefined;


    constructor(name? : string, email? : string, age?: number, languages? : Array<string>){
        this.username = name;
        this.email = email;
        this.age = age;
        this.languages = languages;
        this.offers = new Array<offers.JobOffer>();
        this.cv = []; 

    }

  
    public setJobOffers  (offers : Array<offers.JobOffer>) : void{
        this.offers = offers;
    }

    public addJobOffer (offer : offers.JobOffer) : void{
        this.offers.push(offer);
    }

    public getJobsOffers () : Array<offers.JobOffer>{
        return this.offers;
    }

    public setLanguages(languages : Array<string>) : void{
        this.languages = languages;
    }

    public getLanguages () : Array<string>{
        return this.languages || [];
    }
}