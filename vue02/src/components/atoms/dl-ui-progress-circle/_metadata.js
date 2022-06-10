// DEMO META DATA
export default {
  titleName            : 'Progress circle',
  nameJS               : 'DlUiProgressCircle',
  type                 : 'atom',
  nameScssMixin        : 'progress-circle-style-config',
  nameScssDefaultClass : 'dl-ui-progress-circle',
  nameScssMixinFile    : 'progress-circle',
  description          : `<p>El componente dl-ui-progress-circle, como el progress-bar, es un sencillo indicador de estado para cualquier tipo de proceso, pero de forma circular.</p>
    <p>Se puede conectar a cualquier variable porcentual para que se muestre automáticamente el progreso de alguna actividad.</p>
    <p>Con esta forma, es más utilizable en pantallas más cuadradas o con menos espacio.</p>  
    <p>El componente permite incorporar cualquier otro elemento HTML en su interior.</p>`,
  // Could we deduce/extract the slots from the html code?
  slots : [
    {
      name  : 'default',
      usage : 'Contenido interno de la barra de progreso circular'
    }
  ],
  // Could we deduce/extract the events from the component code?
  events : [],
  scss   : [
    {
      name    : 'size',
      default : '80px',
      desc    : 'Tamaño cuadrado de la barra circular'
    },
    {
      name    : 'transition-duration',
      default : '0.5s',
      desc    : 'Tiempo que dura la amimación del movimientos'
    },
    {
      name    : 'fill::color',
      default : 'none',
      desc    : 'Color de relleno del interior de la circunferencia'
    },
    {
      name    : 'background::color',
      default : '$color-surface-04',
      desc    : 'Color de la barra de fondo'
    },
    {
      name    : 'background::bar::width',
      default : '6px',
      desc    : 'Ancho de la barra de fondo'
    },
    {
      name    : 'bar::color',
      default : '$color-emphasis-03k',
      desc    : 'Color de la barra principal'
    },
    {
      name    : 'bar::width',
      default : '6px',
      desc    : 'Ancho de la barra principal'
    },
    {
      name    : 'content::display',
      default : 'block',
      desc    : 'Tipo de <span class="demo__md--syntax">display</span> para el contenido del slot'
    }
  ],
  notes : undefined
};
