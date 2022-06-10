// DEMO META DATA
export default {
  titleName            : 'Tabs',
  nameJS               : 'DlUiTabs',
  type                 : 'molecule',
  nameScssMixin        : 'tabs-style-config',
  nameScssDefaultClass : 'dl-ui-tabs',
  nameScssMixinFile    : 'tabs',
  description          : `Se trata de un componente de navegación que muestra contenido como pestañas y 
    permite interaccionar con el contenido en función de la pestaña seleccionada. Utiliza un componente interno <span class="demo__md--syntax">dl-ui-tab</span> para gestionar
    el contenido de cada pestaña`,
  slots : [
    {
      name  : 'default',
      usage :
          'Contenido a mostrar agrupado en componentes <span class="demo__md--syntax">dl-ui-tab</span>'
    }
  ],
  events : [
    {
      name      : 'tab-selected',
      condition : 'Cuando el usuario pulsa sobre una tab',
      payload   : 'Índice de la tab seleccionada'
    },
    {
      name      : 'tab-remove',
      condition : 'Cuando el usuario pulsa sobre el boton cerrar',
      payload   : 'Índice de la tab '
    },
    {
      name      : 'tab-add',
      condition : 'Cuando el usuario pulsa sobre el boton agregar',
      payload   : 'Índice del próximo tab '
    }
  ],
  scss : [
    {
      name    : 'background',
      default : 'transparent',
      desc    : 'Color de fondo de todo el componente'
    },
    {
      name    : 'border-bottom',
      default : '1px solid $color-surface-06',
      desc    : 'Borde inferior del componente'
    },
    {
      name    : 'tab::cursor',
      default : 'pointer',
      desc    : 'Puntero al pasar por una pestaña'
    },
    {
      name    : 'tab::background',
      default : 'transparent',
      desc    : 'Color de fondo de la pestaña'
    },
    {
      name    : 'tab::color',
      default : '$color-base-02',
      desc    : 'Color de texto de la pestaña'
    },
    {
      name    : 'tab::padding',
      default : '8px 64px',
      desc    : 'Padding del contenido de la pestaña'
    },
    {
      name    : 'tab::border-bottom',
      default : '1px solid transparent',
      desc    : 'Borde inferior de la pestaña'
    },
    {
      name    : 'tab::color::hover',
      default : '$color-base-02',
      desc    : 'Color de texto de la pestaña cuando se pasa el ratón por encima'
    },
    {
      name    : 'tab::background::hover',
      default : 'transparent',
      desc    : 'Color de fondo de la pestaña cuando se pasa el ratón por encima'
    },
    {
      name    : 'tab::border-bottom::hover',
      default : '1px solid $color-emphasis-04',
      desc    : 'Borde inferior de la pestaña cuando se pasa el ratón por encima'
    },
    {
      name    : 'tab::color::active',
      default : '$color-action-primary-active',
      desc    : 'Color de texto de la pestaña cuando la pestaña está activada'
    },
    {
      name    : 'tab::background::active',
      default : 'transparent',
      desc    : 'Color de fondo de la pestaña cuando la pestaña está activada'
    },
    {
      name    : 'tab::border-bottom::active',
      default : '1px solid $color-emphasis-04',
      desc    : 'Borde inferior de la pestaña cuando la pestaña está activada'
    },
    {
      name    : 'tab::icon::margin',
      default : '0 10px 0 0',
      desc    : 'Margen del icono respecto al texto'
    },
    {
      name    : 'tab::icon::size',
      default : '12px',
      desc    : 'Tamaño del icono'
    },
    {
      name    : 'tab::icon::color',
      default : '$color-base-02',
      desc    : 'Color del icono de la pestaña'
    },
    {
      name    : 'tab::icon::color::hover',
      default : '$color-base-highlight-02',
      desc    : 'Color del icono de la pestaña cuando se pasa el ratón por encima'
    },
    {
      name    : 'tab::icon::color::active',
      default : '$color-base-highlight-02',
      desc    : 'Color del icono de la pestaña cuando la pestaña está activada'
    }
  ],
  notes : undefined
};
