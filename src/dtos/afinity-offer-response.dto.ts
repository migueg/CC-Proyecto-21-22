export class AfinityOfferResponseDto{
    status : string;
    message : string;
    afinity : number;
    job: string;
    competences: Array<Object>;
    education: Array<Object>;
    experience: Array<Object>;
}