// DEMO META DATA
export default {
  titleName            : 'Range',
  nameJS               : 'DlUiRange',
  type                 : 'atom',
  nameScssMixin        : 'range-style-config',
  nameScssDefaultClass : 'dl-ui-range',
  nameScssMixinFile    : 'range',
  description          : `Este componente permite al usuario introducir un valor númerico con un movimiento. Aporta una mejor visualiación de un valor numérico cuando este
    esta acotado en un rango. Este tipo de componente refleja un rango de valores a lo largo de una barra, de los cuales el usuario puede seleccionar un solo valor. 
    Son ideales para ajustar configuraciones como volumen, brillo o aplicar filtros de imagen.`,
  // Could we deduce/extract the slots from the html code?
  slots  : [],
  // Could we deduce/extract the events from the component code?
  events : [
    {
      name      : 'update:modelValue',
      condition :
          'Cuando el usuario pulsa sobre el componente o se cambia desde una propiedad externa',
      payload : 'Valor establecido'
    }
  ],
  scss : [
    {
      name    : 'track::background',
      default : '$color-surface-04',
      desc    : 'Color del fondo la barra posterior'
    },
    {
      name    : 'track::color',
      default : '$color-emphasis-03k',
      desc    : 'Color de la parte rellena de la barra posterior'
    },
    {
      name    : 'track::height',
      default : '4px',
      desc    : 'Altura de la barra posterior'
    },
    {
      name    : 'track::border-width',
      default : '0',
      desc    : 'Anchura del borde la barra posterior'
    },
    {
      name    : 'track::border-color',
      default : 'transparent',
      desc    : 'Color del borde la barra posterior'
    },
    {
      name    : 'thumb::background',
      default : '$color-surface-01k',
      desc    : 'color del fondo del objeto indicador'
    },
    {
      name    : 'thumb::radius',
      default : '8px',
      desc    : 'radio del borde del objeto indicador'
    },
    {
      name    : 'thumb::size',
      default : '16px',
      desc    : 'Ancho y alto del indicador'
    },
    {
      name    : 'thumb::border-width',
      default : '0',
      desc    : 'Anchura del borde del objeto indicador'
    },
    {
      name    : 'thumb::border-color',
      default : '$color-emphasis-03k',
      desc    : 'Color del borde del objeto indicador'
    },
    {
      name    : 'disable::opacity',
      default : '1',
      desc    : 'Opacidad del elemento cuando se encuentra desactivado'
    },
    {
      name    : 'disable::track::color',
      default : '$color-surface-06',
      desc    : 'Color de la parte rellena barra posterior en estado deshabilitado'
    },
    {
      name    : 'disable::track::background',
      default : '$color-surface-04',
      desc    : 'Color del fondo la barra posterior en estado deshabilitado'
    },
    {
      name    : 'disable::track::border-color',
      default : 'transparent',
      desc    : 'Color del borde la barra posterior cuando se encuentra desactivado'
    },
    {
      name    : 'disable::thumb::background',
      default : '$color-surface-03',
      desc    : 'Color del fondo del objeto indicador en estado deshabilitado'
    },
    {
      name    : 'disable::thumb::border-color',
      default : 'transparent',
      desc    : 'Color del borde del objeto indicador cuando se encuentra desactivado'
    }
  ],
  notes : undefined
};
