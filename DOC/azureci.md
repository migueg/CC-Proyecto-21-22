# Azure Devops

Microsoft ofrece un sistema bastante sofisticado para todo lo relacionado con la computación en la nube, incluyendo por supuesto la integración continua.  Microsoft cuenta con la plataforma Azure para todo lo referente a la nube, en la que nos ofrece multitud de características como máquinas virtuales, bases de datos, contenedores, kubernetes y muchas más. Para la integración continua, Azure cuenta con el sistema **Azure Devops**, el cual permite crear **Pipelines** que funcionan como triggers que ejecutan lo que le indiquemos como lo que podría ser un contenedor o en este caso los tests de una aplicación. Desgraciadamente, pese a la infinitud de características tanto de velocidad, como de seguirdad que ofrece esta plataforma son de pago, pero para la versión *student* existen un subconjunto de ellas que han sido interesantes para usar esta plataforma como sistema de integración continua.

Tras el uso de este sistema de integración continua puedo destacar las siguientes características:

1. No solo sirve para testear sino que sirve para desplegar cualquier tipo de aplicación
2. Admite contenedores y multitud de lenguajes
3. Gestiona la seguirdad y la autentificación mejor que los otros sistemas de integración continua utilizados. Por ejemplo, se pueden crear tokens de acceso personal con los permisos que nosotros queramos, aunque esta es una característica con la que también cuenta GitHub
4. Permite separar la ejecución de nuestras **Pipelines** por *pools* y agentes. La pool es el lugar donde se va a ejecutar la pipeline y esta pool puede estar compuesta por agentes. Un agente, es una máquina que ejecutará un *job*. Esta carecterística nos permite elegir el sitio exacto donde ejecutar nuestra pipeline, pudiéndole indicar un agente que se encuentre en un servidor dedicado, por lo que de esta manera evitaríamos los costes de ejecutar la pipeline en una máquina de Microsoft.
5. Es posible elegir como se ejecutarán las actions, si através de una action o por el contrario automáticamente cuando se haga push sin la intervención de una action como en el caso de *travis* o *circle ci*
6. La configuración del .yml de la pipeline es sencilla.

## Ejecución de la Pipeline

A continuación, voy a proceder a la explicación de como lograr el proceso de integración en Azure Devops

1. Crear un proyecto en azure Devops
2. Crear una Pipeline: Una vez creado un proyecto, hay que crear una Pipeline:
- Primero conectamos con el repositorio de Git hub

![conf](/IMG/azureconf01.png)

![conf](/IMG/azureconf02.png)

  - Seleccionamos el tipo de configuración, en este caso será nodejs

![conf](/IMG/azureconf03.png)

3. Escribimos el .yml que configurará la pipeline

![conf](/IMG/azureconf04.png)

  - Primero observamos que el trigger está en la rama main, esto significa que se lanzará a partir de una acción en la rama main del repositorio de GitHub.
  - A continuación, encontramos la clave **pool**. Aqui selecciono el pool donde se ejcutará y con la clave **demands** especifico el agente que se encargará de la ejecución de la Pipeline
  - Depués encontramos dos *steps*, el primero indica que se va usar node y a continuación, se instalan dependencias y se hace uso del gestor de tareas para ejecutar los tests

Los resultados de las distintas ejecuciones se pueden consultar [aqui](https://dev.azure.com/emiguetenorio/cc-proyecto-21-22/_build?view=runs)

4. Escribir una GitHub action que ejecute la pipeline, la cual se puede consultar [aquí](https://github.com/migueg/CC-Proyecto-21-22/blob/main/.github/workflows/main.yml).
Para ello se ha hecho uso de la acción *Azure/pipelines* que se encarga de lanzar una pipeline a partir de la url del proyecto donde se encuentra, el nombre de la pipeline y el token de acceso personal de Azure para la autentificación.
![azureaction](/IMG/azureaction.png)

## Self-Hosted agente

Como se ha observado anteriormente se está utilizando un agente para ejecutar la pipeline. En este caso, la pipeline no se está ejecutando en los servidores de Microsoft, si no que se está ejecutando en mi propio ordenador, ya que en Azure se puede delegar la ejecución de la pipeline a un servidor dedicado mediante el uso de los agentes. Para configurar un self-hosted agent hay que realizar lo siguiente:

1. Ir a Proyect Setting -> Agent pools. Aquí podemos crear un pool nuevo o añadir el agente en una existente. En mi caso lo voy a añadir en la pool *Default*.

2. Clickamos en new agent y aparecerá lo siguiente:

![agent](/IMG/newagent.png)

simplemente seguimos las instrucciones. Es necesario crear un token de acceso personal para poder tener los permisos para usar el agente. Las instrucciones para crearlo se pueden encontrar [aquí](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page)

4. Una vez instalado, nos aparecerá el agente en la pool

![agent](/IMG/agent.png)

5. Hay que lanzar el agente en la terminal de mi máquina para que comience a ejecutar los pipelines con el siguiente comando:

```
$ ./run.sh
```
