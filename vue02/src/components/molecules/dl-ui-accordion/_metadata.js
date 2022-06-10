// DEMO META DATA
export default {
  titleName            : 'Accordion',
  nameJS               : 'DlUiAccordion',
  type                 : 'molecule',
  nameScssMixin        : 'accordion-style-config',
  nameScssDefaultClass : 'dl-ui-accordion',
  nameScssMixinFile    : 'accordion',
  description          : `<p>El componente acordeón es útil para reducir el espacio vertical cuando existen grandes cantidades de información.</p><br>
    <p> Este componente dispondrá en su cabecera de un icono opcional personalizable, un título, y una descripción tambien opcional.</p>
    <p> La cabecera permite la opción de anular las interacciones sobre ella misma.</p><br>
    <p> Dentro del componente existe un slot para que el desarrollador pueda personalizar el contenido`,
  slots : [
    {
      name  : 'content',
      usage : 'Contenido del cuerpo'
    }
  ],
  // Could we deduce/extract the events from the component code?
  events : [
    {
      name      : 'toggle',
      condition :
          'Cuando el usuario pulsa sobre la cabecera o cambia el valor externamente de show',
      payload :
          'Id del elemento pulsado y nuevo valor del estado del accordeon. <span class="demo__md--syntax">{ id : this.id, value : newValue }</span>'
    },
    {
      name      : 'update:show',
      condition : 'Cuando cambia el input v-model show',
      payload   : 'Idem toggle'
    }
  ],
  scss : [
    {
      name    : 'header::background',
      default : '$color-surface-03',
      desc    : 'Color de fondo de la cabecera'
    },
    {
      name    : 'border',
      default : '1px solid $color-surface-06',
      desc    : 'Propiedad border del contenedor'
    },
    {
      name    : 'border-radius',
      default : '4px',
      desc    : 'Propiedad del borde del contenedor'
    },
    {
      name    : 'header::height',
      default : '100%',
      desc    : 'Altura del header'
    },
    {
      name    : 'header::padding-left',
      default : '24px',
      desc    : 'Padding izquierdo del header'
    },
    {
      name    : 'header::hover::background',
      default : ' $color-surface-04',
      desc    : 'Color de fondo de la cabecera en estado hover'
    },
    {
      name    : 'icon::size',
      default : '24px',
      desc    : 'Tamaño del icono de la cabecera'
    },
    {
      name    : 'icon::color',
      default : ' $color-base-highlight-02',
      desc    : 'Color del icono de la cabecera'
    },
    {
      name    : 'text::margin',
      default : '9px auto 9px 19px',
      desc    : 'Margen del texto'
    },
    {
      name    : 'title::text::color',
      default : '$color-base-highlight-02',
      desc    : 'Color del texto del título'
    },
    {
      name    : 'title::text::size',
      default : '14px',
      desc    : 'Tamaño del texto del título'
    },
    {
      name    : 'title::text::lineheight',
      default : '20px',
      desc    : 'Propiedad "lineheight" del texto del título'
    },
    {
      name    : 'decription::color',
      default : '$color-base-highlight-02',
      desc    : 'Color del texto de la descripción'
    },
    {
      name    : 'icon::arrow::size',
      default : '24px',
      desc    : 'Tamaño del icono flecha'
    },
    {
      name    : 'icon::arrow::color',
      default : '$color-base-highlight-02',
      desc    : 'Color del icono felcha'
    },
    {
      name    : 'content::color',
      default : '$color-base-02',
      desc    : 'color del texto del contenido'
    },
    {
      name    : 'content::border',
      default : '1px solid $color-base-02',
      desc    : 'Borde del contenido'
    },
    {
      name    : 'content::background',
      default : '$color-surface-01k',
      desc    : 'Color del fondo del contenido'
    }
  ],
  notes : undefined
};
