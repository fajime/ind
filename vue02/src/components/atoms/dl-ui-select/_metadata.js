// DEMO META DATA
export default {
  titleName            : 'Select',
  nameJS               : 'DlUiSelect',
  type                 : 'atom',
  nameScssMixin        : 'select-style-config',
  nameScssDefaultClass : 'dl-ui-select',
  nameScssMixinFile    : 'select',
  description          : `<p>El select simple permite al usuario escoger un valor único entre varios (que es un componente <a href="/#/dl-ui-dropdown">drop-down</a>), de un menú desplegable (que es un componente <a href="/#/dl-ui-listbox">list-box</a>).</p>

    <p> El componente Select permite también ofrecer información de su contenido mediante un label superior. </p>
    <p> Podemos encontrar la opción de ver un texto de ayuda inferior donde podemos aportar información extra al usuario. </p><br>
    <p> Permite la definición de diferentes estados (hover, focus, active y disabled) además de una personalización completa.<br>
    <p> Tiene funcionalidades añadidas como caso de error o limpiar la selección hecha mediante un icono personalizable.</p><br>
    <p>En la lista desplegable (que es el componente drop-down) podemos ofrecer tanto información como iconos a ambos lados que la complementen, también personalizables.</p>`,
  slots  : [],
  events : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario pulsa sobre un valor del desplegable',
      payload   : 'Valor nuevo seleccionado'
    },
    {
      name      : 'change',
      condition : 'Cuando el valor del desplegable cambia.',
      payload   : 'Evento original y nuevo valor seleccionado.'
    }
  ],
  scss : [
    {
      name    : 'height',
      default : '32px',
      desc    : 'Altura del autocomplete'
    },
    {
      name    : 'width',
      default : '100%',
      desc    : 'Anchura del autocomplete'
    },

    {
      name    : 'background',
      default : '$color-surface-01k',
      desc    : 'Color del fondo de la caja principal'
    },

    {
      name    : 'label::padding',
      default : '0',
      desc    : 'Padding de la etiqueta'
    },

    {
      name    : 'label::color',
      default : '$color-action-tertiary-default',
      desc    : 'Color de la etiqueta'
    },
    {
      name    : 'label::align',
      default : 'inherit',
      desc    : 'Alineación de la etiqueta'
    },

    {
      name    : 'label::font',
      default : 'null',
      desc    : 'Fuente de la etiqueta'
    },

    {
      name    : 'icon::width',
      default : '16px',
      desc    : 'Ancho del icono de la selección'
    },
    {
      name    : 'icon::height',
      default : '16px',
      desc    : 'Alto del icono de la selección'
    },
    {
      name    : 'icon::padding',
      default : '1px',
      desc    : 'Padding del icono de la selección'
    },
    {
      name    : 'icon::color',
      default : '$color-base-highlight-02',
      desc    : 'Color del icono de la selección'
    },

    {
      name    : 'text-color',
      default : '$color-base-02',
      desc    : 'Color del texto de la caja principal'
    },

    {
      name    : 'help::margin-top',
      default : '4px',
      desc    : 'Margen superior de la ayuda'
    },

    {
      name    : 'help::background',
      default : 'transparent',
      desc    : 'Fondo de la ayuda'
    },

    {
      name    : 'help::color',
      default : '$color-base-highlight-02',
      desc    : 'Color de la ayuda'
    },

    {
      name    : 'help::padding',
      default : '0',
      desc    : 'Padding de la ayuda'
    },

    {
      name    : 'help::align',
      default : 'inherit',
      desc    : 'Alineación de la ayuda'
    },

    {
      name    : 'help::font',
      default : 'null',
      desc    : 'Fuente de la ayuda'
    },

    {
      name    : 'clear-icon::width',
      default : '16px',
      desc    : 'Ancho del icono de borrar contenido'
    },
    {
      name    : 'clear-icon::height',
      default : '16px',
      desc    : 'Alto del icono de borrar contenido'
    },
    {
      name    : 'clear-icon::padding',
      default : '1px',
      desc    : 'Padding del icono de borrar contenido'
    },

    {
      name    : 'disable::color',
      default : '$color-surface-06',
      desc    : 'Color deshabilitado'
    },
    {
      name    : 'disable::border-color',
      default : '$color-surface-06',
      desc    : 'Color borde deshabilitado'
    },

    {
      name    : 'error::color',
      default : '$color-status-danger-02k',
      desc    : 'Color error'
    },
    {
      name    : 'error::border-color',
      default : '$color-status-danger-02k',
      desc    : 'Color borde error'
    }
  ],
  notes : `
<p>Este componente esta compuesto de otros dos, el componente <a href="/#/dl-ui-dropdown">drop-down</a> y el componente <a href="/#/dl-ui-listbox">list-box</a></p>
<p>
<div class="dl-comp-kit-demo-use__subtitle">Ejemplo de configuracion de estilos completa</div>
<div class="dl-comp-kit-demo-use__code">
    <pre>
        <code class="css">

@import '../mixins/select';
@import '../../dl-ui-dropdown/mixins/dropdown';
@import '../../dl-ui-listbox/mixins/listbox';

$config: (
  'width': 100%,
  'background': $color-action-secondary-contrast,
  'label::color': $color-action-tertiary-default,
  'label::padding': 8px 10px,
  'label::font': normal bold normal 15px / 0.5 $body-medium-regular-font-family,
  'text::color': $color-status-info-02k,
  'icon::color': $color-status-info-02k,
  'icon::width': 22px,
  'icon::height': 22px,
  'icon::padding': 2px,
  'clear-icon::width': 20px,
  'clear-icon::height': 20px,
  'clear-icon::padding': 0,
  'help::color': $color-status-info-02k,
  'help::padding': 4px 10px,
  'help::align': right,
  'help::font': normal normal normal 10px / 0.4 $body-medium-regular-font-family,
);

.demo__dl-ui-select {
  &__wrapper {
    width: 250px;
  }
}

$config-dropdown: (
  'background': $color-action-secondary-contrast,
  'background::highlight': $color-action-secondary-default,
  'border': 2px solid,
  'border-color': $color-status-info-02k,
  'icon::width': 20px,
  'icon::height': 20px,
  'border-radius': 16px,
  'trigger-icon::color': $color-status-info-02k
);

$config-listbox: (
  'border-radius': 32px,
  'border': 2px solid $color-status-info-02k,
  'padding': 16px 10px,
  'item::border-radius': 32px,
  'item::padding': 0 16px,
  'item::margin': 4px 0
);

.custom-select {
  .dl-ui-dropdown {
    @include dropdown-style-config($config-dropdown);
  }

  .dl-ui-listbox {
    @include listbox-style-config($config-listbox);
  }

  @include select-style-config($config);

  .dl-ui-scrollbar {
    &::-webkit-scrollbar {
      width: 2px;
    }

    &::-webkit-scrollbar-track {
      background: $color-action-secondary-contrast;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $color-status-info-02k;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: $color-action-secondary-default;
    }
  }
</code>
<pre>
</div>
</p>

  `
};
