// DEMO META DATA
export default {
  titleName            : 'Autocomplete',
  nameJS               : 'DlUiAutocomplete',
  type                 : 'atom',
  nameScssMixin        : 'autocomplete-style-config',
  nameScssDefaultClass : 'dl-ui-autocomplete',
  nameScssMixinFile    : 'autocomplete',
  description          : `<p>El autocomplete permite al usuario escoger un valor en tiempo real cuando se escribe en un input, proporcionando en un
  un menú desplegable un listado consecuente del valor proporcionado por el usuario.</p>
    <p> El componente Autocomplete permite también ofrecer información de su contenido mediante un label superior. </p>
    <p> Podemos encontrar la opción de ver un texto de ayuda inferior donde podemos aportar información extra al usuario. </p><br>
    <p>Permite la definición de diferentes estados (hover, focus, active y disabled) además de una personalización completa.<br>
    <p> Tiene funcionalidades añadidas como caso de error o limpiar la selección hecha mediante un icono personalizable.</p><br>
    <p>En la lista desplegable podemos ofrecer tanto información como iconos a ambos lados que la complementen, también personalizables.</p>`,
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
    },
    {
      name      : 'complete',
      condition : 'Cuando el valor del keyword cambia.',
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
  notes : undefined
};
