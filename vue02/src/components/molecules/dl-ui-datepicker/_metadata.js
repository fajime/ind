export default {
  // DEMO META DATA
  titleName            : 'Datepicker',
  nameJS               : 'DlUiDatepicker',
  type                 : 'molecule',
  nameScssMixin        : 'datepicker-style-config',
  nameScssDefaultClass : 'dl-ui-datepicker',
  nameScssMixinFile    : 'datepicker',
  description          : `<p>El componente datepicker permite seleccionar una fecha mediante un interfaz moderno de tipo calendario que enmascara la fecha seleccionada con el formato dd/mm/yyyy.</p>`,
  // Could we deduce/extract the slots from the html code?
  slots                : [],
  events               : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario selecciona una fecha',
      payload   : 'Fecha seleccionada en formato text'
    },
    {
      name      : 'selected',
      condition : 'Cuando el usuario selecciona una fecha',
      payload   : 'Fecha seleccionada como objeto fecha'
    }
  ],
  scss : [
    {
      name    : 'overlay::background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo a aplicar a la tarjeta'
    },
    {
      name    : 'overlay::width',
      default : '296px',
      desc    : 'Ancho del overlay'
    },
    {
      name    : 'overlay::border',
      default : '$color-emphasis-02',
      desc    : 'Borde del overlay'
    },
    {
      name    : 'overlay::border-radius',
      default : '3px',
      desc    : 'Radio del borde del overlay'
    },
    {
      name    : 'overlay::header::margin',
      default : '0 8px',
      desc    : 'Margen de la cabecera del overlay'
    },
    {
      name    : 'overlay::header::padding',
      default : '16px 8px',
      desc    : 'Padding de la cabecera del overlay'
    },
    {
      name    : 'overlay::header::border-bottom',
      default : '1px solid $color-emphasis-02',
      desc    : 'Borde inferior de la cabecera del overlay'
    },
    {
      name    : 'overlay::header::color',
      default : '$color-emphasis-03k',
      desc    : 'Color de texto de la cebecera del overlay'
    },
    {
      name    : 'overlay::body::margin',
      default : '8px',
      desc    : 'Margen del cuerpo del overlay'
    },
    {
      name    : 'overlay::body::padding',
      default : '0',
      desc    : 'Padding del cuerpo del overlay'
    },
    {
      name    : 'overlay::footer::margin',
      default : '8px',
      desc    : 'Margen del pie del overlay'
    },
    {
      name    : 'overlay::footer::padding',
      default : '0',
      desc    : 'Margen del pie del overlay'
    },
    {
      name    : 'overlay::footer::color',
      default : '$color-emphasis-05',
      desc    : 'Color de texto del pie del overlay'
    },
    {
      name    : 'navigation::icons::size',
      default : '16px',
      desc    : 'Tamaño del icono de navegación entre fechas'
    },
    {
      name    : 'item::today::background',
      default : '$color-surface-04',
      desc    : 'Color de fondo del item que representa el día actual'
    },
    {
      name    : 'item::today::color',
      default : '$color-base-03k',
      desc    : 'Color de texto del item que representa el día actual'
    },
    {
      name    : 'item::hover::background',
      default : ' $color-surface-04',
      desc    : 'Color de fondo de un item en hover'
    },
    {
      name    : 'item::hover::color',
      default : '$color-action-tertiary-default',
      desc    : 'Color de texto de un item en hover'
    },
    {
      name    : 'item::active::background',
      default : '$color-emphasis-03k',
      desc    : 'Color de fondo de un item activo'
    },
    {
      name    : 'item::active::color',
      default : '$color-surface-01k',
      desc    : 'Color de texto de un item activo'
    },
    {
      name    : 'item::active::hover::background',
      default : '$color-emphasis-01',
      desc    : 'Color de fondo de un item activo en hover'
    },
    {
      name    : 'item::active::hover::color',
      default : '$color-emphasis-05',
      desc    : 'Color de texto de un item activo en hover'
    },
    {
      name    : 'item::disabled::color',
      default : '$color-base-02',
      desc    : 'Color de texto de un item deshabilitado'
    }
  ],
  notes : undefined
};
