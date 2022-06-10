// DEMO META DATA
export default {
  titleName            : 'Split Pane',
  nameJS               : 'DlUiSplitPane',
  type                 : 'atom',
  nameScssMixin        : '',
  nameScssDefaultClass : '',
  nameScssMixinFile    : '',
  description          : `Se trata de un componente atómico que sirve para encapsular la información de visualización de un panel dentro del componente <span class="demo__md--syntax">dl-ui-split-panes</span>`,
  // Could we deduce/extract the slots from the html code?
  slots                : [
    {
      name  : 'default',
      usage : 'Contenido del panel'
    }
  ],
  // Could we deduce/extract the events from the component code?
  events : [],
  scss   : [
    {
      name    : 'background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo del panel'
    },
    {
      name    : 'header::background',
      default : '$color-surface-03',
      desc    : 'Color de fondo de la cabecera del panel'
    },
    {
      name    : 'header::color',
      default : '$color-base-03k',
      desc    : 'Color del texto de la cabecera'
    },
    {
      name    : 'header::border-radius',
      default : '3px 3px 0 0',
      desc    : 'Configuración  de radio del borde de la cabecera'
    },
    {
      name    : 'header::height',
      default : '24px',
      desc    : 'Altura de la cabecera'
    }
  ],
  notes : `Se trata de un componente que no es configurable, se limita a utilizarse para englobar el contenido de un panel y poder manejear  su 
    configuración dentro del componente pestañas dl-ui-split-panes`
};
