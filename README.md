# CC-Proyecto-21-22

Este repositorio contiene el proyecto realizado para las prácticas de la asignatura *Cloud Computing del Máster de Ingeniería Informática de la UGR* por @migueg.

>Versión 1.0.1

## Hito 1

Una vez conocido el proyecto a realizar (ver [[Hito 0](/DOC/Hitos/hito0.md)]), se procederá a definir lo siguiente:


* [Roles](#roles)
* [Escenarios](#escenarios)
* [Historias de usuario](#historias)
* [Milestones](#milestones)


<a name="roles"></a>
### Roles

A continuación, se definirán los distintos roles que existirán en el sistema:

* **Cliente**: El rol cliente se corresponde con los posibles clientes de los establecimientos hosteleros. Este tipo de usuarios podrán buscar establecimiento, realizar una reserva y comandas, así como modificar su información personal. Estos usuarios a nivel de sistema se distinguirán entre *clientes con reserva* y *clientes sin reserva*.

* **Empleado**: El rol de empleado se corresponde con los empleados de los establecimientos que usarán la aplicación para labores de gestión como gestionar las reservas.

* **Empresario**: El rol de empresario se corresponde o bien con los dueños de los establecimientos hosteleros o cualquier interesado en la información almacenada en el sistema. Un empresario puede ser a la vez dueño de un establecimiento y estar interesado en la aplicación.



<a name="escenarios"></a>
### Escenarios

A continuación, se presentarán una serie de escenarios que puedan darse al usarse la aplicación

##### Escenario 1  
>Supongamos que Juan, de Granada, es una persona que ha descubierto YoReservo y se la ha descargado en su smartphone. Esta semana quería invitar a sus amigos a cenar por su cumpleaños y le gustaría ir a un Italiano. Le interesa que este en una zona céntrica puesto que no quieren coger el coche por si se alargara la cena. Por consiguiente, Juan entrará en la aplicación y buscará restaurantes italianos en Granada utilizando unos filtros del buscador. Cuando realice la búsqueda le aparecerá en el mapa de granada las opciones disponibles. Cuando pinche en una de ellas, podrá visualizar información del establecimiento, como la carta, el número de mesas disponibles, imágenes, así como opiniones, de otros clientes. Finalmente se decide por "Italian restaurant". Al pinchar en este le aparecerá la opción de reservar, donde podrá elegir una fecha en el calendario (siempre que este disponible). Una vez elegida la fecha, seleccionará una franja horaria, el número de personas y la mesa o mesas que desee reservar. En concreto realiza una reserva para el Viernes 15 de Octubre a las 21:30. Finalmente, una vez realizada la reserva le aparecerá disponible en la sección "Mis reservas", donde además podrá modificarla (si es que se puede).

##### Escenario 2  
>María, es empleada de "Italian restaurant". Como cada día al inicio de su jornada laboral, tiene que planificar las reservas. Para ello se mete con su usuario de YoReservo y entra en la sección reservas, seleccionando el día que corresponde. En esta sección le aparecerá una distribución de mesas y si tienen reserva aparecerán asignadas a un cliente. Lo primero que hace, es comprobar que mesas han pagado ya una comanda, puesto que esas mesas están ya confirmadas. Una vez descartadas, consultas las reservas sin comanda. La primera que se encuentra es la de Juan. Para confirmar la asistencia de Juan, María inicia un chat con el a través de un chat que se crea cuando se realiza una reserva, indicándole que tienen media hora de margen de la hora de reserva, por lo que si llegan después perderán la reserva, así que lo conveniente es que realicen una comanda antes.

##### Escenario 3  
>Juan ha recibido el mensaje de María. Aunque no esperan llegar tarde, considera que es buena idea realizar una comanda previa, ya que saben que van a pedir y así ahorran tiempo esperando. Así que Juan, entra en su reserva y pincha en comanda. Automáticamente se le mostrará la carta del restaurante donde podrá añadir o quitar productos. Una vez realizado el pedido, se le muestra el total y un botón de pagar, el cuál le redirecciona a una plataforma de pago de un banco bien conocido. Cuando realiza el pago, le redirecciona a la aplicación y se le genera un código QR en la comanda, que será el que tenga que mostrar cuando llegue al restaurante.

##### Escenario 4
> Manuel es cocinero en "Italian restaurant". Hoy viernes están completos y tiene que empezar a realizar los preparativos para el servicio. Para ello entrará con su usuario de YoReservo y consultará las comandas previstas para hoy en la sección de reservas filtrando por las que tengan comandas. La primera que le aparece es la de Juan, por lo que accede a ella y consulta los pedidos que han seleccionado y a que hora está previsto que llegue Juan y sus acompañantes.

##### Escenario 5
> Juan ha terminado la cena y está muy satisfecho con el servicio y la calidad de está, por lo que quiere dejar una valoración positiva. Así que, se meterá en su reserva y abrirá la sección de valoración, donde podrá valorar tanto al empleado que les ha atendido como al restaurante.

##### Escenario 6

>Francesca, es la dueña de "Italian restaurant" y hace dos meses que decidió usar YoReservo en su establecimiento por lo que quiere comprobar que efectos está teniendo en su negocio la incorporación de la aplicación y ver que va bien o que va mal. Para ello entra con su usario en la aplicación y entra en la sección informes. En esta sección le aparecerán unos informes u otros dependiendo de los que tenga contratados. En su caso tiene una subscripción completa la servicio, por lo que puede consultar todos los datos relacionados con la interacción de los clientes con el establecimiento a través de la aplicación, como las tendencias de productos, el tipo de público que elige el establecimiento etc..

##### Escenario 7

> Pepe tiene un restaurante de comida tradicional andaluza. Busca modernizarse por lo que decide darse de alta en el servicio de YoReservo. Para ello entrará en la web de YoReservo e irá a la sección de nuevas subscripciones. Ahí tendrá que completar un formulario donde se le pidan tanto datos legales como datos relacionados con el establecimiento como la carta etc. Una vez completado, recibirá un correo electrónico con la confirmación de la incorporación del establecimiento y con las respectivas credenciales


##### Escenario 8
> Miguel, tiene una empresa de marketing y está realizando un estudio de negocio para unos empresarios que están buscando poner un negocio en Granada. Para ello, la empresa de Miguel necesita datos suficientes para poder realizar el estudio. Para ello se han subscrito al servicio de datos de YoReservo, que aporta datos sobre el comportamiento de los clientes en los establecimientos. La empresa de Miguel, posee un sistema para hacer minería de datos por lo que incorporaŕan los parámetros necesarios para solicitar los datos del comportamiento de los clientes y establecimientos en Granada.


<a name="historias"></a>
### Historias de Usuario

A partir de la definición de los roles y una serie de escenarios posibles se extraen las historias de usuario:

* [HU1 - Como cliente, necesito consultar los establecimientos disponibles en una ciudad para conocer a donde puedo ir ](https://github.com/migueg/CC-Proyecto-21-22/issues/1)
* [HU2 - Como cliente, necesito realizar una reserva en un establecimiento para ir a cenar con mis amigos](https://github.com/migueg/CC-Proyecto-21-22/issues/2)
* [HU3 - Como cliente con reserva, necesito realizar una comanda](https://github.com/migueg/CC-Proyecto-21-22/issues/3)
* [HU4 - Como cliente con reserva, necesito pagar una comanda](https://github.com/migueg/CC-Proyecto-21-22/issues/4)
* [HU5 - Como empleado, necesito consultar las reservas realizadas para planificar el día](https://github.com/migueg/CC-Proyecto-21-22/issues/5)
* [HU6 - Como empleado, necesito consultar la comanda de una mesa para preparar el pedido](#6)
* [HU7 - Como empleado, necesito escanear el código QR de la reserva de un cliente para comprobar que poseen una reserva](https://github.com/migueg/CC-Proyecto-21-22/issues/7)
* [HU8 - Como empleado, necesito contactar con un cliente para hacerle una sugerencia](https://github.com/migueg/CC-Proyecto-21-22/issues/8)
* [HU9 - Como cliente con reserva, necesito cancelar mi reserva](https://github.com/migueg/CC-Proyecto-21-22/issues/9)
* [HU10 - Como cliente con reserva, necesito modificar una comanda](https://github.com/migueg/CC-Proyecto-21-22/issues/10)
* [HU11 - Como empresario, necesito dar de alta mi establecimiento en el sistema](https://github.com/migueg/CC-Proyecto-21-22/issues/111)
* [HU12 - Como empresario, necesito modificar mi establecimiento ](https://github.com/migueg/CC-Proyecto-21-22/issues/12)
* [HU13 - Como empresario, quiero obtener un informe sobre el rendimiento de mi establecimiento](https://github.com/migueg/CC-Proyecto-21-22/issues/13)
* [HU14 - Como, empresario quiero obtener los datos de la tendencia hostelera en una ciudad para realizar un estudio de negocio](https://github.com/migueg/CC-Proyecto-21-22/issues/14)
* [HU15 - Como cliente, necesito crearme un perfil](https://github.com/migueg/CC-Proyecto-21-22/issues/15)
* [HU16 - Como cliente necesito valorar a un establecimiento y un empleado](https://github.com/migueg/CC-Proyecto-21-22/issues/31)
* [H17 - Como empleado necesito valorar a un cliente](https://github.com/migueg/CC-Proyecto-21-22/issues/32)

A partir de estas historias de usuario, se crean las primeras tareas o issues:

* [Crear la entidad establecimiento](https://github.com/migueg/CC-Proyecto-21-22/issues/16)
* [Crear la entidad carta](https://github.com/migueg/CC-Proyecto-21-22/issues/17)
* [Crear la entidad comanda](https://github.com/migueg/CC-Proyecto-21-22/issues/18)
* [Crear la entidad reserva](https://github.com/migueg/CC-Proyecto-21-22/issues/19)
* [Crear la entidad cliente](https://github.com/migueg/CC-Proyecto-21-22/issues/20)
* [Crear la entidad empleado](https://github.com/migueg/CC-Proyecto-21-22/issues/21)
* [Hay que crear el flujo de reservas](https://github.com/migueg/CC-Proyecto-21-22/issues/22)
* [Hay que resolver el problema de simultaneidad de reservas](https://github.com/migueg/CC-Proyecto-21-22/issues/23)
* [Hay que resolver la generación de informes](https://github.com/migueg/CC-Proyecto-21-22/issues/24)
* [Hay que generar un código QR](https://github.com/migueg/CC-Proyecto-21-22/issues/25)
* [Hay que resolver la gestión de pago](https://github.com/migueg/CC-Proyecto-21-22/issues/26)
* [Hay que crear el flujo de comandas](https://github.com/migueg/CC-Proyecto-21-22/issues/27)
* [Hay que resolver el escaneo de un QR](https://github.com/migueg/CC-Proyecto-21-22/issues/28)
* [Hay que resolver el problema de sincronización en un chat](https://github.com/migueg/CC-Proyecto-21-22/issues/29)
* [Hay que crear una API para los empresarios](https://github.com/migueg/CC-Proyecto-21-22/issues/30)
* [Hay que mandar un correo electrónico cuando un establecimiento este dado de alta](https://github.com/migueg/CC-Proyecto-21-22/issues/33)
* [Hay que gestionar los permisos de la API](https://github.com/migueg/CC-Proyecto-21-22/issues/34)

<a name="milestones"></a>
### Milestones

Las historias de usuario y sus respectivas tareas será agrupadas en los siguientes Milestones:

* [Hito 1 - General](https://github.com/migueg/CC-Proyecto-21-22/milestone/1)
* [Hito 2 - Reservas](https://github.com/migueg/CC-Proyecto-21-22/milestone/2)
* [Hito 3 - Comandas](https://github.com/migueg/CC-Proyecto-21-22/milestone/3)
* [Hito 4 - Pagos](https://github.com/migueg/CC-Proyecto-21-22/milestone/4)
* [Hito 5 - Informes](https://github.com/migueg/CC-Proyecto-21-22/milestone/5)
* [Hito 6 - Usuarios y establecimientos](https://github.com/migueg/CC-Proyecto-21-22/milestone/6)
* [Hito 7 - API](https://github.com/migueg/CC-Proyecto-21-22/milestone/7)
* [Hito 8 - Chats y valoraciones](https://github.com/migueg/CC-Proyecto-21-22/milestone/8)

## Anteriores Hitos

La documentación relacionada con hitos anteriores se podrá consultar a través de los siguientes enlaces:

* [Hito 0](/DOC/Hitos/hito0.md)
