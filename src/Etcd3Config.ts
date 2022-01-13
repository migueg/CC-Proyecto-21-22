import { Etcd3 } from "etcd3";


export class Etcd3Config {
    private client : Etcd3;

    constructor () {
        this.client = new Etcd3();
    }

    public get(key: string) : any {
        try{ 
            this.client.get('key')
        }catch(err){
            return process.env[key]
        }
        
    }

    public put(key: string, value: string){
        this.client.put(key).value(value);
    }
}