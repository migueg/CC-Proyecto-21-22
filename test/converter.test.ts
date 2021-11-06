import exp from 'constants';
import {Converter} from '../src/converterToJSON';
const fs = require('fs');
const converterToJSON =  new Converter.ConverterToJson(["spanish","english"], "../test/mocks/curriculum.pdf");

describe('Quiero subir un curriculum', () => {
  describe('Necesito saber si se detecta correctamente el fromato', () => {
  
    test('curriculum.pdf debría ser un pdf', () => {
      const file = "curriculum.pdf"
         expect(converterToJSON.detectFormat(file)).toBe("pdf");
    });

    test('curriculum.cv.pdf debería seguir siendo un pdf', () => {
      const file = "curriculum.cv.pdf"
      expect(converterToJSON.detectFormat(file)).toBe("pdf");
    })

    test('Pdf es un formato permitido', ()=> {
      const file = "curriculum.pdf";
      expect(converterToJSON.isAvailableFormat(file)).toBe(true);
    })
    test('Xml es un formato permitido', ()=> {
      const file = "curriculum.xml";
      expect(converterToJSON.isAvailableFormat(file)).toBe(true);
    })
  })
  describe('Necesito saber si un pdf se convierte a json correctamente', ()=> {
    const pathPdf= "/home/migue/Master/CC/CC-Proyecto-21-22/test/mocks/testCV.pdf";
    const pathToParser = "/home/migue/Master/CC/CC-Proyecto-21-22/test/mocks/testCV.txt";
    //converterToJSON.convertToJson();
    test('El curriculum en pdf se obtiene correctamente del directorio y lo vuelca a un fichero de texto', ()=> {
      expect(converterToJSON.loadPDF(pathPdf)).toBe(true);
      let file = fs.readFileSync(pathPdf, 'utf8');
      expect(file).toStrictEqual(expect.any(String));

    })
    test('El campo educación se parsea adecuadamente', () =>{
      const education = converterToJSON.getEducation();
      expect(education).not.toEqual([]);
      for(let i = 0; i < education.length; i +=1) {
        expect(education[i]).toHaveProperty('name')
        expect(education[i].name).toEqual(expect.any(String));
        expect(education[i]).toHaveProperty('location')
        expect(education[i].location).toEqual(expect.any(String));
        expect(education[i]).toHaveProperty('institution')
        expect(education[i].institution).toEqual(expect.any(String));
        expect(education[i]).toHaveProperty('initialDate')
        expect(education[i].initialDate).toEqual(expect.any(Date));
        expect(education[i]).toHaveProperty('endDate')
        expect(education[i].endDate).toEqual(expect.any(Date));
      }
    })

    test('El campo competences se parsea adecuadamente', async () =>{
      expect(converterToJSON.searchCompetences(pathToParser)).not.toBe([]);
      const competences = converterToJSON.getCompetences();
      expect(competences).not.toEqual([]);

      for(let i = 0; i < competences.length; i +=1) {
        expect(competences[i]).toHaveProperty('technical')
        expect(competences[i].technical).not.toEqual([]);
        expect(competences[i].technical).toContainEqual(expect.any(String));
        expect(competences[i]).toHaveProperty('personal')
        expect(competences[i].personal).not.toEqual([]);
        expect(competences[i].personal).toContainEqual(expect.any(String));
      }
    })

    test('El campo experience se parsea adecuadamente', () =>{
      const experience = converterToJSON.getExperiences();
      expect(experience).not.toEqual([]);
      for(let i = 0; i < experience.length; i +=1) {
        expect(experience[i]).toHaveProperty('job')
        expect(experience[i].job).toEqual(expect.any(String));
        expect(experience[i]).toHaveProperty('company')
        expect(experience[i].company).toEqual(expect.any(String));
        expect(experience[i]).toHaveProperty('place')
        expect(experience[i].place).toEqual(expect.any(String));
        expect(experience[i]).toHaveProperty('description')
        expect(experience[i].description).toEqual(expect.any(String));
        expect(experience[i]).toHaveProperty('startDate')
        expect(experience[i].startDate).toEqual(expect.any(Date));
        expect(experience[i]).toHaveProperty('endDate')
        expect(experience[i].endDate).toEqual(expect.any(Date));
      }
    })
    test('El curriculum debería haberse parseado correctamente', () => {
      const cv = converterToJSON.getCv();

      expect(cv).not.toBeNull();
      expect(cv).not.toBeUndefined();

      expect(cv).toEqual(expect.objectContaining({
        name: expect.any(String),
        age: expect.any(Number),
        birth: expect.any(Date),
        address: expect.any(String),
        description: expect.any(String),
        job: expect.any(String),
        education: expect.any(Array),
        competences: expect.any(Array),
        experience: expect.any(Array),
        image: expect.any(String),
      }))
    })
  })
})


