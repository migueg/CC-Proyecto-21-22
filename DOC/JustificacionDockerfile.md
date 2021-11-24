# Dockerfile

En esta sección se hablará sobre las buenas prácticas y el proceso de optimización de la imágen Docker mediante la realización de un Dockerfile adecuado.

## Buenas prácticas

Para lograr un correcto Dockerfile, así como optimizar la imagen resultante me he basado en gran parte en la guía de buenas prácticas en el Dockerfile oficial de **Docker**, la cual puede consultarse en el siguiente enlace, [Mejores Prácticas Docker](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/). Por otro lado, ya que se utiliza una imagen base de node y se requieren modulos de node para diversas tareas como ejecutar los tests en mi sistema, además se han seguido buenas prácticas para contenedores node expuestas en foros de desarrolladores de aplicaciones node como [Docker best practice with node](https://dev.to/nodepractices/docker-best-practices-with-node-js-4ln4) repositorios como [docker-node](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#environment-variables).

Las buenas prácticas que he seguido son las siguientes:

1. Se actualiza el contenedor y se borra el direcotrio node_modules del directorio raíz para ahorrar espacio, ya que posteriormente se instalarán los node_modules en otra ubicación menos privilegiada que el directorio raíz.

```
RUN  apk update && apk upgrade  && rm -rf node_modules \
```


2. Se ha creado un usuario sin privilegios root y se le han otorgado permisos de lectura y escritura sobre el directorio /app para que posteriormente pueda instalar las dependencias y realizar operaciones sobre ese repositorio sin compremeter la seguridad del contendor:

```
&& adduser -S migue  \
&& mkdir /app  \
&& chown -R migue /app
```

3.Las dependencias instaladas por npm han sido instaladas en un directorio non-root. Concretamente han sido instaladas en el directorio /app

```
ENV PATH="/app/node_modules/.bin:${PATH}"
```

4. Se utiliza npm ci en lugar de npm install ya que este comando está pensado para este tipo de entornos, aumentando la velocidad de instalación. Además, no modifica el package.json y borrara el directorio nod

5. Se borra la caché del contenedor contenedor ya que no habrá una futura instalación en la imagen porque esta es inmutable una vez creada, por lo que no tiene sentido cachear las dependencias. Esta acción logrará ahorrar bastante espacio pudiendo alcanzar hasta el 50% de ahorro en el tamaño de la imagen.

```
&& npm cache clean --force
```

6. Se han juntado sentenecias RUN en una sola

7. Se ha echo una de un .dockeringnore para excluir que la imagen contenga determinadas cosas como los secretos, aunque actualmente no cuento con archivos sensibles esto ha sido pensado para hitos futuros.

8. Las instrucciones run se han juntado en una sola para que no se generen demasiadas capas en el contenedor.

9. La instrucción CMD se usa de la forma CMD["executable", "param1". "param2", "..."]

```
CMD ["npm","test"]
```
