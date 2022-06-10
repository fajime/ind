// DEMO META DATA
export default {
  titleName            : 'Header',
  nameJS               : 'DlUiHeader',
  type                 : 'molecule',
  nameScssMixin        : 'header-style-config',
  nameScssDefaultClass : 'dl-ui-header',
  nameScssMixinFile    : 'header',
  description          : `<p>El componente Header es un bloque constante y adicional de navegación para las páginas. <br>
    Se utiliza para acceder a información general que el usuario puede necesitar en 
    cualquier momento de la navegación, y suele mostrar información de sesión.</p><br>
    <p>Dispone de la opción de mostrar dos imagenes personalizadas, así como la posibilidad de hacer que la interacción
    con dichas imagenes lleve a un enlace predeterminado.</p><br>
    <p> Mediante slots podemos insertar información acerca de la versión que estamos usando o de la sesión activa.</p>`,
  slots : [
    {
      name  : 'logo',
      usage : 'Contenido en laparte izquierda para situar el título o el logo'
    },
    {
      name  : 'version',
      usage : 'Contenido del texto de versión junto a al logo'
    },
    {
      name  : 'middle',
      usage : 'Contenido central de la cabecera'
    },
    {
      name  : 'content',
      usage : 'Contenido dela cabecera a la derecha del header.'
    }
  ],
  events : [],
  scss   : [
    {
      name    : 'height',
      default : '30px',
      desc    : 'Altura del header'
    },
    {
      name    : 'background',
      default : '$color-surface-03',
      desc    : 'Color de fondo del header'
    },
    {
      name    : 'margin',
      default : '85px',
      desc    : 'Margenes laterales'
    }
  ]
};
