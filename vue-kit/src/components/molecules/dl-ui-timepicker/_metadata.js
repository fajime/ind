export default {
  // DEMO META DATA
  titleName            : 'Timepicker',
  nameJS               : 'DlUiTimepicker',
  type                 : 'molecule',
  nameScssMixin        : 'timepicker-style-config',
  nameScssDefaultClass : 'dl-ui-timepicker',
  nameScssMixinFile    : 'timepicker',
  description          : `<p>El componente timepicker permite seleccionar un tiempo mediante un interfaz moderno con el formato hh:mm.</p>`,
  // Could we deduce/extract the slots from the html code?
  slots                : [],
  events               : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario selecciona un tiempo',
      payload   : 'Fecha seleccionada en formato text'
    },
    {
      name      : 'selected',
      condition : 'Cuando el usuario selecciona un tiempo ',
      payload   : 'Tiempo seleccionada como objeto tiempo'
    }
  ],
  scss : [
    {
      name    : 'box::background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo a aplicar a la tarjeta'
    },
    {
      name    : 'box::width',
      default : '400px',
      desc    : 'Ancho de la tarjeta'
    },
    {
      name    : 'box::height',
      default : '400px',
      desc    : 'Ancho de la tarjeta'
    },
    {
      name    : 'box::border',
      default : '$color-action-primary-focus',
      desc    : 'Borde de la tarjeta'
    },
    {
      name    : 'box::border-radius',
      default : '3px',
      desc    : 'Radio del borde de la tarjeta'
    },

    {
      name    : 'box::horas::color',
      default : '$color-type-link',
      desc    : 'Color de texto de la terjeta'
    },
    {
      name    : 'box::horas::font-size',
      default : '$h4-font-size',
      desc    : 'Font-size de texto de la tarjeta'
    },
    {
      name    : 'box::horas::font-weight',
      default : '$h4-font-weight',
      desc    : 'Font-weight de texto de la tarjeta'
    }

  ],
  notes : undefined
};
