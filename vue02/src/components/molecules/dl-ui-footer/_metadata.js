// DEMO META DATA
export default {
  titleName            : 'Footer',
  nameJS               : 'DlUiFooter',
  type                 : 'molecule',
  nameScssMixin        : 'footer-style-config',
  nameScssDefaultClass : 'dl-ui-footer',
  nameScssMixinFile    : 'footer',
  description          : `<p>El componente Footer es método adicional de navegación para las páginas. Se utiliza para acceder a información general que el usuario puede necesitar en 
    cualquier momento de la navegación, o simplemente mostrar un limite al contenedor de la página.</p>
    <p>Es la parte inferior de una página web, en la que se incluye una serie de elementos que pueden resultar de interés para el usuario que navega por ella, como enlaces a las categorías principales, información de contacto, redes sociales o enlaces a textos legales.</p>
    `,
  // slots: el default and usage
  slots : [
    {
      name  : 'default',
      usage : 'Contenido interno del pie de página'
    }
  ],
  // events with name, default state and desc
  events : [],
  scss   : [
    {
      name    : 'height',
      default : '1rem',
      desc    : 'Altura del pie'
    },
    {
      name    : 'color',
      default : '$color-base-03k',
      desc    : 'Color del texto'
    },
    {
      name    : 'left::background',
      default : '$color-surface-03',
      desc    : 'Color de fondo de la parte izquierda donde se muestra el contenido'
    },
    {
      name    : 'left::padding-left',
      default : '12px',
      desc    : 'Paddind del contenido sobre el borde izquierdo'
    },
    {
      name    : 'right::background',
      default : '$color-surface-03',
      desc    : 'Color de fondo de la parte derecha donde se muestra la imagen'
    },
    {
      name    : 'right::image-url',
      default : 'url("~../../../assets/img/indra.png")',
      desc    : 'Url de la imagen derecha'
    },
    {
      name    : 'right::image::position',
      default : 'right',
      desc    : 'Posición de la imagen respecto a al contendedor derecho'
    },
    {
      name    : 'right::accent::width',
      default : '4px',
      desc    : 'Ancho de la particula derecha'
    },
    {
      name    : 'right::accent::background',
      default : '#fbbb21',
      desc    : 'Color de fondo de la particula derecha'
    }

  ],
  notes : undefined
};
