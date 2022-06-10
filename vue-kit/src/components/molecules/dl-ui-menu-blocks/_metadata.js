// DEMO META DATA
export default {
  titleName            : 'Menu blocks',
  nameJS               : 'DlUiMenuBlocks',
  type                 : 'molecules',
  nameScssMixin        : 'menu-blocks-style-config',
  nameScssDefaultClass : 'dl-ui-menu-blocks',
  nameScssMixinFile    : 'menu-blocks',
  description          : `<p>Este componente representa un menu organizado por bloques de 3 niveles. Su funcionamiento y diseño está pensado para albergar decenas de entradas
                            de menú visibles en un solo vistazo.</p>`,
  slots  : [],
  events : [
    {
      name      : 'mainEntryClicked',
      condition : 'Cuando el usuario selecciona una opción de la cabecera',
      payload   : 'Estructura del nodo de configuración pulsado'
    },
    {
      name      : 'linkEntryClicked',
      condition : 'Cuando el usuario selecciona una opción interna del menú',
      payload   : 'Estructura del nodo de configuración pulsado'
    }
  ],
  scss  : [],
  notes : `<p>Este componente utiliza una estructura de datos particular para ser alimentado. Esta estructura esta compuesta de tres tipos de elementos.</p>
            <p>El primer elemento hace referencia a las entradas de menu visibles sin desplegar. Este elemento tiene la siguiente estructura: 
            <div class="dl-comp-kit-demo-use__code">
              <pre>
                  <code class="javascript">
                  [{
                    {
                      id      : 'Id del elemento',          // id interno
                      text    : 'Texto del elemento',       // texto del elemento de primer nivel
                      icon    : 'icono',                    // id del icono que asociado esta entrada de menú
                      fn      : () =>{},                    // función asociada al click sobre el elemento de menu
                      section : []                          // array de elementos de segundo nivel que conforman la sección interna
                  },
                  ...]
                  </code>
              </pre>
            </div>
            <p>El segundo elemento hace referencia a las entradas internas del menú agrupadas como sección. Este elemento tiene la siguiente estructura: 
            <div class="dl-comp-kit-demo-use__code">
              <pre>
                  <code class="javascript">
                  {
                    {
                      id      : 'Id dela sección',          // id interno de la sección
                      title   : 'Título de la sección',     // texto del elemento de primer nivel
                      link    : [],                         // array de elementos links o entradas de menú      
                      subSection : []                       // array de elementos de segundo nivel que conforman la subsección de esta sección
                  }
                  </code>
              </pre>
            </div>
            <p>El tercer elemento representa un enlace o una entrada de menú al uso. Está compuesto de siguiente estructura: 
            <div class="dl-comp-kit-demo-use__code">
              <pre>
                  <code class="javascript">
                  {
                    {
                      text    : 'Texto del elemento',       // texto del elemento de primer nivel
                      fn      : () =>{},                    // función asociada al click sobre el elemento de menu
                  }
                  </code>
              </pre>
            </div>`
};
