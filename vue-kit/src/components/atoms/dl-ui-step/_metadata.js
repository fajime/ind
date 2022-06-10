// DEMO META DATA
export default {
  titleName            : 'Step',
  nameJS               : 'DlUiStep',
  type                 : 'atom',
  nameScssMixin        : '',
  nameScssDefaultClass : '',
  nameScssMixinFile    : '',
  description          : `Se trata de un componente atómico que sirve para encapsular la información de visualización de un step dentro del componente <span class="demo__md--syntax">dl-ui-stepper</span>`,
  // Could we deduce/extract the slots from the html code?
  slots                : [],
  events               : [
    {
      name      : 'clicked',
      condition : 'Cuando el usuario pulsa sobre el step',
      payload   : 'Valor del index'
    }
  ],

  scss : [
    {
      name    : 'size',
      default : '42px',
      desc    : 'Tamaño del componente en px'
    },
    {
      name    : 'marker::background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo'
    },
    {
      name    : 'marker::border',
      default : 'solid  $color-surface-06 2px',
      desc    : 'Borde del componente'
    },
    {
      name    : 'marker::stroke-width',
      default : '5',
      desc    : 'borde icono modo "dot"'
    },
    {
      name    : 'marker::color',
      default : '$color-surface-contrast',
      desc    : 'Color texto e icono'
    },
    {
      name    : 'marker::complete::background',
      default : '$color-surface-contrast',
      desc    : 'Color de fondo en estado completado'
    },
    {
      name    : 'marker::complete::color',
      default : '$color-emphasis-01',
      desc    : 'Color texto e icono en estado completado'
    },
    {
      name    : 'marker::disabled::color',
      default : '$color-surface-05',
      desc    : 'Color texto e icono en estado disabled'
    },
    {
      name    : 'marker::disabled::border::color',
      default : '$color-surface-05',
      desc    : 'Color del borde en estado disabled'
    },
    {
      name    : 'label::color',
      default : '$color-base-03k',
      desc    : 'Color de la etiqueta inferior'
    },
    {
      name    : 'label::disabled::color',
      default : '$color-base-01',
      desc    : 'Color de la etiqueta inferior en estado disabled'
    },
    {
      name    : 'marker::current::background',
      default : '$color-emphasis-01',
      desc    : 'Color de fondo si seleccionado'
    },
    {
      name    : 'marker::current::border::color',
      default : '$color-emphasis-03k ',
      desc    : 'Color de borde si seleccionado'
    },
    {
      name    : 'marker::current::color',
      default : '$color-emphasis-05',
      desc    : 'Color del texto e icono si seleccionado'
    },
    {
      name    : 'marker::focus::color',
      default : '$color-surface-contrast',
      desc    : 'Color del texto e icono con el foco'
    }

  ],
  notes : `Este componente se limita a utilizarse para englobar el contenido de una pestaña y poder manjear  su 
    configuración dentro del componente pestañas <span class="demo__md--syntax">dl-ui-stepper</span>`
  // END META DATA
};
