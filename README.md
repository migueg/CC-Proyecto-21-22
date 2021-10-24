# CC-Proyecto-21-22

Este repositorio contiene el proyecto realizado para las prácticas de la asignatura *Cloud Computing del Máster de Ingeniería Informática de la UGR* por @migueg.

>Versión 1.1.1

## Lógica de negocio

La lógica de negocio que va a comprender la solución propuesta puede consultarte en [Lógica de negocio](/DOC/Hitos/hito0.md).

## Hito 1

<a name="escenarios"></a>
### User Journey

Los [User Journey](/DOC/UserJourney.md) describen la interacción de los usuarios con el sistema.

### Historias de usuarios

A partir de los user journey y el problema planteado, inicialmente, se definen las siguientes historias de usuario:

- [HU1 - Como usuario quiero subir mi currículum](https://github.com/migueg/CC-Proyecto-21-22/issues/37)
- [HU2 - Como usuario, quiero encontrar ofertas de trabajo afines a mí en un radio de X kilómetros](https://github.com/migueg/CC-Proyecto-21-22/issues/38)
- [HU3 - Como usuario, quiero conocer porque soy compatible a una oferta para saber si el criterio de compatibilidad es válido](https://github.com/migueg/CC-Proyecto-21-22/issues/39)
- [HU4 - Como usuario, quiero solicitar ofertas de trabajo compatibles a mí](https://github.com/migueg/CC-Proyecto-21-22/issues/40)
- [HU5 - Como usuario, quiero modificar mi curriculum](https://github.com/migueg/CC-Proyecto-21-22/issues/41)
- [HU6 - Como usuario, quiero finalizar mi solicitud](https://github.com/migueg/CC-Proyecto-21-22/issues/42)

### Milestones

A continuación, se realiza una planificación del proyecto en distintos milestones:

- [Hito 1: Definición y creación del proyecto](https://github.com/migueg/CC-Proyecto-21-22/milestone/1)
- [Hito 2 : Procesamiento de curriculums y traducciones](https://github.com/migueg/CC-Proyecto-21-22/milestone/2)
- [Hito 3 : Búsqueda de ofertas](https://github.com/migueg/CC-Proyecto-21-22/milestone/3)
- [Hito 4 : Web scraping](https://github.com/migueg/CC-Proyecto-21-22/milestone/4)
- [Hito 5: Clasificación de las ofertas](https://github.com/migueg/CC-Proyecto-21-22/milestone/5)

### Estructura inicial

Se utilizará typescript como lenguaje principal para el desarrollo. Inicialmente se define el esqueleto del sistema, que contendrá las siguientes entidades o clases:

- **Finder**: Su responsabilidad será obtener las ofertas de trabajo de las distintas APIs externas. Estará definida el fichero [finder.ts](https://github.com/migueg/CC-Proyecto-21-22/blob/main/src/finder.ts)
- **Clasificator**: Su responsabilidad será determinar y clasificar las ofertas de trabajo según a criterios de compatibilidad con el usuario. Estará definido el fichero [clasificator.ts](https://github.com/migueg/CC-Proyecto-21-22/blob/main/src/clasificator.ts)
- **Converter**: Su responsabilidad será convertir los curriculums a objetos JSON. Estará definido en el fichero [convertToJSON.ts](https://github.com/migueg/CC-Proyecto-21-22/blob/main/src/converterToJSON.ts)
- **Translator**: Su responsabilidad será traducir los curriculums a los idiomas de preferencia. Estará definido en el fichero [convertToJSON.ts](https://github.com/migueg/CC-Proyecto-21-22/blob/main/src/converterToJSON.ts)
- **WebScraper**: Su responsabilidad será realizar el proceso de web scraping. Estará definido en el fichero [webScraper.ts](https://github.com/migueg/CC-Proyecto-21-22/blob/main/src/webScraper.ts)
- **JobOffer**: Su responsabilidad será representar a una oferta de trabajo. Estará definido en el fichero [jobOffer.ts](https://github.com/migueg/CC-Proyecto-21-22/blob/main/src/jobOffer.ts)
- **User**: Su responsabilidad será representar a un usuario en el sistema. Estará definido en el fichero [user.ts](https://github.com/migueg/CC-Proyecto-21-22/blob/main/src/user.ts)
- **cvSchema**: Su responsabilidad será representar a un curriculum. Estará definido en el fichero [cvSchema.ts](https://github.com/migueg/CC-Proyecto-21-22/blob/main/src/Schemas/cvSchema.ts)
- **Api**: Contituirá la API del sistema necesaria para poder realizar las distintas operaciones con este. stará definido en el fichero [api.ts](https://github.com/migueg/CC-Proyecto-21-22/blob/main/src/api.ts)


## Anteriores Hitos

La documentación relacionada con hitos anteriores se podrá consultar a través de los siguientes enlaces:

* [Hito 0](/DOC/Hitos/hito0.md)
