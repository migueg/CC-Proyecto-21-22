# Tests

Los tests de la API pueden consultarse [aquí](/test/api.test.ts).  

Una de las características interesantes que proporciona Nestjs es un componente que te permite testear la API sin la necesidad de levantar el servidor.

![testComponent.png](/IMG/testComponent.png)

Este modulo de test nos permite crear un modulo de testing con aquellos controladores y servicios que queramos testear, así como mockear la configuración que tengamos en el sistema. Una vez creado este modulo de test la manera de testear la APi se realiza con una simple llamada al método del controlador, pero para eso es necesario mockear la petición HTTP cosa que también nos proporciona Nestjs. Un ejemplo de un test de un endpoint de la API sería:

![ejemploTest.png](/IMG/ejemploTest.png)

Se puede observar que se llama directamente al controlador, el cual previamente ha sido obtenido por medio modulo de test creado:

![testcontroller.png](/IMG/testcontroller.png)


Gracias a estas características que ofrece Nestjs se han podido testear todos los endpoints de la API satisfactoriamente, tal y como se muestra en la siguiente imagen:

![testResultApi.png](/IMG/testResultApi.png)
