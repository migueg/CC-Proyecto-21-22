export module offers {
    export type infoOffer = {
        name: string;
        company: string;
        other: Array<string>;
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
    }
}
