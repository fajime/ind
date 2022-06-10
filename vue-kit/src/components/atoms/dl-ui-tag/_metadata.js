// DEMO META DATA
export default {
  titleName            : 'Tag',
  nameJS               : 'DlUiTag',
  type                 : 'atom',
  nameScssMixin        : 'tag2-style-config',
  nameScssDefaultClass : 'dl-ui-tag',
  nameScssMixinFile    : 'tag',
  description          : `<p>Este componente se utiliza para transmitir pequeños fragmentos de información. 
                            Usando la propiedad <span class="demo__md--syntax">selectable</span>, el tag se vuelve interactivo, 
                            lo que permite la interacción del usuario. Además tambien se permite mostrar o no el botón de cierre.</p>
                            <p>Este componente es empleado para generar opciones de selección avanzadas. 
                            Se trata de una pequeña etiqueta que se utiliza para catalogar la información.</p>`,
  slots  : [],
  events : [
    {
      name      : 'tag-selected',
      condition : 'Cuando el usuario pulsa sobre la tag',
      payload   : 'Objeto que contiene todos los valores guardados en la tag'
    },
    {
      name      : 'tag-close',
      condition :
          'Cuando el usuario pulsa sobre el icono X del tag para eliminar el componente',
      payload : 'Objeto que contiene todos los valores guardados en la tag'
    }
  ],
  scss : [
    {
      name    : 'height',
      default : '18px',
      desc    : 'Altura del componentet'
    },
    {
      name    : 'padding',
      default : '2px 8px',
      desc    : 'Padding del contenido del componente'
    },
    {
      name    : 'border',
      default : 'none',
      desc    : 'Formato del borde'
    },
    {
      name    : 'border-radius',
      default : '13px',
      desc    : 'Radio del borde del componente'
    },
    {
      name    : 'background',
      default : '$color-emphasis-01',
      desc    : 'Color de fondo del componente'
    },
    {
      name    : 'text::color',
      default : '$color-emphasis-03k',
      desc    : 'Color del texto del componente'
    },
    {
      name    : 'closeButton::height',
      default : '24px',
      desc    : 'Tamaño del componente cuando el botón de cerrar está activo'
    },
    {
      name    : 'icon::size',
      default : '12px',
      desc    : 'Tamaño del icono del contenido'
    },
    {
      name    : 'icon::color',
      default : ' $color-base-03k',
      desc    : 'Color del icono del contenido'
    },
    {
      name    : 'icon::margin-right',
      default : '12px',
      desc    : 'Margen derecho sobre icono del contenido'
    },
    {
      name    : 'close::size',
      default : '12px',
      desc    : 'Tamaño del icono de cerrar'
    },
    {
      name    : 'close::color',
      default : ' $color-base-03k',
      desc    : 'Color del icono de cerrar'
    },
    {
      name    : 'close::margin-left',
      default : '12px',
      desc    : 'Margen izquierdo sobre icono de cerrar'
    },

    {
      name    : 'text::color',
      default : ' $color-base-03k',
      desc    : 'Color del texto de la etiqueta'
    },
    {
      name    : 'text::padding',
      default : '4px',
      desc    : 'Padding del texto respecto al contenido de los laterales'
    }
  ],
  notes : undefined
  // END META DATA
};
