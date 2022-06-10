// DEMO META DATA
export default {
  titleName            : 'Switch',
  nameJS               : 'DlUiSwitch',
  type                 : 'atom',
  nameScssMixin        : 'switch-style-config',
  nameScssDefaultClass : 'dl-ui-switch',
  nameScssMixinFile    : 'switch',
  description          : `<p>Este componente permite al usuario seleccionar entre "encender" o "apagar" una propiedad.</p>
    <p>Un elemento que nos proporciona 2 estados: encendido/apagado, abierto/cerrado</p>
    <p>Dos atributos importantes de este elemento son el disabled y el checked (cuando la opción ya fue cliqueada)</p>
    `,
  // slot vacío
  slots  : [],
  // Events with names, conditions and desc
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
      default : '32px',
      desc    : 'Anchura del componente'
    },
    {
      name    : 'height',
      default : '16px',
      desc    : 'Altura del componente'
    },
    {
      name    : 'background',
      default : '$color-surface-06',
      desc    : 'color de fondo'
    },
    {
      name    : 'label::color',
      default : '$color-base-03k',
      desc    : 'color del texto del label'
    },
    {
      name    : 'ball::margin',
      default : '2px',
      desc    : 'Margen entre el borde del componente y la bola interna'
    },
    {
      name    : 'ball::color',
      default : '$color-surface-01k',
      desc    : 'Color de la bola'
    },
    {
      name    : 'active::label::color',
      default : '$color-base-03k',
      desc    : 'color del texto del label en estado <span class="demo__md--syntax">activo</span>'
    },
    {
      name    : 'active::background',
      default : '$color-emphasis-03k',
      desc    : 'color de fondo en estado <span class="demo__md--syntax">activo</span>'
    },
    {
      name    : 'active::hover::background',
      default : '$color-emphasis-04',
      desc    : 'color de fondo en estado <span class="demo__md--syntax">activo</span>'
    },
    {
      name    : 'active::ball::color',
      default : '$color-surface-01k',
      desc    : 'color de la bola en estado <span class="demo__md--syntax">activo</span>'
    },
    {
      name    : 'hover::background',
      default : '$color-base-highlight-02',
      desc    : 'color de fondo en estado <span class="demo__md--syntax">hover</span>'
    },
    {
      name    : 'disabled::label::color',
      default : '$color-base-01',
      desc    : 'color del texto del label en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'disabled::background',
      default : '$color-action-primary-disabled',
      desc    : 'color de fondo en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'disabled::ball::color',
      default : '$color-surface-04',
      desc    : 'color de la bola en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'disabled::active::label::color',
      default : '$color-action-primary-disabled',
      desc    : 'color del texto del label en estado <span class="demo__md--syntax">disabled</span> y <span class="demo__md--syntax">active</span>'
    },
    {
      name    : 'disabled::active::background',
      default : '$color-action-primary-disabled',
      desc    : 'color de fondo en estado <span class="demo__md--syntax">disabled</span> y <span class="demo__md--syntax">active</span>'
    },
    {
      name    : 'disabled::active::ball::color',
      default : '$color-surface-04',
      desc    : 'color de la bola en estado <span class="demo__md--syntax">disabled</span> y <span class="demo__md--syntax">active</span>'
    }
  ],
  notes : undefined
};
