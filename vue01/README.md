# dl-hylabs1a-hmi
## FCAS - Fase 1A - HMI

Este repositorio contiene el proyecto web (HMI) del juego que se mostrara en la feria FEINDEF 2021

### Instalación y ejecución

``` bash
# instalar dependencias necesarias para cualquier tarea
npm install

# levantar un servidor local con `hot reload` en localhost:8080 por defecto
npm run serve

# realizar una compilación/construcción para producción con minimización
npm run build
```

#### Requisitos instalación

Este proyecto utiliza librerías de componentes y estilos comunes de Digital Labs (Indra). Dichas librerías se encuentas alojadas en un servidor Nexus de dependencias que requiere acceso con credenciales, por lo que es necesario modificar la configuración de la máquina donde se requiera compilar el proyecto para que sea capaz de acceder a dicho servidor y descargarse las dependencias necesarias.
Es necesario añadir las siguientes líneas de configuración al fichero .npmrc alojado en la `home` del usuario para que NPM pueda localizar las librerías del grupo @indra-dl. Si el fichero no existe es necesario crearlo y añadir la configuración.

Un ejemplo de configuración válida del fichero .npmrc sería la siguiente:

```
@indra-dl:registry=https://slmaven.indra.es/nexus/repository/FMWK_Npm/
always-auth=true
init.author.name=YOUR_INDRA_USERNAME
init.author.email=YOUR_INDRA_EMAIL
email=YOUR_INDRA_EMAIL
_auth=********
```

__Nota: el valor de campo `_auth` es la cadena `USUARIO:PASSWORD` codificada en base 64. Para más información ver este [enlace](https://mind.indra.es/pages/viewpage.action?pageId=251666177#Gu%C3%ADadeusodeSonatypeNexus3-Configuraci%C3%B3ndelentornoparausodeunrepositorioNPM)_


### Scripts NPM
En el fichero package.json se han definido lo siguientes scripts:
- **serve**: arranca el servidor local
- **build**: realiza la compilación del proyecto para su distribución en producción con destino  la carpeta `/dist`
- **test:unit**: ejecuta todas las pruebas unitarias
- **test:e2e**: ejecuta todas las pruebas e2e
- **lint:js**: ejecuta el linter de `javascript` de forma manual
- **lint:css**: ejecuta el linter de `scss` de forma manual
- **generateMapIcons**: ejecuta un script de node que genera un JSON con los datos de iconos 2525B para poder ser consumidos por la aplicación
- **dockerized**: realiza un build del proyecto, genera una imagen de docker con la etiqueta `docksdtr.indra.es/dlisti_1/feindef2021-hmi` y la despliega en el servidor Harbor de Indra
``` bash

### Lenguajes, librerías y preprocesadores usados

* [SCSS](https://sass-lang.com/guide) + [BEM Syntax](http://getbem.com/)
* [Vue](https://vuejs.org/)
* [EcmaScript](https://es.wikipedia.org/wiki/ECMAScript)

### Estructura del proyecto

``` bash
dl-cyberrange-phishing-fe
│
├── .vscode        # configuración rápida para el editor Visual Studio Code
├── public         # carpeta que contiene el fichero html principal
│   ├── index.html # fichero html principal
│   ├── login.html # redirección física al html principal
│   └── mapIcons   # carpeta donde se encuentra la estructura de iconos 2525b
├── src
│   ├── api             # carpeta que contiene todo lo relacionado con las llamadas a servidor
│   │   ├───call
│   │   │   └── CallBase.js # fichero que realiza las llamadas a servidor
│   │   ├── services        # carpeta que contiene los ficheros encargados de llamar a los servicios sin servidor asociado de momento
│   │   ├── queue           # carpeta que contiene los ficheros encargados de llamar a los servicios de colas de Solace
│   │   └── ApiCall.js      # fichero que encapsula las llamadas get, post, put, delete,...
│   ├── assets      # carpeta que contiene los ficheros estáticos de la web (imágenes, fuentes, ...)
│   ├── components  # carpeta que contiene los compoentes de la aplicación siguiendo el modelo atómico
│   ├── config      # carpeta que contiene los ficheros de configuración interna propia de la aplicación así como el fichero JSON de iconos 25252b ya procesado
│   ├── directives  # carpeta que contiene las directivas de vue utilizadas en el proyecto
│   ├── lang        # carpeta que contiene todo lo relacionado con el multiidioma (configuración, textos,...)
│   ├── manager     # carpeta que contiene las clases JS que ayudan a getionar recursos internos de la aplicación
│   ├── mixins      # carpeta que contiene todo los ficheros mixin utilizados por los componentes
│   │   └── services    # mixins relacionados con invocaciones a servicios
│   ├── models      # carpeta que contiene los archivos que representa modelos lógicos de negocio
│   ├── plugins     # carpeta que contiene los plugin de vue utilizadas en el proyecto
│   ├── router      # carpeta que contiene todo lo relacionado con la navegación entre vistas
│   ├── sass        # carpeta que contiene todo lo relacionado con la programación de estilos SASS
│   ├── store       # carpeta que contiene todo lo relacionado con el almacenamiento de la aplicación
│   ├── views       # carpeta que contiene los componentes denominadas vistas de la aplicación
│   ├── worker      # carpeta que contiene todos los workers que implementa la aplicación
│   ├── app.vue     # Componente base de la aplicación
│   └── main.js     # Punto de montaje de la aplicación 
├── test        # carpeta que contiene tanto los tests unitarios como e2e
├── .browserslistrc   # listado de navegadores compatibles
├── .dockerignore     # fichero utilizado para ignorar archivos por docker
├── .env.development  # variables de la aplicación en entorno local
├── .env.production   # variables de la aplicación en entorno de producción
├── .eslintrc.js      # reglas del validador de JS
├── .gitattributes    # atributos de configuración git
├── .gitignore        # configuración de ficheros ignorados de git 
├── .prettierrc       # configuración del plugin prettier
├── babel.config.js   # configuración del plugin babel
├── CHANGELOG.md.js   # fichero de documentación de cambios
├── dockerfile        # fichero de configuración para la generación de la imagen de docker del proyecto
├── jest.config.js    # configuración del plugin jest
├── nginx.conf        # fichero de configuración del servidor NGINX que se utiliza dentro de la imagen de docker del proyecto
├── nigthwatch.config.js    # configuración del plugin nigthwatch
├── package-lock.json.      # configuración de dependencias de npm
├── package.json.     # configuración de npm
├── README.md.        # este fichero
├── sonar-project.properties # fichero de configuración de la ejecución de SONAR
├── stylelint.config.js    # configuración del plugin stylelint
└── vue.config.js     # fichero de configuración de vue.cli
```

## Como subir de versión
Hasta que esté montada la infraestructura de CI, es necesario realizar a mano la subida de versión en el fichero `package.json` 
y tagear el repositorio con la misma versión en la rama `master` cuando los cambios se hayan integrado en ella.

