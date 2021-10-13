import { Reserve } from "./reserve";
import {employee} from "./employee";
import {letter} from "./letter";

export class establishment {

    private location:string;
    private reserves : Reserve[];
    private employees : employee[];
    private letter: letter;

    constructor(data:object){
        this.init(data)
    }

    private init(data:object){

    }

    public doReserve(){

    }

    public cancelResrve(){

    }

    public updateEstablishment(){

    }

    public getLetter(){

    }

    public setLetter(letter : letter){

    }

    public updateleter(data : object){
        
    }



}

