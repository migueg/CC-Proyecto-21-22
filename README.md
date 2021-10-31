# CC-Proyecto-21-22

Este repositorio contiene el proyecto realizado para las prácticas de la asignatura *Cloud Computing del Máster de Ingeniería Informática de la UGR* por @migueg.

>Versión 2.0.0

## Lógica de negocio

La lógica de negocio que va a comprender la solución propuesta puede consultarte en [Lógica de negocio](/DOC/Hitos/hito0.md).


## Hito 2

A continuación, se describe el proceso realizado para llevar a cabo el hito 2

### Gestor de tareas : NPM

Puesto que el lenguaje principal del sistema es typescript, y se necesita un framework de test, se debe usar como entorno de ejecución Node.js. Por lo tanto, se elige **NPM** como gestor de tareas. En realidad, npm es un sistema de gestión de paquetes para manejar las dependencias del sistema. Sin embargo, npm no es un sistema de gestión de paquetes común, ya que también se puede comportar, en determinados casos, como un gestor de tareas.  
En el package.json se le puede indicar una serie de scripts que se pueden ejecutar utilizando **npm**. En el caso de nuestro sistema, esta característica nos permitirá lanzar los test de nuestro sistema simplemente con el comando **npm test**, ya que el framework que se ha elegido para los test cuenta con un cliente que ejecuta los test indicados en un fichero de configuración sencillo. Por lo tanto, solo tendremo que indicar en el package.json que el script que se ejecutará para la tarea *test* es el cliente del framework de pruebas. Viendolo desde está perspectiva podemos utilizar npm como un gestor de tareas, sin la necesidad de aumentar las dependencias del sistema instalando software adicional para gestionar las tareas.

### Estilo elegido : TDD

Se elige TDD como estilo de desarrollo.  

El sistema tendrá que trabajar con un gran volumen de datos, por lo tanto será difícil validar el resultado del procesamiento de estos a partir de las salidas que produce la funcionalidad en el sistema sin una batería de test automáticos que realicen este trabajo. Debido a que no son procesamientos triviales, las salidas producidas de los métodos del sistema puede que no sean las esperadas, es por es que es necesario pensar antes de programar los métodos que salidas esperamos obtener.  
Para ello se elige un  estilo de desarrollo TDD, de manera que los test serán en el primer paso en el desarrollo de una funcionalidad en concreto.
Primero se diseñarán los test y a continuación, se proporcionará la funcionalidad necesaria para hacer que estos pasen. Esto permitirá aumentar la calidad del código, testear salidas de un tamaño considerable y reducir el número de bugs que puedan surgir en etapas posteriores del desarrollo.


### Elección del marco de trabajo para las pruebas

La elección del framework de test y la bibliteca de aserciones se juestificará en el siguiente [documento](DOC/TestFramework.md).
## Anteriores Hitos

La documentación relacionada con hitos anteriores se podrá consultar a través de los siguientes enlaces:

* [Hito 0](/DOC/Hitos/hito0.md)
* [Hito 1](/DOC/Hitos/hito1.md)
