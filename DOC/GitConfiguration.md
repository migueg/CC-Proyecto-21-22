# Configuración de git

A continuación se explicarán los pasos realizados para la puesta apunto de git y la conexión con los servidores de GitHub.

## Configuración de correo y usuario

Teniendo instalado git en el sistema el primera paso que hay que realizar es asociar un correo y un usuario a git en nuestro sistema, que nos identificará cuando hagamos cambios sobre el repositorio. Para ello basta con ejecutar las siguientes órdenes:

```console
$ git config --global user.name "migueg"
$ git config --global user.email miguegarciatenorio@gmail.com 
```
Una vez realizado esto, podemos ver que nuestra configuración ha sido modificada ejecutando la siguiente orden por terminal:

```console
$ git config- --list
```
Esto arroja el siguiente resultado:

![Configuración git](/IMG/GitConfig.png)

## Configuración clave pública y privada

Lo siguiente será crear un par de claves público/privada para poder realizar una conexión con el repositorio ubicado en GitHub mediante ssh.   
Lo primero que hay que hacer es generar las claves, para ello ejecutaremos la siguiente orden en terminal:

```console
$ ssh-keygen -t ed25519 -C "miguegarciatenorio@gmail.com"
```

Esto nos generará el par de claves a partir del correo configurado y las almacenará en ficheros 

![Generación claves](/IMG/ssh.png)

A continuación será necesario añadir las claves al agente ssh. Para ello entraremos en modo superusuario con la orden:

```console
$ sudo -s -H 
```
Seguidamente, iniciaremos el agente ssh  en segundo plano ejecutando:

```console
eval "$(ssh-agent -s)"
```

Una vez iniciado, agregaremos la clave privada generada anteriormente (que se encuentra almacenada en un fichero de nuestro sistema) al agente ssh con la orden:

```console
$ ssh-add /home/migue/.ssh/id_ed25519
```
Finalmente, tendremos que añadir la clave pública a nuestra cuenta de GitHub para que se nos pueda autenticar como usuarios vía ssh. Para ello, en nuestro perfil de GitHub nos iremos al apartado de *Settings* y dentro de este al apartado *SSH and GPG keys*. Pulsaremos en el botón *New ssh key* y añadiremos la clave pública que en mi caso se encuentra en el fichero */home/migue/.ssh/id_ed25519.pub*

![clave pública](/IMG/publickey.png)

Una vez añadida nos aparecerá en nuestra cuenta de Github:

![ssh](/IMG/sshgithub.png)


Para comprobar que el proceso se ha hecho de manera adecuada, haremos una prueba de conexión mediante ssh, ejecutando la orden:

```console
$ ssh -T git@github.com
```

Ejecutada la orden nos pedirá la contraseña con la que firmamos las claves, ya que en el momento de generación de claves se requirió un contraseña. Si todo va bien, no dirá que hemos sido autenticados con éxito

![conexión](/IMG/conexion.png)

