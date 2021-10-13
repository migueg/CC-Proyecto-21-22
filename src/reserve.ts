import { Order } from "./order";

export class Reserve{

    private date : Date;
    private people: number;
    private order: Order;
    private isPayed : boolean;
    private isCanceled : boolean; 
    private id : String;
    private owner : String;

    constructor(reserve : Reserve) {

    }

    public doReserve(date : Date , people : number , owner : string){

    }

    public cancelReserve(id : String){

    }

    public updateReserve(id : String , data : object){

    }

}