import * as cvSchemas from './Schemas/cvSchema';

export  module Converter{
    export enum availableFormats {
        PDF = 'pdf',
        XML = 'xml'
    }
    export class ConverterToJson{
    
        private cv : cvSchemas.cvSchemas.cvSchema;
        private education : Array<cvSchemas.cvSchemas.education>;
        private competences: Array<cvSchemas.cvSchemas.competences>;
        private experience: Array<cvSchemas.cvSchemas.experience>;
        private translator : Translator;
        private pathTofile : string;
        private format : string;

        constructor(languages : Array<string>, pathTofile : string) {
            this.cv = <cvSchemas.cvSchemas.cvSchema>{};
            this.education = new Array<cvSchemas.cvSchemas.education>();
            this.competences = new Array<cvSchemas.cvSchemas.competences>();
            this.experience = new Array<cvSchemas.cvSchemas.experience>();
            this.translator = new Translator(languages);

            this.format = "";
            this.pathTofile = pathTofile;
        }

        public detectFormat(file : string) : string{
            let splitted  = file.split(".");
            let format = "";
            
            format = splitted [splitted.length - 1];
            
            return format;
        }

        public isAvailableFormat(file : string) : boolean{
            //let isAvailableFormat :  boolean  = false;

            return true;

        }
        private searchCompetences() : Array<cvSchemas.cvSchemas.competences>{
            return [];
        }
        private searchEducation() : Array<cvSchemas.cvSchemas.education>{
            return [];
        }
        private searchExperiences() : Array<cvSchemas.cvSchemas.experience>{
            return [];
        }
        public convertToJson(): Array<cvSchemas.cvSchemas.cvSchema>{

            return [];
        }
        
    }

    export class Translator{
        
        private languages : Array<string>;
        constructor(languages : Array<string>){
            this.languages = languages;
        }

        public translate (cv : cvSchemas.cvSchemas.cvSchema) : any {

        }
    }
}