# Configuraciones

A continuación, se detallarán las configuraciones necesarias tanto para el funcionamiento del gestor de tareas como el de los tests.

## Gestor de tareas

Para este hito se necesitarán dos tareas fundamentales:
1. Compilar el proyecto
2. Lanzar los test

Estas dos tareas serán indicadas en el fichero package.json :

![scripts](IMG/scripts.png)

Se puede observar, que hay una tarea prestar que ejecutará primero los tests y si estos pasan el proyecto se compilará.

### Compilar el Proyecto

Para compilar el proyecto, se crea una tarea compile que se le pasa el comando **tsc**. Este compando es el cliente de typescript que compilará el proyecto de acuerdo a lo configurado en el fichero de configuración [tsconfig.json](tsconfig.json).
En este fichero le indicaremos entre otros:
1. En que directorio volcará el resultado de la compilación, que en este caso será ene l directorio **build**
2. Que directorios o ficheros compilara (clave include). Le indicaremos que compile solo los archivos que está contenidos en el directorio *src*.
3. Que directorios o ficheros excluirá (clave exclude).

### Lanzar los test

En el caso de los test indicaremos a npm que ejecute el cliente de test, es decir el cliente jest. Este cliente ejecutará los test de acuerdo a lo indicado en otro fichero de configuración [jest.config.ts](jest.config.ts).  
En este fichero se indicarán donde se encuentran los test para ejecutarlos entre otras cosas.
