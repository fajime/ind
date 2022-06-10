<svg style="height: 90px;" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g ><path fill="none" stroke="#0A4253" stroke-width="8.3376" stroke-miterlimit="1.5" d="M55,26.7c22.1,0.4,39.4-1,57.3,5.3 c18.2,6.4,35.6,21.7,44,43.8c6.9,18.2,6.5,47.3,0,64.5c-5.5,14.6-18.5,30.2-39.1,36.7c-18.8,5.9-67.1,2.2-67.1,2.2V64.7L83,65.2v76l25.8,0.3"/><path fill="none" stroke="#F6BB1E" stroke-width="8.3376" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5" d="M106.5,140.5c0,5,4.1,9.1,9.1,9.1c5,0,9.1-4.1,9.1-9.1s-4.1-9.1-9.1-9.1C110.6,131.4,106.5,135.5,106.5,140.5z"/><path fill="none" stroke="#17667C" stroke-width="8.3376" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5" d="M38.7,27.3c0,5,4.1,9.1,9.1,9.1c5,0,9.1-4.1,9.1-9.1c0-5-4.1-9.1-9.1-9.1C42.8,18.3,38.7,22.3,38.7,27.3z"/></g></svg>

# Sigle Components Library Kit

Este repositorio contiene todos los componentes que usan las interfaces de usuario para las aplicaciones de Sigle.
## Instalación y ejecución

```bash
# instalar dependencias
npm install

# servidor con `hot reload` en localhost:8080
npm run serve

# construir para producción con minimización
npm run build

## Scripts NPM

En el fichero package.json se han definido lo siguientes scripts:

- **serve**: arranca el servidor local
- **build**: realiza la complilación del proyecto para su distribución en producción con destino la carpeta `/dist`
- **test:unit**: ejecuta los test unitarios lanzando el framework de Jest
- **test:e2e**: ejecuta los test e2e lanzando el framework de NightWatch
- **lint**: ejecuta el linter de `javascript` y de `css` de forma manual y corrige los errores
- **lint:js**: ejecuta el linter de `javascript` de forma manual sin corregir errores. Para corregir añadir al final `-- --fix`
- **lint:css**: ejecuta el linter de `css y scss` de forma manual sin corregir errores. Para corregir añadir al final `-- --fix`
- **lint:style**: ejecuta el linter de `css y scss`  en sección de estilos en los `html y vue` de forma manual sin corregir errores. Para corregir añadir al final `-- --fix`
- **build:dev**: realiza la complilación del proyecto para su distribución en máquinas de test con destino la carpeta `/dist`
- **make-readme**: genera el fichero README.md con los badges de test de cobertura

## Lenguajes, librerías y preprocesadores usados

- [SCSS](https://sass-lang.com/guide) + [BEM Syntax](http://getbem.com/)
- [Vue](https://vuejs.org/)
- [EcmaScript](https://es.wikipedia.org/wiki/ECMAScript)

## Estructura de componente

```bash
dl-fmwk-vue-comp-kit
│
└── src
    └── components
        └──atomic-folder
            └── dl-ui-component
                ├── demo                           # Demo component files folder
                │   ├── demo__dl-ui-component.js   # JS
                │   ├── demo__dl-ui-component.scss # Styles
                │   ├── demo__dl-ui-component.html # CSS
                │   └── index.vue                  # Index file of demo component
                │
                ├── mixins
                │   └── mixin.scss    # Mixins SCSS to add custom styles
                │
                ├── dl-ui-component.js    # JS
                ├── dl-ui-component.scss  # Styles
                ├── dl-ui-component.html  # CSS
                └── index.vue             # Index file of component
                │
```

## Configuración de npm para poder instalar el proyecto y luego poder utilizar el kit de componentes en cualquier aplicación

Para configurar npm (node package manager) para conectar con Nexus donde se encuentra parte de las dependencias es necesario modificar la configuración local del usuario para ello es neesario ejecutar lo siguientes comandos en la consola:

```
npm config set @indra-dl:registry https://slmaven.indra.es/nexus/repository/FMWK_Npm/ --always-auth
```

```
npm login --registry=https://slmaven.indra.es/nexus/repository/FMWK_Npm/
```

## Configuración de la aplicación destino

Para poder utilizar los componentes con los estilos generados por defecto es necesario añadir en el punto de entrada de los ficheros `SCSS` de la aplicación un enlace (`@import`) al fichero `main.css` de la dependencia @indra-dl/dl-fmwk-ui-layout, ya que es ahí donde se han definido las variables y funciones SASS de forma global que la librería de componentes utiliza para gestionar la parte de interfaz visual.
Además, para poder utilizar el reset, las clases y los temas preestablecidos es necesario realizar su importación en el fichero principal de estilos de la aplicación destino.

Ejemplo de línea a insertar:
```
@import '~@indra-dl/dl-fmwk-ui-layout/src/layout/main.scss';
```

Ejemplo de línea a insertar en el app.scss de la aplicación final:
```
@import '~@indra-dl/dl-fmwk-ui-layout/src/layout/styles.scss';
```

Ejemplo de línea a insertar en el app.scss de la aplicación final para utiliar un tema, en este caso, el tema IDS:
```
@import '~@indra-dl/dl-fmwk-ui-layout/src/layout/theme/IDS';
```


## Utilizando un componente

```bash
# script.js

import DlUiComponent from '../relative-path/dl-ui-component';

export default {
    name       : 'dl-ui-component',
    components : { DlUiComponent },
    props      : { property : ... }
};
```

```bash
# dl-ui-component.html

<dl-ui-component class="dl-ui-component"></dl-ui-component>

```

```bash
# mixins/_component.scss

@mixin component-style-config($params)
```

```bash
# dl-ui-component.scss

@import '../mixins/_component.scss'

.dl-ui-component
  @include component-style-config($params)
```

## Demo

Levantar el servidor local del proyecto y acceder a https://locahost:8080

## Componentes

A continuación se muestra un listado con los componentes disponibles en el repositorio:

1. Átomos

- [dl-ui-action-button](./src/components/atoms/dl-ui-action-button) ⟶ Componente botón acción.
- [dl-ui-breadcrumb](./src/components/atoms/dl-ui-breadcrumb) ⟶ Componente rastro de migas.
- [dl-ui-button](./src/components/atoms/dl-ui-button) ⟶ Componente botón.
- [dl-ui-checkbox](./src/components/atoms/dl-ui-checkbox) ⟶ Componente checkbox.
- [dl-ui-chip](./src/components/atoms/dl-ui-chip) ⟶ Componente chip.
- [dl-ui-icons](./src/components/atoms/dl-ui-icon) ⟶ Componente icono.
- [dl-ui-icons-set](./src/components/atoms/dl-ui-icons-set) ⟶ Componente sprite que almacena SVG's de iconos.
- [dl-ui-input](./src/components/atoms/dl-ui-input) ⟶ Componente input de texto.
- [dl-ui-listbox](./src/components/atoms/dl-ui-listbox) ⟶ Componente lista seleecionable.
- [dl-ui-multiselect](./src/components/atoms/dl-ui-multiselect) ⟶ Componente de selección múltiple.
- [dl-ui-number](./src/components/atoms/dl-ui-number) ⟶ Componente input numérico.
- [dl-ui-password](./src/components/atoms/dl-ui-password) ⟶ Componente input tipo password.
- [dl-ui-progress-bar](./src/components/atoms/dl-ui-progress-bar) ⟶ Componente barra de propgreso lineal.
- [dl-ui-progress-circle](./src/components/atoms/dl-ui-progress-circle) ⟶ Componente barra de propgreso circular.
- [dl-ui-radio](./src/components/atoms/radio) ⟶ Componente radio selección.
- [dl-ui-range](./src/components/atoms/dl-ui-range) ⟶ Componente selcción de rango.
- [dl-ui-select](./src/components/atoms/dl-ui-select) ⟶ Componente de selección simple.
- [dl-ui-split-pane](./src/components/atoms/dl-ui-split-pane) ⟶ Componente de panel para el componente superior split panel.
- [dl-ui-switch](./src/components/atoms/dl-ui-switch) ⟶ Componente interruptor.
- [dl-ui-split-tab](./src/components/atoms/dl-ui-split-tab) ⟶ Componente de pestaña para el componente superior pestañas.
- [dl-ui-textarea](./src/components/atoms/dl-ui-textarea) ⟶ Componente input de texto largo.
- [dl-ui-toggle-button](./src/components/atoms/dl-ui-toggle-button) ⟶ Componente botón toggle.
- [dl-ui-step](./src/components/atoms/dl-ui-step) ⟶ Componente paso de un proceso.

2. Moléculas

- [dl-ui-accordion](./src/components/molecules/dl-ui-accordion) ⟶ Componente elemento desplegable.
- [dl-ui-card](./src/components/atoms/dl-ui-card) ⟶ Componente tarjeta de información.
- [dl-ui-checkbox-group](./src/components/atoms/dl-ui-checkbox-group) ⟶ Componente grupo de checkboxes.
- [dl-ui-datepicker](./src/components/atoms/dl-ui-datepicker) ⟶ Componente calendario.
- [dl-ui-timepicker](./src/components/atoms/dl-ui-timepicker) ⟶ Componente tiempo.
- [dl-ui-rating](./src/components/atoms/dl-ui-rating) ⟶ Componente rating.
- [dl-ui-footer](./src/components/molecules/dl-ui-footer) ⟶ Componente pie de página.
- [dl-ui-header](./src/components/molecules/dl-ui-header) ⟶ Componente cabecera de página.
- [dl-ui-image-viewer](./src/components/molecules/dl-ui-image-viewer) ⟶ Componente visor de imágenes.
- [dl-ui-menu](./src/components/molecules/dl-ui-menu) ⟶ Componente menú .
- [dl-ui-rating](./src/components/molecules/dl-ui-rating) ⟶ Componente de valoración.
- [dl-ui-snack](./src/components/atoms/dl-ui-snack) ⟶ Componente snack para avisos.
- [dl-ui-split-button](./src/components/molecules/dl-ui-split-button) ⟶ Componente notón con desplegable.
- [dl-ui-split-panes](./src/components/molecules/dl-ui-split-panes) ⟶ Componente gestor de panels split.
- [dl-ui-stepper](./src/components/molecules/dl-ui-stepper) ⟶ Componente pasos de un proceso.
- [dl-ui-tabs](./src/components/molecules/dl-ui-tabs) ⟶ Componente gestor de pestañas.
- [dl-ui-dialog](./src/components/atoms/dl-ui-dialog) ⟶ Componente Dialogo.

3. Organismos

- [dl-ui-accordion-list](./src/components/organisms/dl-ui-accordion-list) ⟶ Componente gestor de acordeones.
- [dl-ui-datagrid](./src/components/organisms/dl-ui-datagrid) ⟶ Componente grid de datos.
- [dl-ui-menu-blocks](./src/components/molecules/dl-ui-menu-blocks) ⟶ Componente menú por bloques.
