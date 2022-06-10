// DEMO META DATA
export default {
  titleName            : 'Menu Group',
  nameJS               : 'DlUiMenuGroup',
  type                 : 'molecule',
  nameScssMixin        : 'menu-group-style-config',
  nameScssDefaultClass : 'dl-ui-menu-group',
  nameScssMixinFile    : 'menu-group',
  description          : 'Componente que estructura las opciones de un bloque de menu por paneles',
  slots                : [],
  events               : [
    {
      name      : 'itemClicked',
      condition : 'Cuando el usuario selecciona una opción interna del menú',
      payload   : 'Indice del elemento pulsado'
    }
  ],
  scss : [ {
    name    : 'z-index',
    default : '2',
    desc    : 'Propiedad <span class="demo__md--syntax">z-index</span> del panel'
  }, {
    name    : 'background',
    default : '$color-surface-03',
    desc    : 'Color de fondo del panel'
  }, {
    name    : 'padding',
    default : '0',
    desc    : 'Padding del panel sobre los items de menú'
  }, {
    name    : 'border',
    default : 'none',
    desc    : 'Borde exterior del panel'
  }, {
    name    : 'box-shadow',
    default : 'none',
    desc    : 'Sombra exterior del panel'
  }, {
    name    : 'min-width',
    default : '180px',
    desc    : 'Tamaño mínimo del panel'
  }, {
    name    : 'item::height',
    default : '32px',
    desc    : 'Propiedad <span class="demo__md--syntax">height</span> de los items del menu'
  }, {
    name    : 'item::color',
    default : '$color-base-03k',
    desc    : 'Propiedad <span class="demo__md--syntax">color</span> de los items de menu'
  }, {
    name    : 'item::background',
    default : '$color-surface-03',
    desc    : 'Color de fondo del item de menú'
  }, {
    name    : 'item::padding',
    default : '8px',
    desc    : 'Padding de cada elemento de menu sobre su contenido'
  }, {
    name    : 'item::hover::color',
    default : '$color-emphasis-04',
    desc    : 'Propiedad <span class="demo__md--syntax">color</span> de los items de menu en estado <span class="demo__md--syntax">hover</span>'
  }, {
    name    : 'item::hover::background',
    default : '$color-emphasis-01',
    desc    : 'Color de fondo del item de menú en estado <span class="demo__md--syntax">hover</span>'
  }, {
    name    : 'item::disbled::color',
    default : '$color-surface-06',
    desc    : 'Propiedad <span class="demo__md--syntax">color</span> de los items de menu en estado <span class="demo__md--syntax">disbled</span>'
  }, {
    name    : 'item::disbled::background',
    default : 'transparent',
    desc    : 'Color de fondo del item de menú en estado <span class="demo__md--syntax">disbled</span>'
  }, {
    name    : 'separator::height',
    default : '6px',
    desc    : 'Propiedad <span class="demo__md--syntax">height</span> de los separadores de items'
  }, {
    name    : 'separator::background',
    default : 'transparent',
    desc    : 'Color de fondo del separador de items de menú'
  }, {
    name    : 'separator::line::height',
    default : '1px',
    desc    : 'Grosor de la linea separadora'
  }, {
    name    : 'separator::line::border',
    default : '1px solid $color-base-03k',
    desc    : 'Borde que contiene la linea separadora'
  }],
  notes : `
  <p>El objeto se configura cargando un array de items con la siguiente estructura</p>
  <div class="dl-comp-kit-demo-use__title">Menu Object</div>
  <div class="dl-comp-kit-demo-use__code">
      <pre>
          <code class="javascript">
          [
            {
              label    : 'Option 1',
              children : [
                {
                  label    : 'Write trace Option 1',
                  leftIcon : 'dl-ids-icon-calendar-default-filled',
                  fn       : () => {
                  // eslint-disable-next-line no-console
                    console.log('Trace "Option 1"');
                  }
                },
                {
                  label    : 'Other trace Option 1',
                  leftIcon : 'dl-ids-icon-user-single-outlined',
                  fn       : () => {
                  // eslint-disable-next-line no-console
                    console.log('Other trace "Option 1"');
                  }
                },
                { separator : true },
                {
                  label    : 'Subitems',
                  children : [
                    {
                      label    : 'Sub Item 1', leftIcon : 'dl-ids-icon-user-single-outlined',
                      fn       : () => {
                        // eslint-disable-next-line no-console
                        console.log('Sub Item 1');
                      }
                    },
                    {
                      label    : 'Sub Item 2', leftIcon : 'dl-ids-icon-user-single-outlined',
                      fn       : () => {
                        // eslint-disable-next-line no-console
                        console.log('Sub Item 2');
                      }
                    },
                    {
                      label    : 'Sub Item 3', leftIcon : 'dl-ids-icon-user-single-outlined',
                      fn       : () => {
                        // eslint-disable-next-line no-console
                        console.log('Sub Item 3');
                      }
                    }
                  ]
                },
                { separator : true },
                {
                  label     : 'Other Option',
                  rightIcon : 'dl-ids-icon-user-single-outlined',
                  children  : [
                    {
                      label    : 'Other Option 1', leftIcon : 'dl-ids-icon-user-single-outlined',
                      fn       : () => {
                        // eslint-disable-next-line no-console
                        console.log('Other Option 1');
                      }
                    },
                    {
                      label    : 'Other Option 2', leftIcon : 'dl-ids-icon-user-single-outlined',
                      fn       : () => {
                        // eslint-disable-next-line no-console
                        console.log('Other Option 2');
                      }
                    },
                    {
                      label    : 'Other Option 3', leftIcon : 'dl-ids-icon-user-single-outlined',
                      fn       : () => {
                        // eslint-disable-next-line no-console
                        console.log('Other Option 3');
                      }
                    },
                    {
                      label    : 'Sub Items',
                      leftIcon : 'dl-ids-icon-user-single-outlined',
                      fn       : () => {
                        // eslint-disable-next-line no-console
                        console.log('OPen Sub item in "Other Option"');
                      },
                      children : [
                        {
                          label : 'Sub Item Other Option 1',
                          fn    : () => {
                            // eslint-disable-next-line no-console
                            console.log('Sub Item Other Option 1');
                          }
                        },
                        {
                          label : 'Sub Item Other Option 2',
                          fn    : () => {
                            // eslint-disable-next-line no-console
                            console.log('Sub Item Other Option 2');
                          }
                        },
                        {
                          label : 'Sub Item Other Option 3',
                          fn    : () => {
                            // eslint-disable-next-line no-console
                            console.log('Sub Item Other Option 3');
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              label    : 'Option 2', leftIcon : 'dl-ids-icon-user-single-outlined',
              fn       : () => {
                window.open('https://www.indracompany.com/');
              }
            },
            {
              label     : 'Option 3', leftIcon  : 'dl-ids-icon-user-single-outlined', rightIcon : 'dl-ids-icon-user-single-outlined',
              fn        : () => {
                // eslint-disable-next-line no-alert
                window.alert('Option 3 clicked!!!');
              }
            },
            { label : 'Option 4', disabled : true }
          ]         
          </code>
      </pre>
  </div>
  <div class="dl-comp-kit-demo-use__title">Menu Item Object</div>
<p>Cada item del menú tiene la siguiente estructura</p> 
  <div class="dl-comp-kit-demo-table dl-comp-kit-demo-table--columns-3">
  <table>
    <thead>
      <tr>
        <th>Nombre propiedad</th>
        <th>Obligatorio</th>
        <th>Descripción</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="demo__content-properties--name demo__md--syntax">label</td>
        <td><span class="demo__content-properties--name">Si</td>
        <td><span class="demo__content-properties--name">Texto menu item</td>
      </tr>
      <tr>
        <td><span class="demo__content-properties--name demo__md--syntax">children</td>
        <td><span class="demo__content-properties--name">No</td>
        <td><span class="demo__content-properties--name">Array de items hijo</td>
      </tr>
      <tr>
        <td><span class="demo__content-properties--name demo__md--syntax">fn</td>
        <td><span class="demo__content-properties--name">No</td>
        <td><span class="demo__content-properties--name">Funcion a ejecutar</td>
      </tr>
      <tr>
        <td><span class="demo__content-properties--name demo__md--syntax">fnParams</td>
        <td><span class="demo__content-properties--name">No</td>
        <td><span class="demo__content-properties--name">Array de parametros para la función</td>
      </tr>
      <tr>
        <td><span class="demo__content-properties--name demo__md--syntax">route</td>
        <td><span class="demo__content-properties--name">No</td>
        <td><span class="demo__content-properties--name">Enrutamiento</td>
      </tr>
      <tr>
        <td><span class="demo__content-properties--name demo__md--syntax">routeParams</td>
        <td><span class="demo__content-properties--name">No</td>
        <td><span class="demo__content-properties--name">Array de parametros para el enrutamiento</td>
      </tr>
      <tr>
        <td><span class="demo__content-properties--name demo__md--syntax">leftIcon</td>
        <td><span class="demo__content-properties--name">No</td>
        <td><span class="demo__content-properties--name">Identificador del icono a la izquierda (ver <a href="/dl-ui-icon">dl-ui-icon</a>)</td>
      </tr>      
      <tr>
        <td><span class="demo__content-properties--name demo__md--syntax">rightIcon</td>
        <td><span class="demo__content-properties--name">No</td>
        <td><span class="demo__content-properties--name">Identificador del icono a la derecha (ver <a href="/dl-ui-icon">dl-ui-icon</a>)</td>
      </tr>       
    </tbody>
  </table>
</div>
`
};
