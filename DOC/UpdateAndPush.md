# Actualización y Subida de la Imagen

Tanto la actualización automática de la imagen como la publicación de esta en **Docker Hub** y **Github Container Registry** se ha realizado mediante el uso de una github action cuyo contenido puede consultarse [aquí](https://github.com/migueg/CC-Proyecto-21-22/blob/main/.github/workflows/push-docker-image.yml).

Se puede consultar un ejemplo de ejecución de la action en cuestión [aquí](https://github.com/migueg/CC-Proyecto-21-22/runs/4315764693?check_suite_focus=true).
## justificación

La action se ejecutará cada vez que se realice push sobre la rama main, esto se indica en las siguientes líneas

```
on:
  push:
    branches: [ main ]
```

A continuación, se define un único job que se ejecutará sobre la máquina de ubuntu-latest y que realizará los siguientes pasos:

1. Nos situamos sobre mi repositorio
2. Nos logueamos en Docker Hub
3. Nos logueamos en Git Hub Container Registry
4. Se extraen los metadatos de la imagen que se va a publicar
5. Se construye la imagen y se publica en las dos plataformas
6. Se comprueba si hay cambios en el código de mi aplicación
7. Se corren los tests si los hubiera

## Log in en las plataformas

Para ambas el login en ambas plataformas se ha usado la action **docker/login-action** que sirve para autenticarse en un registro de contenedores.

### Docker Hub

Se inicia sesión en este registro de la siguiente manera:

```
- name: Log into Docker Hub
     uses: docker/login-action@v1
     with:
       username: ${{ secrets.DOCKER_USERNAME }}
       password: ${{ secrets.DOCKER_PASSWORD }}
```

Se puede observar que para no introducir el valor de las credenciales en la github action se han utilizado los secrets de Github para no revelar datos secretos. Además, se observa también que no se indica por ningún lado que el registro al que se envía es Docker hub ya quela acción que se usa si no se le indica nada intenta iniciar sesión en este registro de contenedores.

### GitHub Container Registry

Se inicia sesión en este registro de la siguiente manera:

```
- name: Log in to the Container registry
   uses: docker/login-action@v1
   with:
     registry: ghcr.io
     username: ${{ github.actor }}
     password: ${{ secrets.TOKEN_CONTAINER_REGISTRY }}
```

En este caso si se indica el registro en cuestión (clave registry). El usuario utilizado es mi usuario de github, que se obtiene del valor de la variable *github.actor* y para la contraseña se ha creado un token de acceso personal (PAT) requerido para identificarse en el registro de contenedores de GitHub, el cual se ha almacenado en un secreto. Para la creación de este token se han seguido los pasos de este [manual](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## Extraer los metadatos  

Se utiliza el action **docker/metada-action** en donde se extraen los metadatos de las imágenes que se van a construir para pasárselos posteriormente a la acción que construye y publica las imágenes.

```
- name: Extract metadata (tags, labels) for Docker
       id: meta
       uses: docker/metadata-action@v3
       with:
         images: |
           migueg/cc-proyecto-21-22
           ghcr.io/${{ github.repository }}
         tags: |
           workwith-test
```

## Construir y publicar la Imagen

Se utiliza la acción  **docker/build-push-action** que va construir la imagen  partir del Dockerfile de mi repositorio.  
Para ello utiliza el valor de la clave **context** que es un **'.'**. Esto significa que se va a buscar el Dockerfile y todo lo necesario para la construcción de la imagen en el directorio actual que en este caso es el directorio raíz de mi repositorio ya que en un paso anterior mediante la acción *checkout* nos situamos en él.
Posteriormente publicará la imagen en los dos registros utilizando metadatos extraídos por la acción anterior que extraía los metadatos. Además la clave **push** tiene el valor **true** lo que le indica que después de construir las imágenes tiene que publicarlas en los registros.

## Lanzamiento de los tests

Aunque esto paso se encuentra fuera de este hito, se ha incluido el lanzamiento del contenedor que ejecuta los tests de manera automática después de construir la imagen y publicarla, siempre y cuando haya habido cambios en el código de la aplicación.

Para comprobar si ha habido cambios en el código se utiliza la acción **dorny/paths-filter** que comprueba si ha habido cambios de un push a otro en el directorio donde se encuentra el código

```
- name: Check if exists chang in code
       uses: dorny/paths-filter@v2
       id: changes
       with:
         filters: |
           src:
             - 'src/**'
```

Posteriormente se compruba la salida en otro paso para ver si está tiene el valor *true*, el cual indica que ha habido cambios en el directorio src. Si ha cambios, hay que ejecutar los tests, para ver si los cambios siguen pasando todos los tests. Por lo tanto, se ejecuta la imagen docker que previamente ha sido construida y publicada

```
- name: Run tests
     if: steps.changes.outputs.src == 'true'
     run: docker run -t -v `pwd`:/app/test migueg/cc-proyecto-21-22:workwith-test

```
