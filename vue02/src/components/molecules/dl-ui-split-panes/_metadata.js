// DEMO META DATA
export default {
  titleName            : 'Split Panes',
  nameJS               : 'DlUiSplitPanes',
  type                 : 'molecule',
  nameScssMixin        : 'split-panes-style-config',
  nameScssDefaultClass : 'dl-ui-split-panes',
  nameScssMixinFile    : 'split-panes',
  description          : `<p>Se trata de un componente de navegación que muestra paneles que se pueden redimensionar por el usuario. El componente permite mostrar y
                            combinar diferentes paneles, representados por el componente <span class="demo__md--syntax">dl-ui-split-pane</span></p>
                            <p>Este componente, permite tambien, ser alojado dentro de un panel de <span class="demo__md--syntax">dl-ui-split-pane</span> para generar 
                            diferentes composiciones, pudiendo generar composiciones verticales y horizontales según se desee.</p>`,
  // Could we deduce/extract the slots from the html code?
  slots : [
    {
      name  : 'default',
      usage :
          'Contenido a mostrar agrupado den componentes <span class="demo__md--syntax">dl-ui-split-pane</span>'
    }
  ],
  // Could we deduce/extract the events from the component code?
  events : [
    {
      name      : 'resized',
      condition : 'Cuando el usuario redimensiona un panel',
      payload   : 'Configuración de tamaños de los paneles'
    },
    {
      name      : 'pane-maximize',
      condition : 'Cuando el usuario maximiza un panel',
      payload   : 'Configuración del panel maximizado'
    }
  ],
  scss : [
    {
      name    : 'splitter::background',
      default : 'transparent',
      desc    : 'Color de fondo del separador'
    },
    {
      name    : 'splitter::color',
      default : '$color-action-primary-default',
      desc    : 'Color del separador'
    },
    {
      name    : 'splitter::hover::color',
      default : '$color-action-primary-hover',
      desc    : 'Color del separador al pasar el puntero'
    },
    {
      name    : 'splitter::margin',
      default : '-1px',
      desc    : 'Margen del separador'
    },
    {
      name    : 'splitter::width',
      default : '24px',
      desc    : 'Ancho del separador'
    },
    {
      name    : 'splitter::height',
      default : '2px',
      desc    : 'Altura del separador'
    },
    {
      name    : 'splitter::gutter',
      default : '8px',
      desc    : 'Tamaño del separador de paneles'
    }
  ],
  notes : undefined
};
