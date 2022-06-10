// DEMO META DATA
export default {
  titleName            : 'Breadcrumb',
  nameJS               : 'DlUiBreadcrumb',
  type                 : 'atom',
  nameScssMixin        : 'breadcrumb-style-config',
  nameScssDefaultClass : 'dl-ui-breadcrumb',
  nameScssMixinFile    : 'breadcrumb',
  description          :
      '<p>El componente <b>breadcrumb</b> nos permite indicar al usuario dónde se encuentra dentro de una página o aplicación y nos muestra el rastro que determina la localización exacta dentro de la estructura, indicando cada una de las ramas seguidas hasta llegar a la ubicación actual.</p>',
  events : [
    {
      name      : 'itemClicked',
      condition : 'Cuando el usuario selecciona una opción interna del menú',
      payload   : 'Indice del elemento pulsado'
    }
  ],
  scss : [
    {
      name    : 'height',
      default : '32px',
      desc    : 'Altura del componente'
    },
    {
      name    : 'padding',
      default : '6px 24px',
      desc    : 'Pading del elemento respecto a su contenedor'
    },
    {
      name    : 'separator::margin',
      default : '0 8px',
      desc    : 'Margen del separador respecto a los elementos'
    },
    {
      name    : 'separator::color',
      default : '$color-base-01',
      desc    : 'Color del separador de elementos'
    },
    {
      name    : 'color',
      default : '$color-base-02',
      desc    : 'Color del elemento de navegación'
    },
    {
      name    : 'color::hover',
      default : '$color-action-primary-hover',
      desc    : 'Color del elemento en estado hover'
    },
    {
      name    : 'color::disabled',
      default : '$color-action-primary-disabled',
      desc    : 'Color del elemento en estado disabled'
    },
    {
      name    : 'color::active',
      default : '$color-action-primary-active',
      desc    : 'Color del elemento en estado activo'
    },
    {
      name    : 'icon::color',
      default : '$color-action-tertiary-default',
      desc    : 'Color del icono'
    },
    {
      name    : 'icon::hover::color',
      default : '$color-action-tertiary-hover',
      desc    : 'Color del icono en estado hover'
    }
  ],
  notes : `<p>El objeto se configura cargando un array de items con la siguiente estructura</p>
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
        <td><span class="demo__content-properties--name demo__md--syntax">icon</td>
        <td><span class="demo__content-properties--name">No</td>
        <td><span class="demo__content-properties--name">Identificador del icono (ver <a href="/dl-ui-icon">dl-ui-icon</a>)</td>
      </tr>      
    </tbody>
  </table>
</div>
 `
};
