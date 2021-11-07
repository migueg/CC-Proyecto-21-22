# Test Hito 2

En el hito 2 se han realizado los tests necesarios para testear la funcionalidad relacionada con la conversión de un PDF a formato JSON. En concreto, se han realzado los tests para la funcionalidad que soluciona el issue #53, y que esta relacionado con la [HU1](https://github.com/migueg/CC-Proyecto-21-22/issues/37).

En concreto se han escrito 9 tests, y posteriormente la funcionalidad para superarlos. El resultado de la ejecución de los tests con la funcionalidad mínima para pasarlos es el siguiente:

![test](/IMG/testHito2.png)

Como se puede observar los tests se dividen en un bloque principal, que este a su vez se divide en otros dos sub-bloques. El primero testeara si el sistema es capaz de detectar y validar el formato de los ficheros que el usuario subirá a la plataforma, y el segundo si se convierte un correctamente un pdf al formato json con la estructura y esquema deseada en el sistema.  
También se puede observar que prácticamente los tests cubren la totalidad del conjunto de funcionalidad que se estaba testeando. Dicha funcionalidad se encuentra en el fichero [converterToJson.ts](/src/converterToJSON.ts)
