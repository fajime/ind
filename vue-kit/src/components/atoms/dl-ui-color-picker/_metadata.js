// DEMO META DATA
export default {
  titleName            : 'Color Picker',
  nameJS               : 'DlUiColorPicker',
  type                 : 'atom',
  nameScssMixin        : 'color-picker-style-config',
  nameScssDefaultClass : 'dl-ui-color-picker',
  nameScssMixinFile    : 'color-picker',
  description          : `<p>Este componente se utiliza para seleccionar el color deseado. </p>`,
  slots                : [],
  events               : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario pulsa sobre la el panel de colores',
      payload   : 'Valor nuevo seleccionado'
    }
  ],
  scss : [
    {
      name    : 'height',
      default : '300px',
      desc    : 'Altura del componentet'
    },
    {
      name    : 'padding',
      default : '16px',
      desc    : 'Padding del contenido del componente'
    },
    {
      name    : 'background-color',
      default : '#323130',
      desc    : 'Color de fondo del componente'
    },
    {
      name    : 'border-radius',
      default : '4px',
      desc    : 'Radio del borde del componente'
    },
    {
      name    : 'range::height',
      default : '8px',
      desc    : 'Altura de los sliders'
    },
    {
      name    : 'range::border-radius',
      default : '4px',
      desc    : 'Radio del borde de los sliders'
    },
    {
      name    : 'thumb::height',
      default : '24px',
      desc    : 'Altura del selector del slider'
    },
    {
      name    : 'thumb::width',
      default : '12px',
      desc    : 'Ancho del selector del slider'
    },
    {
      name    : 'thumb::border',
      default : '3px solid #fff',
      desc    : 'Borde del selector del slider'
    },
    {
      name    : 'thumb::border-radius',
      default : '8px',
      desc    : 'Radio del borde del selector del slider'
    },
    {
      name    : 'container::max-width',
      default : '24px',
      desc    : 'Tamaño maximo del contenedor del slider'
    },
    {
      name    : 'selected-box::size',
      default : '24px',
      desc    : 'Tamaño del cuadro de color seleccionado'
    },
    {
      name    : 'selected-box::border-radius',
      default : '4.57px',
      desc    : 'Borde del cuadro de color seleccionado'
    }
  ],
  notes : undefined
  // END META DATA
};
