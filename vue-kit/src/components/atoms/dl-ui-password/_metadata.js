// DEMO META DATA
export default {
  titleName            : 'Password',
  nameJS               : 'DlUiPassword',
  type                 : 'atom',
  nameScssMixin        : 'password-style-config',
  nameScssDefaultClass : 'dl-ui-password',
  nameScssMixinFile    : 'password',
  description          : `<p>Los password-input nos valen para efectuar una entrada de contraseña en nuestras aplicaciones.</p>
    <p>Mediante la propiedad showEye podemos activar o desactivar la opción de enmascarar el valor para que no se muestre (por defecto).</p>
    <p>Una vez activada, clicando en el icono podremos alternar entre enmascarar la contraseña o no hacerlo.</p>
    <p>Emite el evento input cuando cambia su contenido y lleva asociadas transiciones cuando cambia alguna propiedad.</p>`,
  // Could we deduce/extract the slots from the html code?
  slots  : [],
  // Could we deduce/extract the events from the component code?
  events : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario escribe dentro del campo.',
      payload   : 'Evento nativo de input.'
    }, {
      name      : 'focus',
      condition : 'Cuando el input recibe el foco',
      payload   : undefined
    },
    {
      name      : 'blur',
      condition : 'Cuando el input pierde el foco',
      payload   : undefined
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
      default : '32px',
      desc    : 'Altura del password'
    },
    {
      name    : 'width',
      default : '100%',
      desc    : 'Anchura del password'
    },
    {
      name    : 'border',
      default : '1px solid $color-surface-06',
      desc    : 'Borde'
    },
    {
      name    : 'color',
      default : '$color-base-highlight-03k',
      desc    : 'Color del contenido'
    },
    {
      name    : 'icon::size',
      default : '16px',
      desc    : 'Tamaño del icono, ancho y largo'
    },
    {
      name    : 'icon::color',
      default : '$color-base-highlight-03k',
      desc    : 'Color del icono'
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
    }
    /* {
         name    : 'focus::border',
         default : '1px solid $color-action-primary-hover',
         desc    : 'Borde en estado <span class="demo__md--syntax">focus</span>'
       },
       {
         name    : 'disable::border',
         default : '1px solid $color-surface-06',
         desc    : 'Borde del contenido en estado <span class="demo__md--syntax">disabled</span>'
       },
       {
         name    : 'disable::color',
         default : '$color-surface-06',
         desc    : 'Color del contenido en estado <span class="demo__md--syntax">disabled</span>'
       } */
  ],
  notes : undefined
};
