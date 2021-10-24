# Hito0
>Versión 0.1.0
## Contenidos

* [Descripción del proyecto](#item1)
* [Documentación adicional](#Additional)


<a name="item1"></a>
## Descripción del proyecto

### Descripción del problema

Imagina que has acabado un grado universitario, o se te ha acabado un contrato de trabajo. Es el momento de buscar un trabajo, pero ¿como y donde buscamos?. Muchos no hemos encontrado en esa situación de incertidumbre. Existen multitud de plataformas de empleo donde encontrar numerosas ofertas pero muchas de ellas, no concuerdan con lo que buscamos o simplemente no son para nosotros. Internet nos facilita la vida, pero también provoca un exceso de información que pueda hacer difícil hacer una buena selección y encontrar aquella información o en este caso ofertas de trabajo que podrían encajar con nosotros o que pudiéramos tener posibilidades y así optimizar nuestra selección.
Por otra parte, una vez inmersos en proceso de selección no somos validos para el puesto o simplemente no encajamos, o aceptamos la primera oferta por "miedo a no tener mas". Por lo tanto la gran pregunta es ¿Como puedo buscar trabajo de manera eficiente y acertada?

### Lógica de negocio

La solución propuesta para resolver este problema es la creación de un sistema que recibirá curriculums de usuarios y le ofrecerá una listado de ofertas que sean compatibles y afines con los usuarios, es decir el sistema predecirá en que puestos tienen mas posibilidades para entrar y encajar.Para ello el sistema convertirá la información de los curriculums a un formato  JSON. De esos curriculums convertidos, se extraerán palabras clave que serán usadas para obtener un listado de empleos de diferentes APIS ofrecidas por plataformas como Indeed, Glasdoor o Linkedin.
Paralelamente a esto se realizará un proceso de web scraping sobre perfiles de plataformas como Linkedin, Indeed o Glasdoor para aumentar mas la fuente de conocimiento para que el resultado del proceso sea más adecuado.  

Una vez obtenido un listado amplio de empleos, mediante un algoritmo  se usará la información de los curriculums y la base datos obtenida del web scramping para clasificar las ofertas en función de la compatibilidad que puedan tener los candidatos con estas

El resultado de este procesamiento será una lista de afinidad de ofertas de manera que el usuario podrá ver como de afín es a esa oferta y más información como salarios, de donde es la gente que ha trabaja ahí, nivel de satisfacción etc..

### ¿ A quién beneficia?

 El sistema beneficiaría a:

 1. Solicitantes de empleo, que podrán obtener una ofertas afines a sus cualidad y por lo tanto aumentar sus posibilidades de encontrar trabajo.
 2. Plataformas de empleo. Cualquier plataforma de empleo que proporcione una API se verá beneficiada porque podrá aumentar su tráfico de usuarios a partir de este sistema.
 3. Empresas. Las empresas obtendrán candidatos más afines a sus requerimientos gracias al sistema, simplificando y abaratando las tareas de reclutamiento.

### Nombre del proyecto

El proyecto se llamará **WorkWith**

<a name="Additional"></a>
## Documentación Adicional

En esta sección se muestra documentación adicional al proyecto que ha sido relevante para el desarrollo del mismo. Se explicará lo siguiente:

1. [Configuración de git](/DOC/GitConfiguration.md)
2. [Licencia](/LICENSE)
