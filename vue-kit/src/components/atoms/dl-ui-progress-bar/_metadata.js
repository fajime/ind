// DEMO META DATA
export default {
  titleName            : 'Progress bar',
  nameJS               : 'DlUiProgressBar',
  type                 : 'atom',
  nameScssMixin        : 'progress-bar-style-config',
  nameScssDefaultClass : 'dl-ui-progress-bar',
  nameScssMixinFile    : 'progress-bar',
  description          : `<p>El componente dl-ui-progress-bar es un sencillo indicador de estado para cualquier tipo de proceso.</p>
    <p>Se puede conectar a cualquier variable porcentual para que se muestre automáticamente el progreso de alguna actividad.</p>`,
  // Could we deduce/extract the slots from the html code?
  slots  : [],
  // Could we deduce/extract the events from the component code?
  events : [],
  scss   : [
    {
      name    : 'height',
      default : '4px',
      desc    : 'Altura de la barra'
    },
    {
      name    : 'background::color',
      default : '$color-surface-04',
      desc    : 'Color del fondo de la barra'
    },
    {
      name    : 'background::border-radius',
      default : '3px',
      desc    : 'Radio del borde del fondo de la barra'
    },
    {
      name    : 'bar::color',
      default : '$color-emphasis-03k',
      desc    : 'Color de la barra'
    },
    {
      name    : 'bar::border-radius',
      default : '3px',
      desc    : 'Radio del borde de la barra'
    },
    {
      name    : 'transition-duration',
      default : '0.5s',
      desc    : 'Tiempo que dura la transición'
    },
    {
      name    : 'transition-delay',
      default : '0s',
      desc    : 'Tiempo de espera para el inicio de la transición'
    }
  ],
  notes : undefined
  // END META DATA
};
