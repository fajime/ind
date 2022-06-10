// DEMO META DATA
export default {
  titleName            : 'Input',
  nameJS               : 'DlUiInput',
  type                 : 'atom',
  nameScssMixin        : 'input-style-config',
  nameScssDefaultClass : 'dl-ui-input',
  nameScssMixinFile    : 'input',
  description          : `<p>Los text-input nos valen para efectuar una entrada de texto básica de una sola línea en nuestras aplicaciones.</p>
    <p> El componente Input permite también ofrecer información de su contenido mediante un label superior. </p>
    <p> También podemos encontrar la opción de ver un texto de ayuda inferior donde podemos aportar información extra al usuario. </p><br>
    <p>Permite la definición de diferentes estados (hover, focus, active y disabled) además de una personalización completa.<br>
    Igualmente se permite elegir si el campo es requerido.</p><br>
    <p>Emite el evento input cuando cambia su contenido y lleva asociadas transiciones cuando cambia alguna propiedad.</p>`,
  slots  : [],
  events : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario escribe dentro del campo.',
      payload   : 'Evento nativo de input.'
    },
    {
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
      name    : 'width',
      default : '100%',
      desc    : 'Anchura del componente'
    }, {
      name    : 'label::top',
      default : '-20px',
      desc    : 'Margen superior de la etiqueta'
    }, {
      name    : 'label::color',
      default : '$color-base-highlight-02',
      desc    : 'Color del label'
    }, {
      name    : 'border',
      default : '1px solid $color-surface-06',
      desc    : 'Borde del input'
    }, {
      name    : 'background',
      default : '32px',
      desc    : 'Altura del componente'
    }, {
      name    : 'height',
      default : '32px',
      desc    : 'Altura del componente'
    }, {
      name    : 'padding',
      default : '0 0 0 18px',
      desc    : 'Padding interno'
    }, {
      name    : 'icon::size',
      default : '16px',
      desc    : 'Tamaño del icono'
    }, {
      name    : 'icon::color',
      default : '$color-base-highlight-02',
      desc    : 'Color del icono'
    }, {
      name    : 'color',
      default : '$color-base-highlight-02',
      desc    : 'Color del texto del input'
    }, {
      name    : 'margin',
      default : '10px 0',
      desc    : 'Margen input field'
    }, {
      name    : 'help::margin-top',
      default : '10px',
      desc    : 'Margen superior del texto de ayuda'
    }, {
      name    : 'help::color',
      default : '$color-base-highlight-02',
      desc    : 'Color del texto de ayuda'
    }
  ],
  notes : undefined
};
