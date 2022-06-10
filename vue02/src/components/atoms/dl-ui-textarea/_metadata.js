// DEMO META DATA
export default {
  titleName            : 'Textarea',
  nameJS               : 'DlUiTextarea',
  type                 : 'atom',
  nameScssMixin        : 'textarea-style-config',
  nameScssDefaultClass : 'dl-ui-textarea',
  nameScssMixinFile    : 'textarea',
  description          : `<p>Los text-area nos valen para efectuar una entrada de texto compleja de tantas líneas como queramos en nuestras aplicaciones.</p>
    <p>Emite el evento input cuando cambia su contenido y lleva asociadas transiciones cuando cambia alguna propiedad, excepto en width y height para poder seguir al ratón en el 'resize'.</p>
    <p>Podemos inicializarlo con un número de columnas y rows para darle un tamaño, aunque admite también width y height via mixin.</p>
    <p>Gracias a la prop 'resizable' podemos activar o desactivar el icono en la esquina inferior derecha para permitir o no el cambio de tamaño.</p>`,
  // Could we deduce/extract the slots from the html code?
  slots  : [],
  // Could we deduce/extract the events from the component code?
  events : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario escribe dentro del campo.',
      payload   : 'Contenido del input.'
    },
    {
      name      : 'error',
      condition : 'Cuando el usuario se pasa de caracteres.',
      payload   : 'Contenido del input.'
    }
  ],
  scss : [
    {
      name    : 'background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo'
    },
    {
      name    : 'height',
      default : '125px',
      desc    : 'Altura del input'
    },
    {
      name    : 'width',
      default : '297px',
      desc    : 'Anchura del input'
    },
    {
      name    : 'border',
      default : '1px solid $color-surface-06',
      desc    : 'Borde'
    },
    {
      name    : 'color',
      default : '$color-base-highlight-02',
      desc    : 'Color del contenido'
    },
    {
      name    : 'label::color',
      default : '$color-base-highlight-02',
      desc    : 'Color de la etiqueta'
    },
    {
      name    : 'help::color',
      default : '$color-base-highlight-02',
      desc    : 'Color de la ayuda'
    },
    {
      name    : 'help::background',
      default : 'transparent',
      desc    : 'Color de fondo de la ayuda'
    },
    {
      name    : 'help::padding',
      default : '0',
      desc    : 'Padding interno de la ayuda'
    },
    {
      name    : 'help::margin-top',
      default : '4px',
      desc    : 'Margen superior de la ayuda'
    },
    {
      name    : 'help::margin-top',
      default : '4px',
      desc    : 'Margen superior del contador'
    },
    {
      name    : 'focus::color',
      default : '1px solid $color-emphasis-03k',
      desc    : 'Color en estado <span class="demo__md--syntax">focus</span>'
    },
    {
      name    : 'focus::border',
      default : '1px solid $color-emphasis-03k',
      desc    : 'Borde en estado <span class="demo__md--syntax">focus</span>'
    },
    {
      name    : 'disable::background',
      default : '$color-surface-03',
      desc    : 'Fondo en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'disable::border',
      default : '1px solid $color-surface-06',
      desc    : 'Borde en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'disable::color',
      default : '$color-surface-06',
      desc    : 'Color del contenido en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'error::label',
      default : '$color-base-highlight-02',
      desc    : 'Label estado <span class="demo__md--syntax">error</span>'
    },
    {
      name    : 'error::help::color',
      default : '$color-status-danger-02k',
      desc    : 'Texto de ayuda en estado <span class="demo__md--syntax">error</span>'
    },
    {
      name    : 'error::border',
      default : '1px solid $color-status-danger-02k',
      desc    : 'Borde en estado <span class="demo__md--syntax">error</span>'
    },
    {
      name    : 'error::color',
      default : '$color-status-danger-02k',
      desc    : 'Color del contenido en estado <span class="demo__md--syntax">error</span>'
    }
  ],
  notes : undefined
};
