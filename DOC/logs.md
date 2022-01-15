# Logs

Para los logs de la aplicación se ha utilizado el framework [Wiston](https://github.com/winstonjs/winston). Este framework es para aplicaciones basadas en Nodejs y proporciona un logger, intuitivo y fácil de utilizar. Este framework nos permite además customizar al máximo nuestro log, puediendo definir varios niveles de log o incluso varios destinos de los mensajes de log. Para ello se ha creado la clase [logger](/src/logger/logger.ts).

En esta clase se crea el logger que se va utilizar en la aplicación. Este logger creado tendrá un formato definido en el cual selos mensajes de Logs:

![formatLog.png](/IMG/formatLog.png)

El formato será :

>[Fecha y hora]- nivel de log (error,info,etc..) : mensaje

A continuación, se definen los transportes. Los transportes serán los medios donde nuestro mensajes de log vayan dirigidos, es decir, si los mensajes de logs se mostrarán por consola, se guardarán en un fichero , etc.. Wiston nos perimite establecer tantos transportes como deseamos para un log y diferenciar en esos transportes el nivel de log que se va a tratar.

![transportes.png](/IMG/transportes.png)

En nuestro caso, se han definido tres transportes, los dos primeros enviarán el log a archivos. El primer transporte se encargará de enviar solo los mensajes de información a un fichero de log y el segundo solo escribirá en otro fichero los mensajes de error que se produzcan. Ambos transportes, escribirán un limite de 5MB por fichero y un máximo de 5 ficheros, cuando se exceden estas cantidades Wiston borra los logs y genera otros nuevos.

El tercer y último transporte se encargará de enviar los mensajes de error por consola.



La manera de utilizar los mensajes de log es muy sencilla, un ejemplo lo podemos ver en esta línea de código:

![logEjemplo.png](/IMG/logEjemplo.png)

Esta línea de código producirá el siguiente mensaje, que será escrito en el fichero de log y mostrado por consola:

![mensajeLog.png](/IMG/mensajeLog.png)
