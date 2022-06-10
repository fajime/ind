// DEMO META DATA
export default {
  titleName            : 'Button',
  nameJS               : 'DlUiButton',
  type                 : 'atom',
  nameScssMixin        : 'button-style-config',
  nameScssDefaultClass : 'dl-ui-button',
  nameScssMixinFile    : 'button',
  description          : `<p>Los botones permiten a los usuarios ejecutar acciones, y tomar decisiones, con un simple toque. Este componente implementa un botón básico.</p>
    <p>Permite la definición de diferentes estados (hover, active, disabled) además de una personalización completa. El botón contiene un efecto de transción cuando cambia alguna propiedad.</p>
    <p>Dentro del componente existe un slot para que el desarrallador pueda personalizar el contenido.</p>
    <p>   Algunos atributos comunes de un botón son: class (para darle estilo), id (identificador), value (que le asigna un valor inicial que será enviado con el formulario)</p>
    <p>Los botones comunican acciones que los usuarios pueden realizar. Usualmente están ubicados dentro de tu interfaz, en lugares como:</p>
    <ul>
        <li>Diálogos</li>
        <li>Ventanas modal</li>
        <li>Formularios</li>
        <li>Tarjetas</li>
        <li>Barras de herramientas</li>
    </ul>`,
  // Could we deduce/extract the slots from the html code?
  slots : [
    {
      name  : 'default',
      usage : 'Contenido interno del botón'
    }
  ],
  // Could we deduce/extract the events from the component code?
  events : [
    {
      name      : 'clicked',
      condition : 'Cuando el usuario pulsa sobre el botón',
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
      default : '32px',
      desc    : 'Altura del botón'
    },
    {
      name    : 'outline',
      default : '0',
      desc    : 'Borde outline'
    },
    {
      name    : 'padding',
      default : '0 24px',
      desc    : 'Propiedad <span class="demo__md--syntax">padding</span>  del contenido'
    },
    {
      name    : 'border-radius',
      default : '0',
      desc    : 'Propiedad <span class="demo__md--syntax">border-radius</span> del botón'
    },
    {
      name    : 'background',
      default : '$color-action-primary-default',
      desc    : 'Color de fondo del botón'
    },
    {
      name    : 'color',
      default : '$color-action-primary-contrast',
      desc    : 'Color principal del botón (texto, iconos, ...)'
    },
    {
      name    : 'box-shadow',
      default : 'none',
      desc    : 'Sombra a aplicar al botón'
    },
    {
      name    : 'hover::background',
      default : '$color-action-primary-hover',
      desc    : 'Color de fondo del botón en estado <span class="demo__md--syntax">hover</span>'
    },
    {
      name    : 'hover::color',
      default : '$color-action-primary-contrast',
      desc    : 'Color principal del botón en estado <span class="demo__md--syntax">hover</span>'
    },
    {
      name    : 'hover::border',
      default : '0',
      desc    : 'Borde del botón en estado <span class="demo__md--syntax">hover</span>'
    },
    {
      name    : 'active::background',
      default : '$color-action-primary-active',
      desc    : 'Color de fondo del botón en estado <span class="demo__md--syntax">hover</span>'
    },
    {
      name    : 'active::color',
      default : '$color-action-primary-contrast',
      desc    : 'Color activo del botón <span class="demo__md--syntax">active</span>'
    },
    {
      name    : 'active::border',
      default : '0',
      desc    : 'Borde del botón en estado activo <span class="demo__md--syntax">active</span>'
    },
    {
      name    : 'loading::background',
      default : '$color-action-primary-active',
      desc    : 'Color de fondo del botón en estado <span class="demo__md--syntax">loading</span>'
    },
    {
      name    : 'loading::color',
      default : '$color-action-primary-contrast',
      desc    : 'Color principal del botón en estado recargando (loading) <span class="demo__md--syntax">loading</span>'
    },
    {
      name    : 'loading::border',
      default : '0',
      desc    : 'Borde del botón en estado de recarga <span class="demo__md--syntax">loading</span>'
    },
    {
      name    : 'focus::background',
      default : '$color-action-primary-default',
      desc    : 'Color de fondo del botón en estado focus<span class="demo__md--syntax">focus</span>'
    },
    {
      name    : 'focus::color',
      default : '$color-action-primary-contrast',
      desc    : 'Color principal del botón en estado focus <span class="demo__md--syntax">focus</span>'
    },
    {
      name    : 'focus::border',
      default : '0',
      desc    : 'Borde del botón en estado <span class="demo__md--syntax">focus</span>'
    },
    {
      name    : 'disabled::background',
      default : '$color-action-primary-disabled',
      desc    : 'Color de fondo en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'disabled::color',
      default : '$color-action-primary-contrast',
      desc    : 'Color principal en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'disabled::border',
      default : '0',
      desc    : 'Borde del botón en estado <span class="demo__md--syntax">disable</span>'
    },
    {
      name    : 'text::margin',
      default : '16px',
      desc    : 'Margen alrededor del texto'
    },
    {
      name    : 'icon::size',
      default : '16px',
      desc    : 'Tamaño del icono'
    },
    {
      name    : 'icon::margin',
      default : '0 8px',
      desc    : 'Margen alrededor del icono'
    }
  ],
  notes : undefined
};
