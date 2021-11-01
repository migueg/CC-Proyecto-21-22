import {Converter} from '../src/converterToJSON';



describe('converter', () => {
  
  test('curriculum.pdf es un pdf', () => {
    const file = "curriculum.pdf"
    const languajes = ["spanish", "english"]
    const converterToJSON =  new Converter.ConverterToJson(languajes, "");

    expect(converterToJSON.detectFormat(file)).toBe("pdf");
    
  });
  test('curriculum.cv.pdf sigue siendo un pdf', () => {
    const file = "curriculum.cv.pdf"
    const languajes = ["spanish", "english"]
    const converterToJSON =  new Converter.ConverterToJson(languajes, "");

    expect(converterToJSON.detectFormat(file)).toBe("pdf");
  })
  test('Pdf es un formato permitido', ()=> {
    const file = "curriculum.pdf";

    const converterToJSON =  new Converter.ConverterToJson([], "");

    expect(converterToJSON.isAvailableFormat(file)).toBe(true);
  })
  test('Xml es un formato permitido', ()=> {
    const file = "curriculum.xml";

    const converterToJSON =  new Converter.ConverterToJson([], "");

    expect(converterToJSON.isAvailableFormat(file)).toBe(true);
  })
})
