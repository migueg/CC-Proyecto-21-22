import {Converter} from '../src/converterToJSON';
const fs = require('fs');
const mocks = require('node-mocks-http');
const converterToJSON =  new Converter.ConverterToJson(["spanish","english"], "../test/mocks/curriculum.pdf");
import { cvController } from '../src/controllers/cvController';
import {CurriculumService} from '../src/services/curriculums.service';
import { offerController } from '../src/controllers/offer.controller';
import {OfferService} from '../src/services/offer.service';
import {Test} from '@nestjs/testing';
import { FindOfferDto } from '../src/dtos/find-offer.dto';
import { ApplyOfferDto } from '../src/dtos/apply-offer.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';

var streamBuffers = require('stream-buffers');

const fileToBuffer = (path :string) => {
    const readStream = fs.createReadStream(path);
    const chunks = [];
    return new Promise((resolve, reject) => {
      readStream.on('error', (err) => {
        reject(err);
      });
      readStream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      readStream.on('close', () => {
        resolve(Buffer.concat(chunks));
      });
    });
  };

  const fileBuffer = fileToBuffer(
     __dirname+'/mocks/testCV.pdf'
  ) ;

  var file:any = {};
        const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
            frequency: 10, // in milliseconds.
            chunkSize: 2048, // in bytes.
        });
        myReadableStreamBuffer.put(fileBuffer);
        file = {
            buffer: fileBuffer,
            fieldname: 'file',
            originalname: 'testCV.pdf',
            encoding: '7bit',
            mimetype: 'form-data',
            destination: './files',
            filename: 'testCV.pdf',
            path: __dirname+ '/mocks',
            size: 955578,
            stream: myReadableStreamBuffer,
        };


describe('Quiero utilizar la api del sistema',() => {
    describe('Necesito actuar sobre el recurso curriculum',() => {
        let curriculumController : cvController
        let curriculumService : CurriculumService

        beforeEach(async () =>{
            const moduleTest = await Test.createTestingModule({
                controllers: [cvController],
                providers: [CurriculumService , {
                    provide: ConfigService,
                    useValue:  { 
                        get: jest.fn((key : string) => {
                            if(key === 'routesCV'){
                                return 'routes'
                            }
                        })
                    }
                }]
                
            }).compile()
         

            curriculumController = moduleTest.get<cvController>(cvController);
            curriculumService = moduleTest.get<CurriculumService>(CurriculumService);
        });

        describe('upload',() => {
            test('Si subo un pdf debería obtener un código 200',() => {
                const result = {
                    success: true,
                    originalname: 'testCV.pdf',
                    filename: 'testCV.pdf',
                    destination: './files',
                };
                const req = mocks.createRequest()
                req.res = mocks.createResponse()
                req.headers['Content-Type'] = 'application/pdf';

                var res = curriculumController.upload(file,req,req.res)
                expect(JSON.parse(res._getData())).toMatchObject(result);
                expect(res._getStatusCode()).toEqual(200);
            })

            test('Si la petición no contiene un archivo obtengo un código de error', () => {
                const req = mocks.createRequest()
                req.res = mocks.createResponse()
                req.headers['Content-Type'] = 'application/pdf';

                var res = curriculumController.upload(null,req,req.res)
                expect(res._getStatusCode()).toEqual(400);
            })

            test('Si el content-type de la cabecera es incorrecto, obtengo error', () => {
                const req = mocks.createRequest()
                req.res = mocks.createResponse()
                req.headers['Content-Type'] = 'application/json';

                var res = curriculumController.upload(file,req,req.res)
                expect(res._getStatusCode()).toEqual(400);
            })
        } )

        describe('Get curriculm', ()=>{
            const req = mocks.createRequest();
            req.res = mocks.createResponse();

            test('Si pido un curriculum existente lo obtengo', () => {
                var res = curriculumController.convert('testCV.pdf',req,req.res);
                expect(JSON.parse(res._getData()).curriculum).toEqual(expect.any(String))
                expect(res._getStatusCode()).toEqual(200);
            })

            test('Si pido un curriculum que no existe obtengo un error', () => {
                var res = curriculumController.convert('xx.pdf',req,req.res);
                expect(res._getStatusCode()).toEqual(500);
            })

            test('Si pido un curriculum en un formato no permitido, obtengo un error', () => { 
                var res = curriculumController.convert('testCV.txt',req,req.res);
                expect(res._getStatusCode()).toEqual(400);
            })
        })
       
    });
    describe('Necesito actuar sobre el recurso oferta', ()=>{

        let offerControl: offerController
        let offerService : OfferService

        beforeEach(async () =>{
            const moduleTest = await Test.createTestingModule({
                controllers: [offerController],
                providers: [OfferService, {
                    provide: ConfigService,
                    useValue:  { 
                        get: jest.fn((key : string) => {
                            if(key === 'routesCV'){
                                return 'routes'
                            }
                        })
                    }
                }],
            }).compile()
        

            offerControl = moduleTest.get<offerController>(offerController);
            offerService = moduleTest.get<OfferService>(OfferService);
        })

        let findOfferDto : FindOfferDto = new FindOfferDto();

            findOfferDto.age = 20;
            findOfferDto.competences = [{
                technical: ["c++", "java"],
                personal: ["team work", "scrum"]
            }]
            findOfferDto.education = [{
                name: "Ingenieria Informática",
                location: "Granada",
                institution: "UGR",
                initialDate: "2017-09-09",
                endDate: "2021-07-31"
            }]

            findOfferDto.experience = [{
                job: "Técnico redes",
                company: "Redelan",
                place: "Armilla",
                startDate: "2020-03-01",
                endDate: "2021-03-01",
                description: "trabajo con redes"
            }]

            findOfferDto.gender = "male"
            findOfferDto.languages = [{
                language: "ingles",
                writing: "alto",
                speaking: "alto",
                listening: "alto",
            }]

            findOfferDto.location = "España"
            findOfferDto.range = 100
            
        describe('Find offers', ()=>{
            
            test('Si solicito ofertas afines de manera adecuada obtengo las ofertas',()=>{
                const req = mocks.createRequest();
                req.res = mocks.createResponse();
                
                req.headers['Content-Type'] = 'application/json';
               
                var res = offerControl.find(findOfferDto,req,req.res)

                expect(res._getStatusCode()).toEqual(200);

            })

            test('Si solicito ofertas afines con un content-type erroneo obtengo códgio de error', ()=>{
                const req = mocks.createRequest();
                req.res = mocks.createResponse();
                
                req.headers['Content-Type'] = 'application/xml';
               
                var res = offerControl.find(findOfferDto,req,req.res)

                expect(res._getStatusCode()).toEqual(400);

            })
            test('Si solicito ofertas afines sin especificar rango ni localización obtengo código de error', ()=>{
                const req = mocks.createRequest();
                req.res = mocks.createResponse();
                
                req.headers['Content-Type'] = 'application/json';
                
                findOfferDto.range = null;
                var res = offerControl.find(findOfferDto,req,req.res)

                expect(res._getStatusCode()).toEqual(400);

                findOfferDto.range = 200
                findOfferDto.location = null
                

                res = offerControl.find(findOfferDto,req,req.res)

                expect(res._getStatusCode()).toEqual(400);
            })
            test('Si solicito ofertas afines sin información suficiente para buscar obtengo código de error', ()=>{
                const req = mocks.createRequest();
                req.res = mocks.createResponse();
                
                req.headers['Content-Type'] = 'application/json';
                
                findOfferDto.location = "Armilla"
                findOfferDto.experience = undefined;
                findOfferDto.education = undefined;
                findOfferDto.competences = undefined;

                var res = offerControl.find(findOfferDto,req,req.res)

                expect(res._getStatusCode()).toEqual(400);
            })
        })
        describe('Get offers', () => {
            test('Si pido las ofertas para un usuario que existe y que solicito ofertas recibo las ofertas', () => {
                const req = mocks.createRequest();
                req.res = mocks.createResponse();

                var res = offerControl.getOffers('1',req,req.res);
                expect(res._getStatusCode()).toEqual(200);
            })

            //More test will be implemented
        });

        describe('Get afinity', () => {
            test('Si pido la afinidad para una oferta existente obtengo un codigo 200', ()=>{
                const req = mocks.createRequest();
                req.res = mocks.createResponse();

                var res = offerControl.getAfinity('1',req,req.res);
                expect(res._getStatusCode()).toEqual(200);
            })

            //More test will be implemented
        })

        describe('Apply offer', () => {
            let applyOfferDto : ApplyOfferDto  = new ApplyOfferDto();
            applyOfferDto.id = '1';
            applyOfferDto.email = "test@gmail.com";
            applyOfferDto.name = "pepe";
            test('Si solicito una oferta existente con el body correcto y el content-type correcto obtengo código 200', ()=>{
                const req = mocks.createRequest();
                req.res = mocks.createResponse();
                
                req.headers['Content-Type'] = 'application/json'

                var res = offerControl.applyOffer(applyOfferDto,req,req.res);
                expect(res._getStatusCode()).toEqual(200);
            })

            test('Si solicito una oferta con un content-type erroneo obtengo un código 400', () =>{
                const req = mocks.createRequest();
                req.res = mocks.createResponse();

                req.headers['Content-Type'] = 'application/text'

                var res = offerControl.applyOffer(applyOfferDto,req,req.res);
                expect(res._getStatusCode()).toEqual(400);
            })

            test('Si solicito una oferta con un el body incorrecto obtengo un código 400', () =>{
                const req = mocks.createRequest();
                req.res = mocks.createResponse();

                req.headers['Content-Type'] = 'application/json'

                applyOfferDto.id = ""

                var res = offerControl.applyOffer(applyOfferDto,req,req.res);
                expect(res._getStatusCode()).toEqual(400);
            })
        })
    })
})