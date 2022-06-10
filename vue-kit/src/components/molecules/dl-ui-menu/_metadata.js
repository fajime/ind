// DEMO META DATA
export default {
  titleName            : 'Menu',
  nameJS               : 'DlUiMenu',
  type                 : 'molecule',
  nameScssMixin        : 'menu-style-config',
  nameScssDefaultClass : 'dl-ui-menu',
  nameScssMixinFile    : 'menu',
  description          : 'Componente que estructura las opciones de una barra de navegación o menú tradicional',
  slots                : [],
  events               : [
    {
      name      : 'itemClicked',
      condition : 'Cuando el usuario selecciona una opción interna del menú',
      payload   : 'Estructura del nodo de configuración pulsado'
    }
  ],
  scss : [ {
    name    : 'height',
    default : '40px',
    desc    : 'Propiedad <span class="demo__md--syntax">height</span> de la barra de navegación'
  }, {
    name    : 'background',
    default : '$color-surface-03',
    desc    : 'Propiedad <span class="demo__md--syntax">color</span> de fondo del menu'
  }, {
    name    : 'item::height',
    default : '40px',
    desc    : 'Propiedad <span class="demo__md--syntax">height</span> de los items del menu'
  }, {
    name    : 'item::min-width',
    default : '95px',
    desc    : 'Propiedad <span class="demo__md--syntax">min-width</span> de los items del menu'
  }, {
    name    : 'item::color',
    default : '$color-action-secondary-default',
    desc    : 'Propiedad <span class="demo__md--syntax">color</span> de los items de menu'
  }, {
    name    : 'item::background',
    default : 'transparent',
    desc    : 'Propiedad <span class="demo__md--syntax">background-color</span> de los items de menu'
  }, {
    name    : 'item::hover::color',
    default : '$color-action-secondary-hover',
    desc    : 'Propiedad <span class="demo__md--syntax">color</span> de los items de menu en estado <span class="demo__md--syntax">hover</span>'
  }, {
    name    : 'item::hover::background',
    default : 'transparent',
    desc    : 'Propiedad <span class="demo__md--syntax">background-color</span> de los items de menu en estado <span class="demo__md--syntax">hover</span>'
  }, {
    name    : 'item::disabled::color',
    default : '$color-action-secondary-disabled',
    desc    : 'Propiedad <span class="demo__md--syntax">color</span> de los items de menu en estado <span class="demo__md--syntax">disabled</span>'
  }, {
    name    : 'item::disabled::background',
    default : 'transparent',
    desc    : 'Propiedad <span class="demo__md--syntax">background-color</span> de los items de menu en estado <span class="demo__md--syntax">disabled</span>'
  } ],
  notes : `
  <p>El objeto menu tiene una estructura de array donde el primer elemento son los item que aparecen en la barra de menú. EL resto de items hijos se agrupan en
  paneles de opciones</p>
  <p>El componente gestiona una barra de items, y además un <a href="/dl-ui-menu-group">panel-group</a> asociado a cada item de menú</p>
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
