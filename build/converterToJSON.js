"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
var fs = __importStar(require("fs"));
var logger_1 = require("./logger/logger");
var pdf2json;
if (process.env.PWD == "/app/test") {
    pdf2json = require("../../node_modules/pdf2json/pdfparser");
}
else {
    pdf2json = require("../node_modules/pdf2json/pdfparser");
}
//
var Converter;
(function (Converter) {
    var availableFormats;
    (function (availableFormats) {
        availableFormats["PDF"] = "pdf";
        availableFormats["XML"] = "xml";
    })(availableFormats = Converter.availableFormats || (Converter.availableFormats = {}));
    var ConverterToJson = /** @class */ (function () {
        function ConverterToJson(languages, pathTofile) {
            this.cv = {};
            this.education = new Array();
            this.competences = new Array();
            this.experience = new Array();
            this.languages = new Array();
            this.translator = new Translator(languages);
            this.format = "";
            this.pathTofile = pathTofile;
            this.pdfParser = new pdf2json(this, 1);
            this.areas = ["Competencias", "Idiomas", "Formacion", "Formación", "Experiencia Laboral", "Experiencia", "Educación"];
            this.cvStringCleaned = "";
        }
        ConverterToJson.prototype.detectFormat = function (file) {
            var splitted = file.split(".");
            var format = "";
            format = splitted[splitted.length - 1];
            return format;
        };
        ConverterToJson.prototype.isAvailableFormat = function (file) {
            var isAvailableFormat = false;
            var format = this.detectFormat(file);
            switch (format) {
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
        };
        ConverterToJson.prototype.cleanCv = function (pathTofile) {
            this.cvStringCleaned = fs.readFileSync(pathTofile, { encoding: 'utf8', flag: 'r' });
            this.cvStringCleaned = this.cvStringCleaned.replace(/\n/g, ''); //Borra todos los \n
            this.cvStringCleaned = this.cvStringCleaned.replace(//g, ' ');
            return this.cvStringCleaned;
        };
        ConverterToJson.prototype.searchCompetences = function (pathTofile) {
            var cv = this.cleanCv(pathTofile);
            var cvSplited = cv.split('\r');
            var competencesIndex = cvSplited.indexOf("Competencias");
            var technical = [];
            var personal = [];
            var isTechnical = false;
            var isPersonal = false;
            competencesIndex += 1;
            while (!this.areas.includes(cvSplited[competencesIndex]) && competencesIndex < cvSplited.length - 1) {
                var aux = cvSplited[competencesIndex].split(' ');
                if (aux.length > 1 && (aux[0] != '')) {
                    switch (aux[0]) {
                        case 'Técnicas':
                            for (var i = 1; i < aux.length; i++) {
                                technical.push(aux[i]);
                            }
                            isTechnical = true;
                            break;
                        case 'Otras':
                            for (var i = 1; i < aux.length; i++) {
                                personal.push(aux[i]);
                            }
                            isTechnical = false;
                            isPersonal = true;
                    }
                }
                else {
                    if (isTechnical) {
                        technical.push(cvSplited[competencesIndex]);
                    }
                    if (isPersonal) {
                        personal.push(cvSplited[competencesIndex]);
                    }
                }
                competencesIndex += 1;
            }
            this.competences.push({
                'technical': technical,
                'personal': personal,
            });
            return this.competences;
        };
        ConverterToJson.prototype.searchEducation = function (pathTofile) {
            var cv = this.cleanCv(pathTofile);
            var cvSplited = cv.split('\r');
            var educationIndex = cvSplited.indexOf("Formación");
            educationIndex += 1;
            while (!this.areas.includes(cvSplited[educationIndex]) && educationIndex < cvSplited.length - 1) {
                var stringCleaned = cvSplited[educationIndex].replace(/Estudios/g, ' ');
                var splited = stringCleaned.split(',');
                var dates = splited[2].split('-');
                this.education.push({
                    name: splited[1],
                    location: " ",
                    institution: splited[0],
                    initialDate: dates[0],
                    endDate: dates[1],
                });
                educationIndex += 1;
            }
            return this.education;
        };
        ConverterToJson.prototype.searchExperiences = function (pathTofile) {
            var cv = this.cleanCv(pathTofile);
            var cvSplited = cv.split('\r');
            var experienceIndex = cvSplited.indexOf("Experiencia Laboral");
            var iterations = 0;
            var experience = {};
            experienceIndex += 1;
            while (!this.areas.includes(cvSplited[experienceIndex]) && experienceIndex < cvSplited.length - 1) {
                switch (iterations) {
                    case 0:
                        experience.company = cvSplited[experienceIndex];
                        break;
                    case 1:
                        experience.place = cvSplited[experienceIndex];
                        break;
                    case 2:
                        experience.job = cvSplited[experienceIndex];
                        break;
                    case 3:
                        experience.startDate = cvSplited[experienceIndex].split('–')[0];
                        experience.endDate = cvSplited[experienceIndex].split('–')[1];
                        break;
                    case 4:
                        experience.description = cvSplited[experienceIndex];
                        break;
                }
                iterations++;
                if (iterations == 5) {
                    iterations = 0;
                    this.experience.push(experience);
                }
                experienceIndex += 1;
            }
            return this.experience;
        };
        ConverterToJson.prototype.convertToJson = function (pathTofile) {
            var cv = this.cleanCv(pathTofile);
            var cvSplited = cv.split('\r');
            var cvIndex = 0;
            var iteration = 0;
            var cvSchema = {};
            while (!this.areas.includes(cvSplited[cvIndex]) && cvIndex < cvSplited.length - 1) {
                switch (iteration) {
                    case 0:
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
                iteration++;
                cvIndex += 1;
            }
            cvSchema.competences = this.competences;
            cvSchema.education = this.education;
            cvSchema.competences = this.competences;
            cvSchema.experience = this.experience;
            this.cv = cvSchema;
            logger_1.logger.info(this.cv.toString());
            return this.cv;
        };
        ConverterToJson.prototype.loadPDF = function (pathTofile) {
            var _this = this;
            this.pdfParser.on("pdfParser_dataError", function (errData) { console.error(errData.parserError); return false; });
            this.pdfParser.on("pdfParser_dataReady", function (pdfData) {
                fs.writeFile("../test/mocks/testCV.txt", _this.pdfParser.getRawTextContent(), function () { return true; });
                fs.writeFile("../test/mocks/testCV.json", JSON.stringify(pdfData), function () { });
            });
            this.pdfParser.loadPDF(pathTofile);
            return true;
        };
        ConverterToJson.prototype.getEducation = function () {
            return this.education;
        };
        ConverterToJson.prototype.getCompetences = function () {
            return this.competences;
        };
        ConverterToJson.prototype.getExperiences = function () {
            return this.experience;
        };
        ConverterToJson.prototype.getCv = function () {
            return this.cv;
        };
        return ConverterToJson;
    }());
    Converter.ConverterToJson = ConverterToJson;
    var Translator = /** @class */ (function () {
        function Translator(languages) {
            this.languages = languages;
        }
        Translator.prototype.translate = function (cv) {
        };
        return Translator;
    }());
    Converter.Translator = Translator;
})(Converter = exports.Converter || (exports.Converter = {}));
