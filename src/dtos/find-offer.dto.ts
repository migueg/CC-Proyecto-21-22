
export class FindOfferDto{
    age: number;
    range: number;
    gender: string;
    location: string;
    job: string;
    education: Array<Object>;
    competences: Array<Object>;
    experience: Array<Object>;
    languages: Array<Object>;
}

export class FindOfferResponseDto{
    status: string;
    id: string;
    offers: Array<Object>;
    message: string;
}

export enum Status {
    //Not implemented
    //success 
    //failure
}