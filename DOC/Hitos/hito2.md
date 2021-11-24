# Hito 2

A continuación, se describe el proceso realizado para llevar a cabo el hito 2

## Gestor de tareas : NPM

Se elige **NPM** como gestor de tareas, frente a otras opciones populares entre desarrolladores como **Grunt** y **Gulp**. En realidad, npm es un sistema de gestión de paquetes para manejar las dependencias del sistema. Sin embargo, npm no es un sistema de gestión de paquetes común, ya que también se puede comportar, en determinados casos, como un gestor de tareas.   
Mi criterio de selección se ha basado en que como se trata de un provecto pequeño no se van a necesitar realizar tareas de mucha complejidad, por lo tanto creo que no es conveniente aumentar la complejidad mediante el uso de un gestor de tareas más complejo como **Gulp** o **Gunt** que cuentan con números plugins que no voy a necesitar, además que de que estos requieren un esfuerzo adicional para aprender a usarlos. Sin embargo, **npm** es sencillo e intuitivo y para lo que yo necesito que es ejecutar tareas, es totalmente válido, ya que nos permite indicar una serie de tarea a ejecutar.  

En el **package.json** se le puede indicar una serie de scripts que se pueden ejecutar utilizando **npm**. En el caso de nuestro sistema, esta característica nos permitirá ejecutar las tareas indicando cuales queremos ejecutar en la sección de **scripts**. Por ejemplo, para lanzar los test de nuestro sistema simplemente se ejecutará el comando **npm run test**, ya que el framework que se ha elegido para los test cuenta con un cliente que ejecuta los test indicados en un fichero de configuración sencillo. Por lo tanto, solo tendremos que indicar en el package.json que el script que se ejecutará para la tarea *test* es el cliente del framework de pruebas. Viéndolo desde está perspectiva podemos utilizar npm como un gestor de tareas, sin la necesidad de aumentar las dependencias del sistema instalando software adicional para gestionar las tareas.
Además **npm** me va a permitir agrupar las tareas en un solo comando.

## Estilo elegido : TDD

Se elige TDD como estilo de desarrollo.  

El sistema tendrá que trabajar con un gran volumen de datos, por lo tanto será difícil validar el resultado del procesamiento de estos a partir de las salidas que produce la funcionalidad en el sistema sin una batería de test automáticos que realicen este trabajo. Debido a que no son procesamientos triviales, las salidas producidas de los métodos del sistema puede que no sean las esperadas, es por es que es necesario pensar antes de programar los métodos que salidas esperamos obtener.  
Para ello se elige un  estilo de desarrollo TDD, de manera que los test serán en el primer paso en el desarrollo de una funcionalidad en concreto.
Primero se diseñarán los test y a continuación, se proporcionará la funcionalidad necesaria para hacer que estos pasen. Esto permitirá aumentar la calidad del código, testear salidas de un tamaño considerable y reducir el número de bugs que puedan surgir en etapas posteriores del desarrollo.


## Elección del marco de trabajo para las pruebas

La elección del framework de test y la bibliteca de aserciones se juestificará en el siguiente [documento](DOC/TestFramework.md).

## Configuración y test realizados

- La configuración realizadas tanto para los test como para el gestor de tareas se puede consultar aquí : [configuraciones](DOC/configuraciones.md).
- Los test realizados en este hito se pueden consultar aquí : [testsHito2](DOC/testHito2.md)  
