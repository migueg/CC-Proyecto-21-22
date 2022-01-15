# Diseño de la API

Como ya se ha mencionado [aquí](/DOC/serviceFramework.md) Nestjs ofrece tres componentes principales para diseñar un microservicio. Por lo tanto, en el diseño del microservicio y la API nos encontraremos:

* Un módulo principal que representa la API del microservicio
* Varios controladores
* Varios servicios

## Módulo principal

El código del módulo principal se encuentra [aquí](/src/app.module.ts).

![appmodule](/IMG/appModule.png)

Como se puede obeservar es un código sencillo. Nos encontramos:

* **Imports**, son aquellos componentes de Nestjs que vamos a necesitar en la API.
* **Controllers**: Son los controladores, que va a cargar el modulo
* **Providers**: Son los servicios que va a cargar el modulo

Por lo tanto, de esta manera tan sencilla se esta estructurando el microservicio.
Además, va a permitir modificar el microservicio a nuestro antojo pudiendo añadir más controladores o más servicios o eliminarlos de una manera muy sencilla, por lo que podemos decir que el microservicio es escalable.

## Controladores

Se van a utilizar dos controladores: [cvController](/src/controllers/cvController.ts) que contendrá los endpoints para el recurso del currículum y [offerController](/src/controllers/offer.controller.ts) que contendrá los endpoints para el recurso de ofertas.


### Currículum

En el controlador del curricullum se han diseñado los endpoints que van a satisfacer a la [HU1](https://github.com/migueg/CC-Proyecto-21-22/issues/37). En concreto este controlador va a implementar dos endpoints

* */curriculum/upload* : De tipo POST, se encarga de recibir las peticiones para subir un currículum y llanmar al método del servicio

* */curriculum*: De tipo GET. Recibe por parámetro el nombre del usuario. Se encarga de manejar la petición para obtener el curriculum convertido a formato JSON.


### Ofertas

En el controlador de las ofertas se han diseñado los endpoints que van a satisfacer a la [HU2](https://github.com/migueg/CC-Proyecto-21-22/issues/38), [HU3](https://github.com/migueg/CC-Proyecto-21-22/issues/39) y [HU4](https://github.com/migueg/CC-Proyecto-21-22/issues/40). En concreto este controlador va a implementar los siguientes endpoints:

* */offers*: De tipo GET. Recibe por parámetro el id de las ofertas encontradas para un usuario. Se encarga manejar la petición para obtener las ofertas afines para un usuario.

* */offers/find*: De tipo POST. Se encarga manejar la petición para encontrar ofertas afines a un usuario

* */offers/afinity*: De tipo GET. Recibe por parámetro el id de las ofertas encontradas para un usuario. Se encarga manejar la petición para obtener la afinidad que ha habido en las ofertas.


* */offers/apply*: De tipo PUT. Se encarga manejar la petición para solicitar una oferta.


## Servicios

Todas las peticiones manejadas por los controladores, que al fin y al cabo representa una capa de la aplicación, se dirigen al servicio que le corresponda, que se correspondería con otra capa de la aplicación. Esto se consigue gracias a la inyección de dependencias en los controladores del servicio que necesiten que es proporcionada por el módulo principal de la aplicación. Esta inyección se realiza en el constructor del controlador y es responsabilidad del módulo de la aplicación. Aquí se puede ver un ejemplo de la inyección que se hace en el controlador del currículum del servicio para el currículum:

![inyeccion.png](/IMG/inyeccion.png)


Los servicios se van a encargar de comprobar si la petición es correcta y de llamar a las funciones que implementan la lógica de negocio correspondiente, son un puente entre la capa del controlador y la capa con la lógica de negocio. Los servicios que se han implementado son el [curriculumService](/src/services/curriculums.service.ts) y el [offerService](/src/services/offer.service.ts)


## Microservicio

Con todos estos elementos ya es posible levantar el microservicio. Esto se realiza en el fichero [main.ts](/src/main.ts) donde indicaremos cual va a ser el modulo que utilizaremos en el microservicio y cual va a ser el inicio de nuestras URIS.

![microservicion.png](/IMG/microservicion.png)

Todas las URIS de nuestra API serán de la forma : lo que se indique en global prefix / las rutas que se establezcan en el controlador, por lo que un ejemplo podría ser:

> */workwith-api/v1/offers*
