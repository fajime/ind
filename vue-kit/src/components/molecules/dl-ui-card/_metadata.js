// DEMO META DATA
export default {
  titleName            : 'Card',
  nameJS               : 'DlUiCard',
  type                 : 'molecule',
  nameScssMixin        : 'card-style-config',
  nameScssDefaultClass : 'dl-ui-card',
  nameScssMixinFile    : 'card',
  description          : `<p>El componente card representa un contenedor flexible cuya finalidad es admistrar información de forma conjunta.</p>
    <p>En el componente se puede mostrar una imagen sobre la cabecera de manera opcional, así como un icono junto al título de la cabecera.</p>
    <p>Además, la cabecera admite hasta 4 iconos que tienen la capacidad de disparar acciones.</p>
    <p>También dispone de la capacidad de mostrar botones si se desea.</p>`,
  slots : [
    {
      name  : 'content',
      usage : 'Contenido de la tarjeta'
    }
  ],
  events : [
    {
      name      : 'buttonClicked',
      condition : 'Cuando el usuario pulsa sobre el botón',
      payload   : 'Indice del botón pulsado'
    },
    {
      name      : 'iconButtonClicked',
      condition : 'Cuando el usuario pulsa sobre un icono de la cabecera',
      payload   : 'Indice del icono pulsado'
    }
  ],
  scss : [
    {
      name    : 'padding',
      default : '0',
      desc    : 'Padding a aplicar sobre toda la tarjeta'
    },
    {
      name    : 'background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo a aplicar a la tarjeta'
    },
    {
      name    : 'border',
      default : '1px solid  $color-surface-04',
      desc    : 'Borde a aplicar a la tarjeta'
    },
    {
      name    : 'border-radius',
      default : '4px',
      desc    : 'Radio del borde a aplicar a la tarjeta'
    },
    {
      name    : 'box-shadow',
      default : 'none',
      desc    : 'Sombra a aplicar a la tarjeta'
    },
    {
      name    : 'cursor',
      default : 'auto',
      desc    : 'Tipo de cursor cuando el ratón pasa por encima de la tarjeta'
    },
    {
      name    : 'header::image::height',
      default : '120px',
      desc    : 'Altura de la imagen de la cabecera'
    },
    {
      name    : 'header::padding',
      default : '8px',
      desc    : 'Padding de la cabecera'
    },
    {
      name    : 'header::border-radius',
      default : '3px 3px 0 0',
      desc    : 'Border radius de la cabecera'
    },
    {
      name    : 'header::background',
      default : '$color-surface-03',
      desc    : 'Color del fondo de la cabecera'
    },
    {
      name    : 'header::icon::margin-right',
      default : '8px',
      desc    : 'Margen derecho de los iconos de cabecera'
    }, {
      name    : 'title::color',
      default : '$color-base-highlight-03k',
      desc    : 'Color del texto del título.'
    },
    {
      name    : 'fill-color',
      default : '$color-base-highlight-03k',
      desc    : 'Color de los iconos'
    },
    {
      name    : 'icon::size',
      default : '16px',
      desc    : 'Tamaño del los iconos'
    },
    {
      name    : 'icon::margin',
      default : '0 8px',
      desc    : 'Margen entre iconos.'
    },
    {
      name    : 'body::padding',
      default : '8px',
      desc    : 'Padding del cuerpo de la tarjeta'
    },
    {
      name    : 'body::color',
      default : '$color-base-02',
      desc    : 'color del texto en el cuerpo de la tarjeta'
    },
    {
      name    : 'footer::buttons::margin',
      default : '9px',
      desc    : 'Margen entre botones'
    }
  ],
  notes : `<p> A continuación se muestra un ejemplo de cómo cargar la propiedad de acciones de cabecera donde se especificará 
    por cada una de ellas, un icono a mostrar y una funcionalidad cuando se interactúe con él. </p>
  
    <pre>
      <code class="javascript">
  
      actions : {
        type    : Array,
        default : () => [{
          icon : 'dl-ids-icon-user-single-outlined',
          fn   : () => console.log('dl-ui-icon-user pressed')
        },
        {
          icon : 'dl-ids-icon-search-outlined',
          fn   : () => console.log('dl-ui-icon-lab pressed')
        }],
        desc : 'Configuración que recibe el componente para pintar los iconos de acciones, hasta un maximo de 4.'
      }
  
      </code>
  
    </pre>
    
    
    <p>De una manera similar se hará la carga de la lista de botones en caso de necesitarlos.<br>
    En este caso, como se muestra en el siguient ejemplo, se indicará si se quiere algún icono, la clase pertinente para sus 
    estilos predefinidos, tamaño, contenido del slot para el texto que debe visualizarse y su funcionalidad.</p>
    
    <pre>
      <code class="javascript">
  
      buttonList : {
        type : Array,
        default() {
          return [{
            leftIcon    : '',
            rightIcon   : '',
            customClass : 'dl-ui-button--secondary',
            size        : 'medium',
            slot        : 'Cancelar',
            fn          : () => console.log('Button clicked')
          },
          {
            leftIcon    : '',
            rightIcon   : '',
            customClass : 'dl-ui-button--primary',
            size        : 'medium',
            slot        : 'Aceptar',
            fn          : () => console.log('Button clicked')
          }];
        },
        desc : 'Array compuesto por los botones que se deben mostrar, con un máximo de 4'
      }
      </code>
    </pre>
    `
};
