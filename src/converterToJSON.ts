import * as cvSchemas from './Schemas/cvSchema';
import * as fs from 'fs';
import { StreamOptions } from 'stream';
import {logger} from './logger/logger';

var pdf2json : any;
if(process.env.PWD == "/app/test"){
      pdf2json = require("../../node_modules/pdf2json/pdfparser");
}else{
      pdf2json = require("../node_modules/pdf2json/pdfparser");
}

//
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
            this.areas = ["Competencias", "Idiomas" , "Formacion" , "Formación", "Experiencia Laboral", "Experiencia","Educación"];
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

            return this.competences;
            
        }
        public searchEducation(pathTofile : string) : Array<cvSchemas.cvSchemas.education>{
            let cv = this.cleanCv(pathTofile); 
            let cvSplited = cv.split('\r');
            let educationIndex = cvSplited.indexOf("Formación");
            educationIndex += 1;
            while( !this.areas.includes(cvSplited[educationIndex]) && educationIndex < cvSplited.length-1){
                let stringCleaned = cvSplited[educationIndex].replace(/Estudios/g,' ');
                let splited = stringCleaned.split(',');
                let dates = splited[2].split('-');
                
                this.education.push(<cvSchemas.cvSchemas.education>{
                    name: splited[1],
                    location: " ",
                    institution: splited[0],
                    initialDate: dates[0],
                    endDate: dates[1],
                })
                
                educationIndex +=1;
            }

            return this.education;
        }
        public searchExperiences(pathTofile : string) : Array<cvSchemas.cvSchemas.experience>{
            let cv = this.cleanCv(pathTofile); 
            let cvSplited = cv.split('\r');
            let experienceIndex = cvSplited.indexOf("Experiencia Laboral");
            let iterations = 0;
            let experience : cvSchemas.cvSchemas.experience = <cvSchemas.cvSchemas.experience>{};

            experienceIndex += 1;
                        
            while( !this.areas.includes(cvSplited[experienceIndex]) && experienceIndex < cvSplited.length-1){
                switch(iterations){
                    case 0 : 
                    experience.company = cvSplited[experienceIndex];
                    break;
                    case 1 : 
                    experience.place = cvSplited[experienceIndex];
                    break;
                    case 2 : 
                    experience.job = cvSplited[experienceIndex];
                    break;
                    case 3 : 
                    experience.startDate = cvSplited[experienceIndex].split('–')[0];
                    experience.endDate = cvSplited[experienceIndex].split('–')[1];
                    break;
                    case 4: 
                    experience.description = cvSplited[experienceIndex];
                    break;
                }
                iterations++;
                if(iterations == 5){
                    iterations = 0;
                    this.experience.push(experience);
                }
                
                experienceIndex +=1;
            }
            
            return this.experience;
        }
        public convertToJson(pathTofile : string): cvSchemas.cvSchemas.cvSchema{
            let cv : string = this.cleanCv(pathTofile); 
            let cvSplited : Array<string>= cv.split('\r');
            let cvIndex : number = 0;
            let iteration : number = 0;
            let cvSchema : cvSchemas.cvSchemas.cvSchema = <cvSchemas.cvSchemas.cvSchema>{};

            while( !this.areas.includes(cvSplited[cvIndex]) && cvIndex < cvSplited.length-1){
                switch(iteration){
                    case 0 : 
                        cvSchema.name = cvSplited[cvIndex];
                        cvSchema.age = 0;
                        cvSchema.birth = "not found";
                        break;
                    case 1: 
                        cvSchema.job = cvSplited[cvIndex];
                        break;
                    case 2:
                        cvSchema.address = cvSplited[cvIndex].split('+')[0];
                        cvSchema.number = cvSplited[cvIndex].split('+')[1];
                        break;
                    case 3:
                        cvSchema.address += ", " + cvSplited[cvIndex].split(',')[0];
                        cvSchema.email = cvSplited[cvIndex].split(',')[1];
                        break;
                    case 4:
                        cvSchema.description = cvSplited[cvIndex];
                        break;
                }

                iteration++
                cvIndex +=1;
            }

            cvSchema.competences = this.competences != null || this.competences != undefined || this.competences.length == 0 ? this.competences : this.searchCompetences(pathTofile);
            cvSchema.education = this.education != null || this.education != undefined || this.education.length == 0 ? this.education : this.searchEducation(pathTofile);
            cvSchema.experience = this.experience != null || this.experience != undefined || this.experience.length == 0 ? this.experience : this.searchExperiences(pathTofile);
            
            this.cv = cvSchema;
            return this.cv;
        }
        public loadPDF(pathTofile : string) : boolean {
            if(fs.existsSync(pathTofile)){
                this.pdfParser.on("pdfParser_dataError", (errData : any) => {console.error(errData.parserError); return false;});
                this.pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
                    fs.writeFile("../test/mocks/testCV.txt", this.pdfParser.getRawTextContent(), ()=>{ return true;});
                    fs.writeFile("../test/mocks/testCV.json",  JSON.stringify(pdfData), (errData : any)=>{});
                });
                this.pdfParser.loadPDF(pathTofile);
                return true;
            }else{
                return false;
            }
          
            
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

        public cvToString(): string{
            let result= "{";

            result += "name: " + this.cv.name;
            result += "age: " + this.cv.age;
            result += "birth:" + this.cv.birth;
            result += "address:" + this.cv.address;
            result += "description: " + this.cv.description;
            result += "job:" + this.cv.job;
            result += "email:" + this.cv.email;
            result += "number:" + this.cv.number;

            result += "education: ["

            for(let edu of this.cv.education){
                result += "{";
                result += "name:" + edu.name;
                result += "location:" + edu.location;
                result += "institution:" + edu.institution;
                result += "endDate:" + edu.endDate;
                result += "}";

            }
            result += "]";
            result += "competeneces: [";

            for(let comp of this.cv.competences){
                result += "{";
                result += "technical: "+ comp.technical;
                result += "personal:"+comp.personal;
                result += "}"
            }

            result += "]";
            result += "experience: [";

            for(let exp of this.cv.experience){
                result += "{";
                result += "job:" + exp.job;
                result += "company:" + exp.company;
                result += "place:"+ exp.place;
                result += "startDate:"+exp.startDate;
                result += "endDate:"+exp.endDate;
                result += "description:"+exp.description;
                result += "}"

            }

            result += "]";
           
            return result;
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