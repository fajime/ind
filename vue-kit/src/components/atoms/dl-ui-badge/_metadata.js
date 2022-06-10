// DEMO META DATA
export default {
  titleName            : 'Badge',
  nameJS               : 'DlUiBadge',
  type                 : 'atom',
  nameScssMixin        : 'badge-style-config',
  nameScssDefaultClass : 'dl-ui-badge',
  nameScssMixinFile    : 'badge',
  description          : `<p>Badge es un pequeño indicador de estado para otro elemento.</p>`,
  slots                : [],
  events               : [
  ],
  scss : [
    {
      name    : 'border',
      default : 'none',
      desc    : 'Borde del badge'
    },
    {
      name    : 'padding',
      default : '0 3px',
      desc    : 'Padding del contenido del componente'
    },
    {
      name    : 'line-height',
      default : '10px',
      desc    : 'Altura del párrafo del texto'
    },
    {
      name    : 'color',
      default : '$color-surface-01k',
      desc    : 'Color del texto'
    },
    {
      name    : 'font-weight',
      default : 'normal',
      desc    : 'Peso de la fuente del texto'
    },
    {
      name    : 'border-radius',
      default : '2px',
      desc    : 'Radio de curvatura de los bordes'
    },
    {
      name    : 'font-size',
      default : '10px',
      desc    : 'Tamaño de la fuente'
    },
    {
      name    : 'width',
      default : '11px',
      desc    : 'Altura del componente'
    },
    {
      name    : 'height',
      default : '12px',
      desc    : 'Altura del componente'
    },
    {
      name    : 'point::width',
      default : '7px',
      desc    : 'Ancho del componente con forma de "punto"'
    },
    {
      name    : 'point::height',
      default : '7px',
      desc    : 'Alto del componente con forma de "punto"'
    }
  ],
  notes : 'Existen 2 manera de utilizar, como indicador de un componente (así como un Avatar o un Icono) o bien como un componente inline, por ej. dentro de un botón. En el caso de utilizar como indicador se debe poner el otro componente dentro (pasado como un slot, slot-default). En caso de utilizar el parámetro position: { angle }, el badge se va a posicionar desde el centro con radio de la mitad del ancho del componente y girando en el ángulo pasado como parámetro.'
  // END META DATA
};
