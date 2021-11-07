# Elección del marco de trabajo para las pruebas
## Framework de test : Jest

El framework de pruebas elegido es Jest. Esta elección se ha hecho en base a una comparación entre dos frameworks ampliamente utilizados en el ecosistema JavaScript **Jest** y **Mocha**. Mi criterio de elección ha consistido en buscar el mejor equilibrio entre sencillez, funcionalidad y rendimiento del framework de test. Pero antes de justificar la elección de **Jest** es necesario especificar las diferencias entre ambos.

|**Jest** | **Mocha**|
|---|---|
| Framework  | Test runner   |   
| No requiere de librerías externas | Requiere de librerías externas|
| Es mas flexible | Se basa en la simplicidad |
| Ejecuciones rápidas | No siempre ejecuciones rápidas |
| Sintaxis sencillas | Introduce sintaxis más compleja |

La elección de **Jest** se basa principalmente en que con este framework contaremos con todas las librerías necesarias (aserciones, mocks, etc..) integradas en el propio framework sin necesidad de agregar dependencias externas al proyecto ofreciendo una respuesta totalmente valida para el sistema.Además, **Jest** cuenta con una sintaxis que se asemeja al lenguaje natural facilitándonos seguir un enfoque TDD pudiendo escribir test de manera sencilla.  
Si utilizamos **Mocha** será necesario instalar cada una de los librerías necesarias para los test, como podría ser una librería de aserciones, una de mocks, etc... , implicando un conocimiento añadido en esas librerías.
Por otro lado **Jest** ofrece un cliente para ejecutar los tests de una manera sencilla desde la línea de comandos. Este cliente puede ser pasado como script a  *npm* de manera que se ejecutarán los test utilizando una sola orden, cosa que se adapta bastante a mi sistema si utilizo *npm* como gestor de tareas.
**Jest** también tiene la ventaja de que nos indica la cobertura que han tenido los test es nuestro proyecto, aportando un gran valor añadido. Además, se puede configurar con muchos parámetros distintos para que se comporte de una manera de terminada desde un fichero de configuración. En particular en mi sistema, podré configurar el framework de test para que testee código typescript y que a su vez acepte código Javascript que no este tipado, en el caso de que utilicemos bibliotecas externas.  


En definitiva, se ha elegido **Jest** como framework de test debido a la sencillez y funcionalidad que ofrece este framework sin necesidad de instalar dependencias adicionales, facilitándonos así seguir un enfoque TDD, pudiendo escribir los test de manera ágil y sin complicaciones sintácticas ni funcionales

## Biblioteca de aserciones

La biblioteca de aserciones utilizada será la incluida en el framework de pruebas **Jest**. Este framework utiliza el objeto **expect**, para realizar las aserciones y cuenta con bastantes métodos que nos permiten comprobar que los valores cumplen ciertas condiciones.  
 Esta biblioteca de aserciones encaja a la perfección con el estilo de desarrollo **TDD** ya que podemos plasmar lo que queremos que realice la funcionalidad que se va a testear utilizando unas expresiones que se asemejan al lenguaje natural. La manera de utilizar estas aserciones seguiría este patrón:  
>"Quiero que un método haga una cosa y por lo tanto, espero que, devuelva, o haga sea esa cosa de manera correcta"

Por lo tanto, los test podrán ser escritos de manera rápida y sencilla, gracias a la sencillez de la librería de aserciones, para posteriormente, escribir la funcionalidad para que el test sea superado.
