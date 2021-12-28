import {Converter} from '../src/converterToJSON';
const fs = require('fs');
const mocks = require('node-mocks-http');
const converterToJSON =  new Converter.ConverterToJson(["spanish","english"], "../test/mocks/curriculum.pdf");
import { cvController } from '../src/controllers/cvController';
import {CurriculumService} from '../src/services/curriculums.service';
import {Test} from '@nestjs/testing';

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
                providers: [CurriculumService],
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
       
    })
});