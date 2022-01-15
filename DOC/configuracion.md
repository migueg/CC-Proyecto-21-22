# Configuración

Una de las características interesantes que tiene Nestjs es que ofrece un módulo para realizar la configuración del microservicio. Podemos indicarle al módulo de nuestra aplicación de donde se va a coger la configuración que podrá ser utilizada tanto por los controladores como por los servicios.

![configModule](/IMG/configModule.png)

Utilizando el objeto configModule estamos indicándole al módulo de la aplicación que la configuración que se utilice se va a cargar del componente *Config*, ese componete es una función que se encuentra en el fichero [Config.ts](/src/Config.ts) :

 ![configComponent.png](/IMG/configComponent.png)

 Notese que se esta haciendo uso de la configuración distribuida de **Etcd3**. Para ello, se ha creado una clase que será la responsable de configurar el sistema [Etcd3Config](/src/Etcd3Config.ts). Esta clase permitirá obtener las variables que se necesiten y añadir nuevas parejas clave valor al sistema.

 La función del componente *Config* se encarga de buscar variables de configuración , primero en el servidor de configuración distribuidas, si no hubiera nada, en los ficheros .env y en el caso de que no existiera le asigna por defecto un valor. Así nos aseguramos que la configuración siempre contenga valores. Estos valores representarán la configuración del microservicio y podrá ser accedido en aquellos lugares donde el modulo de la aplicación los haya cargado de una manera sencilla, tal y como se muestra en la siguiente imagen.

 ![getConfig.png](/IMG/getConfig.png)

 En este caso,esa sentencia nos devolvería el valor de la variable de entorno ROUTES_CV o 'routes'.  
