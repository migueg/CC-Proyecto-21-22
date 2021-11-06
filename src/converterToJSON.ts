import * as cvSchemas from './Schemas/cvSchema';
import * as fs from 'fs';
import { StreamOptions } from 'stream';
const  pdf2json = require("../node_modules/pdf2json/pdfparser");

//const fs = require('fs'),


export  module Converter{
    export enum availableFormats {
        PDF = 'pdf',
        XML = 'xml'
    }
    export class ConverterToJson{
    
        private cv : cvSchemas.cvSchemas.cvSchema;
        private cvStringCleaned : string;
        private education : Array<cvSchemas.cvSchemas.education>;
        private competences: Array<cvSchemas.cvSchemas.competences>;
        private experience: Array<cvSchemas.cvSchemas.experience>;
        private languages: Array<cvSchemas.cvSchemas.languages>;
        private translator : Translator;
        private pathTofile : string;
        private format : string;
        private pdfParser : any;
        private areas : Array<String>
        

        constructor(languages : Array<string>, pathTofile : string) {
            this.cv = <cvSchemas.cvSchemas.cvSchema>{};
            this.education = new Array<cvSchemas.cvSchemas.education>();
            this.competences = new Array<cvSchemas.cvSchemas.competences>();
            this.experience = new Array<cvSchemas.cvSchemas.experience>();
            this.languages = new Array<cvSchemas.cvSchemas.languages>();
            this.translator = new Translator(languages);

            this.format = "";
            this.pathTofile = pathTofile;
            this.pdfParser =  new pdf2json(this,1);
            this.areas = ["Competencias", "Idiomas" , "Formacion" , "Experiencia Laboral", "Experiencia","Educación"];
            this.cvStringCleaned = "";
        }

        public detectFormat(file : string) : string{
            let splitted  = file.split(".");
            let format = "";
            
            format = splitted [splitted.length - 1];
            
            return format;
        }

        public isAvailableFormat(file : string) : boolean{
            let isAvailableFormat :  boolean  = false;
            let format : string = this.detectFormat(file);

            switch (format){
                case availableFormats.PDF:
                    isAvailableFormat = true;
                    break;
                case availableFormats.XML:
                    isAvailableFormat = true;
                    break;
                default: 
                    break;
            }

            return isAvailableFormat;

        }
        private cleanCv (pathTofile : string) : string{
            this.cvStringCleaned = fs.readFileSync(pathTofile,{encoding:'utf8', flag:'r'});
            this.cvStringCleaned = this.cvStringCleaned.replace(/\n/g,''); //Borra todos los \n
            this.cvStringCleaned = this.cvStringCleaned.replace(//g,' ');
            return this.cvStringCleaned;
        }
        public searchCompetences(pathTofile : string) : Array<cvSchemas.cvSchemas.competences>{
            let cv = this.cleanCv(pathTofile); 
            let cvSplited = cv.split('\r');
            let competencesIndex = cvSplited.indexOf("Competencias")
            let technical : Array<string> = [];
            let personal : Array<string> = [];
            let isTechnical = false;
            let isPersonal = false;
            competencesIndex += 1;
            while(!this.areas.includes(cvSplited[competencesIndex]) && competencesIndex < cvSplited.length-1){
               
                let aux = cvSplited[competencesIndex].split(' '); 
                if(aux.length > 1 && (aux[0] != '')){
                    switch(aux[0]){
                        case 'Técnicas':
                            for(let i = 1 ; i < aux.length ; i++){
                                technical.push(aux[i]);
                            }
                            isTechnical = true;
                            break;
                        case 'Otras':
                            for(let i = 1 ; i < aux.length ; i++){
                                personal.push(aux[i]);
                            }
                            isTechnical = false;
                            isPersonal = true;

                    }
                }else{
                    if(isTechnical){
                        technical.push(cvSplited[competencesIndex]);
                    }
                    if(isPersonal){
                        personal.push(cvSplited[competencesIndex]);
                    }
                }
                competencesIndex += 1;
            }
        
            this.competences.push(<cvSchemas.cvSchemas.competences>{
                'technical' : technical,
                'personal': personal,
            })

            console.log('Encontradas las siguientes competencias: \n'+this.competences[0]);
            return this.competences;
            
        }
        public searchEducation(pathTofile : string) : Array<cvSchemas.cvSchemas.education>{
            let cv = this.cleanCv(pathTofile); 
            let cvSplited = cv.split('\r');
            let educationIndex = cvSplited.indexOf("Formación");
            
            return [];
        }
        private searchExperiences() : Array<cvSchemas.cvSchemas.experience>{
            return [];
        }
        public convertToJson(): Array<cvSchemas.cvSchemas.cvSchema>{

            return [];
        }
        public loadPDF(pathTofile : string) : boolean {
            this.pdfParser.on("pdfParser_dataError", (errData : any) => {console.error(errData.parserError); return false;});
            this.pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
                fs.writeFile("/home/migue/Master/CC/CC-Proyecto-21-22/test/mocks/testCV.txt", this.pdfParser.getRawTextContent(), ()=>{ return true;});
                fs.writeFile("/home/migue/Master/CC/CC-Proyecto-21-22/test/mocks/testCV.json",  JSON.stringify(pdfData), ()=>{});
            });
            this.pdfParser.loadPDF(pathTofile);
            return true;
        }
        public getEducation(): Array<cvSchemas.cvSchemas.education>{
            return this.education;
        }
        
        public getCompetences(): Array<cvSchemas.cvSchemas.competences>{
            return this.competences;
        }
        public getExperiences(): Array<cvSchemas.cvSchemas.experience>{
            return this.experience;
        }

        public getCv(): cvSchemas.cvSchemas.cvSchema{
            return this.cv;
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