import {Converter} from '../src/converterToJSON';
const fs = require('fs');
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
            originalName: 'testCV.pdf',
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
                    originalName: 'testCV.pdf',
                    filename: 'testCV.pdf',
                    destination: './files',
                };
                jest.spyOn(curriculumService, 'upload').mockImplementation(() => result);

                expect(curriculumController.upload(file)).toMatchObject(result);
            })
        } )
       
    })
});