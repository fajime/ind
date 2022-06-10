// DEMO META DATA
export default {
  titleName            : 'Toggle Button',
  nameJS               : 'DlUiToggleButton',
  type                 : 'atom',
  nameScssMixin        : 'toggle-button-style-config',
  nameScssDefaultClass : 'dl-ui-toggle-button',
  nameScssMixinFile    : 'toggle-button',
  description          : `<p>Este componente permite al usuario seleccionar entre "encender" o "apagar" una propiedad con un botón.</p>
    <p>Es un botón de alternancia que permite al usuario cambiar una configuración entre dos estados. Puede agregar uno de alternancia básico a su diseño y también presenta otro tipo de alternancia llamada interruptor, que proporciona un control deslizante, que puede agregar con un objeto Switch.</p>
    `,
  // pasamos slot vacío
  slots  : [],
  // events with names, desc and conditions
  events : [
    {
      name      : 'update:modelValue',
      condition :
          'Cuando el usuario pulsa sobre el componente o se cambia desde una propiedad externa',
      payload : 'Valor booleano que indica el nuevo estado'
    }
  ],
  scss : [
    {
      name    : 'width',
      default : '3.5rem',
      desc    : 'Anchura del componente'
    },
    {
      name    : 'height',
      default : '2rem',
      desc    : 'Altura del componente'
    },
    {
      name    : 'background',
      default : '$color-action-tertiary-hover',
      desc    : 'color de fondo'
    },
    {
      name    : 'ball::margin',
      default : '0.25rem',
      desc    : 'Margen entre el borde del componente y la bola interna'
    },
    {
      name    : 'ball::color',
      default : '$color-action-tertiary-default',
      desc    : 'Color de la bola'
    },
    {
      name    : 'active::background',
      default : '$color-action-primary-hover',
      desc    : 'color de fondo en estado <span class="demo__md--syntax">activo</span>'
    },
    {
      name    : 'active::ball::color',
      default : '$color-action-tertiary-default',
      desc    : 'color de la bola en estado <span class="demo__md--syntax">activo</span>'
    },
    {
      name    : 'disable::opacity',
      default : '0.5',
      desc    : 'Opacidad del elemento cuando se encuentra desactivado'
    }
  ],
  notes : undefined
};
