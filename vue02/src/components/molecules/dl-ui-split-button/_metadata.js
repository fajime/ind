// DEMO META DATA
export default {
  titleName            : 'Split button',
  nameJS               : 'DlUiSplitButton',
  type                 : 'atom',
  nameScssMixin        : 'split-button-style-config',
  nameScssDefaultClass : 'dl-ui-split-button',
  nameScssMixinFile    : 'split-button',
  description          : `<p>Los split-buttons permiten a los usuarios ejecutar acciones, y tomar decisiones, con un simple toque. Este componente implementa un botón básico.</p>
    <p>Permite la definición de diferentes estados (hover, active, disabled) además de una personalización completa. El botón contiene un efecto de transción cuando cambia alguna propiedad.</p>
    <p>Dentro del componente existe un slot para que el desarrollador pueda personalizar el contenido.</p>
    <p>Los split-buttons comunican acciones que los usuarios pueden realizar. Usualmente están ubicados dentro de tu interfaz, en lugares como:</p>
    <ul>
        <li>Diálogos</li>
        <li>Ventanas modal</li>
        <li>Formularios</li>
        <li>Tarjetas</li>
        <li>Barras de herramientas</li>
    </ul>`,
  // Could we deduce/extract the events from the component code?
  events : [
    {
      name      : 'clicked',
      condition : 'Cuando el usuario pulsa sobre el botón',
      payload   :
          'Evento nativo de click. <a href="https://developer.mozilla.org/es/docs/Web/API/Element/click_event">Ver más</a>'
    },
    {
      name      : 'input',
      condition : 'Cuando el usuario pulsa sobre una opcion del listbox',
      payload   :
          'Evento nativo de click. <a href="https://developer.mozilla.org/es/docs/Web/API/Element/click_event">Ver más</a>'
    }
  ],
  scss : [
    {
      name    : 'display',
      default : 'flex',
      desc    : 'Propiedad <span class="demo__md--syntax">display</span> del contenido del botón'
    },
    {
      name    : 'height',
      default : '3rem',
      desc    : 'Altura del botón'
    },
    {
      name    : 'outline',
      default : '0',
      desc    : 'Borde outline'
    },
    {
      name    : 'padding',
      default : '0',
      desc    : 'Propiedad <span class="demo__md--syntax">padding</span>  del contenido'
    },
    {
      name    : 'border',
      default : '4px solid $color-action-secondary-default',
      desc    : 'Borde del botón'
    },
    {
      name    : 'border-radius',
      default : '0',
      desc    : 'Propiedad <span class="demo__md--syntax">border-radius</span> del botón'
    },
    {
      name    : 'background',
      default : ': $color-action-secondary-contrast',
      desc    : 'Color de fondo del botón'
    },
    {
      name    : 'color',
      default : '$dl-ui-bue-amazon',
      desc    : 'Color principal del botón (texto, iconos, ...)'
    },
    {
      name    : 'box-shadow',
      default : 'none',
      desc    : 'Sombra a aplicar al botón'
    },
    {
      name    : 'hover::background',
      default : '$color-action-secondary-default',
      desc    : 'Color de fondo del botón en estado <span class="demo__md--syntax">hover</span>'
    },
    {
      name    : 'hover::border',
      default : '4px solid $color-action-secondary-default',
      desc    : 'Borde del botón en estado <span class="demo__md--syntax">hover</span>'
    },
    {
      name    : 'hover::color',
      default : '#004254',
      desc    : 'Color principal del botón en estado <span class="demo__md--syntax">hover</span>'
    },
    {
      name    : 'active::background',
      default : 'transparentize(#03657c, 0.3)',
      desc    : 'Color de fondo del botón en estado <span class="demo__md--syntax">hover</span>'
    },
    {
      name    : 'active::border',
      default : '0',
      desc    : 'Borde del botón en estado <span class="demo__md--syntax">active</span>'
    },
    {
      name    : 'active::color',
      default : '#03657c',
      desc    : 'Color principal del botón en estado <span class="demo__md--syntax">active</span>'
    },
    {
      name    : 'disable::opacity',
      default : '0.5',
      desc    : 'Opacidad del botón en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'disable::background',
      default : 'transparentize(#ffffff, 0.3)',
      desc    : 'Color de fondo en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'disable::border',
      default : '4px solid $color-action-secondary-default',
      desc    : 'Borde del botón en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'disable::color',
      default : '$color-action-secondary-default',
      desc    : 'Color principal en estado <span class="demo__md--syntax">disabled</span>'
    }
  ],
  notes : undefined
};
