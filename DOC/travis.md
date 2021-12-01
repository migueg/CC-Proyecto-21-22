# Travis

Travis ofrece la posibilidad de ejecutar un workflow en su plataforma después de realizar push en nuestro repositorio de GitHub de manera automática. Para ello solo basta con escribir un fichero **.travis.yml** en la raíz del repositorio y conectar la cuenta de Travis con el repositorio de GitHub.

Como característica interesante ofrece la posibilidad de poder testear varias versiones del lenguaje. En mi caso, esto es interesante para poder testear mi código con distintas versiones de nodejs y ver como se comporta.

Sin embargo,presenta la desventaja de que es su rendimiento no es muy alto, los trabajos tardan más de lo habitual en ejecutarse y no es posible elegir los recursos a diferencia de otras plataformas de integración.

Para lograr la integración continua utilizando esta plataforma en primer lugar se ha definido el fichero **.travis.yml** , que puede consultarse [aquí](/.travis.yml)

![travisyml](/IMG/travisyml.png)

Otra de las características interesantes que se puede observar en la imagen anterior, es que me permite usar el servicio de docker dentro de la plataforma que me permitirá en mi caso ejecutar el contenedor que ejecuta las test.

También se puede observar que se esta haciendo uso del gestor de tareas, pesándola la tarea que tiene que ejecutar en la sección *script**. Esta instrucción provocará que se ejecute la imagen del contenedor. En este caso, solo he testeado dos versiones de node para ahorrar créditos.

Tras hacer push a mi repositorio de Github el resultado será el siguiente:

![result](/IMG/travisresulttest.png)


![result](/IMG/travistestresult.png)
