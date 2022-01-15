# Elección del framework para el microservicio

Para la elección del framework que se utilizará para crear el microservicio se han valorado distintas opciones entre las más populares para nodejs. El criterio de búsqueda ha sido principalmente encontrar un framework que permita desacoplar la API del código de la aplicación, de tal forma que podamos modularizar el sistema a nuestro antojo. Además se ha buscado un framework que ofrezca más características que faciliten el desarrollo como un cliente para tests , un servicio para la configuración o una fácil integración con el lenguaje typescript.

Entre las principales opciones que se han barajado se encuentran las dos más populares en el ecosistema nodejs/javascript/typescript, *Nestjs* y *Expressjs*.  

Tras un proceso de análisis técnico **se ha decido usar como framework para la creación del microservicio Nestjs**


## Justificación de la Elección

Nestjs es un framework parara construir aplicaciones en el lado del servidor. Este framework nos permite crear microservicios y estructurar nuestra aplicación de una manera modular, eficiente y escalable.  
Este framework es mantenido por una amplia comunidad,cuanta con gran popularidad entre los desarrolladores (44 estrellas en Github) y está en constante evolución, lo que desde una primera toma de contacto atrae bastante, pero lo cual no justifica su elección ya que es importante conocer sus aspectos técnicos. Así mismo Expessjs es un framework altamente popular entre los desarrolladores que es mantenido y evolucionado por un gran comunidad.  

### Uso de typescript

Uno de los aspectos a tratar para la elección del framework es que sea compatible con typescript, ya que es el lenguaje utilizado en el proyecto. Sin embargo, no solo se busca que sea compatible, ya que frameworks para Nodejs o Javascript pueden ser compatibles con typescript. Por lo tanto no solo se busca la compatibilidad, si no que sean frameworks que soporten completamente typescript, ya que nos dará garantía de que no haya problemas de compatibilidad ni se deban realizar configuraciones extra que enreden el código de nuestra aplicación.  

Atendiendo a este criterio, nos encontramos que Expressjs está pensado para aplicaciones Nodejs. Como tal no es un framework pensado para typescript, pero es compatible con este lenguaje, por lo que configuraciones extra son requeridas, como la instalación de los tipos para Expressjs.  
Por el contrario, Nestjs está construido en typescript y ofrece soporte completo para typescript permitiendos trabajar con un paradigma orientado a objetos, por lo que es el primer punto a favor que nos encontramos en la elección de este framework.

### Arquitectura

Ya que se busca un diseño, claro, sencillo y modular de la aplicación el framework nos debe proporcionar herramientas para ello. En este sentido nos encontramos grandes diferencias entre Expressjs y Nestjs.

**Expressjs** permite la libertad a la hora de diseñar la aplicación, es decir, permite elegir tomar a los desarroladores tomar sus propias decisiones a la hora de elegir las tecnologías o el middleware que desea utilizar, eliminando una estrutuctura definida por el marco. Esto puede ser una ventaja pero a la vez un problema, ya que el diseño modular puede ser afectado para grandes aplicaciones en las que el código puede verse enredado y la separación en microservicios puede ser más costasa. Por lo tanto, el framework por sí solo no nos asegura un estructura definida.  

En la otra cara de la moneda, tenemos a **Nestjs**, esta basado en una arquitectura clara y bien definida con unos pocos componentes que nos permite dividir fácilmente la aplicación en microservicios. Nestjs nos proporciona tres componentes principales:

* Modules: permiten organizar el código y dividirlo por recursos o características que después se puedan reutilizar.

* Controllers: Se encargan de manejar las peticiones que llegan al servidor

* Services: Son una abstracción de la lógica y pueden ser inyectados en controladores. Es decir, los servicios son la capa que hay por debajo de los controladores que pueden contener lógica de negocio o actuar de capa intermedia entre controladores y la capa que contiene la lógica de negocio.

Con el uso de estos componentes podemos desacoplar la API de la lógica de negocio. Por lo tanto, en este aspecto, considero que **Nestjs** es mucho más adecuado para construir los microservicios de la aplicación y es uno de los principales motivos por lo que se ha elegido este framework.

### Otras características interesantes

Aparte de la arquitectura bien definida y la facilidad para dividir la aplicación en microservicios, Nestsjs ofrece otras características interesantes:

* Ofrece un componente para testear la API sin la necesidad de levantar el servidor. Esto es importante ya que podremos testear el código de la APi en los diferentes entornos de integración continua sin consumir los recursos que necesita tener levantado un servidor.

* Ofrece un componente para configurar los microservicios de una manera sencilla.

* Ofrece un cliente que se encarga de realizar la compilación y la instalación de los microservicios, así como levantar el servidor mediante el uso de un comando, reduciendo así todas las tareas necesarias en este proceso.

* Incorpora carácteristicas  y componentes de Expressjs para poder trabajar de una manera similar a la hora de contruir la API en este framework.
