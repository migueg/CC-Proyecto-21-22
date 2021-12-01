
# GitHub actions

Otra plataforma que se ha utilizado para la integración continua es Github mediante el uso de las **GitHub actions**. Para este hito se ha creado la siguiente action : [run-docker-test.yml](https://github.com/migueg/CC-Proyecto-21-22/blob/main/.github/workflows/run-docker-test.yml)

La característica interesante que ofrece las actions es que podemos controlar el proceso de ejecución de los workflows a nuestro gusto y así tener un control total del proceso de integración continua. Además, nos permite utilizar otras actions dentro de la nuestra. Sin embargo, las ejecuciones son mas lentas y se requiere de más pasos para configurar el workflow correctamente a diferencia de otras plataformas como *circle ci* que con tan solo dos o tres instrucciones teníamos toda la configuración necesaria.

Gracias a este control que nos ofrecen las Github actions puedo hacer que la action creada para la integración continua se ejecutará después  de la action que se encargaba de construir y subir la imagen docker a los distintos hitos, pero solo ocurrirá esto  si este proceso de construcción de la imagen tiene éxito. Eso se consigue con lo siguiente:

![action](/IMG/actiontestrun.png)

En la clave **workflow_run** se le indica en que workflows va a mirar este workflow va a ejecutarse. En este caso le indicamos el nombre del workflow que sube la imagen docker. En el caso que este workflow dependiera de más de una se podrían indicar el nombre de todos los que intervinieran. A continuación en la clave **branches** le indico que está action solo se va a ejecutar cuando se haya ejecutado el workflow del que depende en la rama *main*. Por último, en la clave **types** se le indica el valor *completed* para establecer que la action se inicie cuando los workflows que hay en la clave **workflows** hayan terminado.

A continuación, se crea un job que se ejecutará en *ubuntu-latest* solo si el workflow del que depende ha tenido éxito. Si ha tenido éxito, se ejecutarán dos steps, el primero que hace checkout del repo y el segundo que ejecuta la imagen docker con los tests.

![action](/IMG/jobstest.png)

Todo esto se ha realizado ya que no tiene sentido ejecutar la imagen docker si esta ha sido actualizada o si al construir la imagen ha habido algún error, por lo que es necesario esperar a que este proceso se haga adecuadamente para ejecutar una imagen del contenedor correcta y actualizada. El resultado de la ejecución de este workflow se puede consultar [aqui](https://github.com/migueg/CC-Proyecto-21-22/runs/4384921182?check_suite_focus=true)
