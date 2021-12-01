# Circle Ci

Al igual que Travis permite ejecutar nodejs, contenedores y mucho más. No solo sirve para testear código sino que permite hacer despliegues y cualquier tipo de trabajo en la nube. Esta plataforma ofrece una característica muy interesante que la diferencia del resto, los *orbs*. os orbes son fragmentos de código reutilizables que permiten acelerar el proceso de configuración y ejecución de nuestros test. Además Circle Ci ofrece una respuesta rápida utilizando un plan totalmente gratuito.

Para poder comenzar el proceso de integración continua en esta plataforma, solo basta con conectar el repositorio  Github con la plataforma y crear un fichero de configuración **.config.yml** en nuestro repositorio de Github ([fichero de configuración](/.circleci/config.yml)).

![config](/IMG/circleconfig.png)

La imagen anterior se corresponde con el fichero de configuración de circle ci. En este workflow se esta haciendo uso de un otb, concretamente un desarrollado por circle ci para node. Al usar este orb, no es necesario escribir un fichero de configuración extenso donde se realicen todas las configuraciones oportunas. Solo basta con indicar unos steps que  en este caso me instalarán todas las dependencias y ejecutarán los tests cuando se haga push a la rama main de mi repositorio. Tras hacer push se obtendrá el siguiente resultado:

![result](/IMG/circleciresult.png)
![result](/IMG/circletest.png)

Se puede observar que se ha tardado 18 segundos en total, un tiempo bastante aceptable, de hecho en mi máquina todo este proceso conlleva más tiempo.
