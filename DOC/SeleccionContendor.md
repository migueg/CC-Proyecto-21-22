# Elección del contenedor base

Para elegir la imagen del contenedor que se utilizará en este hito, es necesario comparar entre la oficial para el lenguaje y una imagen de un sistema operativo.
De acuerdo con las decisiones tomadas en el [hito 2](/DOC/Hitos/hito2.md) sobre herramientas que se utilizarán, y así como la utilización de typescript como lenguaje se contemplará como imagen oficial para el lenguaje la imagen de **node**. En cuanto a la imagen del sistema operativo, se optará por una distribución de Linux, por lo que la imagen de **alpine** será la otra opción a comparar, debido a su popularidad y a su ligereza.

Por otro lado cabe destacar, que los criterios de selección se basarán en encontrar un equilibrio entre ligereza del contenedor y funcionalidad y características incluidas.Además, se utilizará un criterio de autoridad de manera que se buscarán imágenes que estén mantenidas por una comunidad de confianza y que se encuentre en constante evolución.

## Imagen de node

Es la imagen oficial de node. Contiene todas las dependencias de node y soporta un gran número de versiones. Está mantenida por un equipo docker de Node que cuenta con 84 contribuyentes, muchos de ellos con bastante reconocimiento en github (poseen bastantes seguidores y estrellas), lo cual aporta confianza al proyecto, ya que esta mantenido por personas con experiencia y reconocimiento. Por otro lado, el repositorio del docker cuenta con bastante actividad (commits, issues, pull request) lo cuál es otro aspecto positivo que aporta confianza ya que demuestra que está en constante evolución y mejora.

Por otro lado hay que tener en cuenta los siguientes aspectos técnicos:

- Las imagen de node suele ocupar entorno a 1 GB. Situándonos en el contexto del sistema que se está desarrollando en este repositorio, este tamaño es excesivo, ya que la imagen contendrá mucha funcionalidad que no será necesaria.

- Está imagen contendrá todas las dependencias de node, por lo que las dependencias de mi sistema será compatibles con la imagen.

- La imagen completa de node se cesta creada a partir de Debian y agrega bastantes herramientas adicionales como git, make, gcc, g++ y otras bibliotecas de terceros. A priori, la única herramienta interesante para mí seria git, por lo que posee muchas herramientas adicionales que no se usarán.

- La imagen de node cuenta con su propia versión para alpine, mucha mas ligera que las otras versiones, proporcionando su entorno de ejecución y las herramientas que proporciona alpine, ya que se basa en el proyecto oficial de Alpine.

- La versión de alpine para node cuenta con usuario sin privilegios de *root* para ejecutar lo que tengamos que ejecutar a nivel de usuario, por lo que si uso está imagen no voy a tener que crear un usuario para no ejecutar con permisos de super usuario, cosa que aportará mayor seguridad a mi imagen.

## Imagen alpine

Es una imagen de la distribución alpine de Linux. Cuenta con millones de descargas, aunque el proyecto tiene menos soporte y menos contribuyentes, en este caso cuenta con tres, y su repositorio tiene menos actividad que el de la imagen de node.


En cuanto a los aspectos técnicos se tiene lo siguiente:

- Es muy ligera, aproximadamente 5MB, aunque pueden se le puede agregar herramientas y este espacio crecerá, pero no llegará a ocupar tanto como la imagen de oficial de node. Si agregamos en esta imagen los requisitos de tiempo de ejecución de node, e ocupará al rededor de 50 MB en el espacio. Esta característica de ser ligera me indica que voy a tener lo que necesite sin necesidad de instalar una imagen pesada con cosas que no voy a necesitar

- Esta imagen viene con lo mínimo por lo que todo lo que necesite adicional necesitaré incluirlo. Esto es un inconveniente porque tengo que preocuparme de todas las dependencias de mi sistema, cosa que con la imagen de node no ya que vienen incluidas en la propia imagen, pero por otro lado es una ventaja puesto que voy a tener un control directo sobre lo que tengo en mi imagen y no voy a tener cosas que no necesito.

- En cuanto las herramientas que ofrece, alpine usa *libc** en lugar de *glibc* por lo que  podria encontrarme en alguna ocasión con problemas con las dependencias de mi sistema, ya que pudieran ser que no se encuentren disponibles en *libc*, por lo que esto es un punto a tener en cuenta a la hora de elegir, no obstante es una buena opción para sistemas pequeños ya que es rato que se use una dependencia compleja que no se encuentre en *libc* en estos sistemas.

## Comparación

Para ser mas exhaustivos con la elección, se procede a comparar las distintas imágenes utilizando la herramienta **container-diff**.

1. Se compara la imagen de node por defecto con la imagen oficial de Alpine. Concretamente se comparará el tamaño y la funcionalidad de node que contiene.  

![node vs alpine](/IMG/nodevsalpine.png)  

Se puede observar que la imagen de node ocupa mucho más, pero contiene npm y el core de node, cosa que será necesaria para nuestro sistema.Sin embargo alpine no contiene funcionalidad de node, por lo que habría que instalarla en la imagen.

2. Se compara la imagen de node:alpine  con la imagen oficial de Alpine. Concretamente Se comparará el tamaño y la funcionalidad de node que contiene.


![node:alpine vs alpine](/IMG/nodealpinevsalpine.png)  

La imagen de node:alpine es más ligera, pero sigue conteniendo la funcionalidad de node que yo necesito. Es más ligera porque no vienen con herramientas como **apt**, la cual si esta contenida en la imagen de node normal. A priori, no necesito esta herramienta, ya que mis dependencias son de node, aunque si me hiciera falta la instalaría en mi imagen.

## Conclusión

Elijo la versión de node para alpine, ya que es una imagen ligera, desarrollada y mantenida por una comunidad de confianza, que cuenta con soporte, mantenimiento y evolución y que además contiene tanto npm y el corepack de node los cuales necesitaré. Esta imagen contiene todo lo que necesito para poder instalar las dependencias de mi sistema sin necesidad de agregar herramientas innecesarias que me produzcan una imagen más pesada. Además, cuenta con usuarios con privilegios y otros sin privilegios proporcionados para el tiempo de ejecución.
