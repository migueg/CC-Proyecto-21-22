# CC-Proyecto-21-22

Este repositorio contiene el proyecto realizado para las prácticas de la asignatura *Cloud Computing del Máster de Ingeniería Informática de la UGR* por @migueg.

>Versión 4.0.0

## Lógica de negocio

La lógica de negocio que va a comprender la solución propuesta puede consultarte en [Lógica de negocio](/DOC/Hitos/hito0.md).

## Hito 4

El objetivo de este hito es preparar el proyecto para la integración continua. Para ello se han valorado diferentes alternativas. Dado que se necesita nodejs para ejecutar el framework de test utilizado, el principal criterio de elección ha sido buscar un sistema de integración continua que admita nodejs, que sea sencillo y que ofrezca rapidez para la ejecución de los tests.
A continuación, se describen las plataformas de integración utilizadas.

+ [Azure](/DOC/azureci.md)
+ [Travis](/DOC/travis.md)
+ [Circle ci](/DOC/circleci.md)
+ [GitHub Actions](/DOC/actions.md)

### Conclusiones

Tras la utilización de varias plataformas para la integración continua, puedo extraer las siguientes conclusiones:

- Todas las plataformas utilizadas son aceptables para trabajar con proyectos de un tamaño pequeño, ya que ofrece bastante características para lograr un sistema de integración continua eficiente, sencillo y rápido.

- Guiándome por un criterio de sencillez, elegiría **Circle ci** como plataforma de integración continua ya que el uso de orbes facilita y agiliza el proceso de integración continua, además de que se dispone de bastantes recursos de manera gratuita

- Sin embargo, considero que la plataforma más completa para la integración continua es **Azure** ya que ofrece multitud de características, sin embargo esta plataforma es la más compleja de configurar y comprender que el resto. Por lo tanto, **elijo Azure como plataforma de integración continua**.




## Anteriores hitos

La documentación relacionada con hitos anteriores se podrá consultar a través de los siguientes enlaces:

* [Hito 0](/DOC/Hitos/hito0.md)
* [Hito 1](/DOC/Hitos/hito1.md)
* [Hito 2](/DOC/Hitos/hito2.md)
* [Hito 3](/DOC/Hitos/hito3.md)
