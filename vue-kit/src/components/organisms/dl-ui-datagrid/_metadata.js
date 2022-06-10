// DEMO META DATA
export default {
  titleName            : 'Datagrid',
  nameJS               : 'DlUiDatagrid',
  type                 : 'organism',
  nameScssMixin        : 'datagrid-style-config',
  nameScssDefaultClass : 'dl-ui-datagrid',
  nameScssMixinFile    : 'datagrid',
  description          : `<p>El componente DataGrid muestra los datos en una serie de filas y columnas, siendo el caso más simple cuando el componente está enlazado a un origen de datos con una sola tabla. En ese caso, los datos aparecen en simples filas y columnas, como en una hoja de cálculo.</p>
    <br>
    <p>El componente DataGrid nos proporciona una interfaz de usuario para un conjunto de datos y con capacidades de manipulación que se realiza mediante funciones independientes.</p>
    <br>
    <p>El componente DataGrid es altamente configurable, pudiendo configurar tanto en la apariencia como en el comportamiento del mismo. A continuación se muestran las características que nos permite realizar el componente:</p>
    <br>
    <ul>
      <li>
        Podemos seleccionar una o múltiples filas de la tabla para su posterior tratamiento, como por ejemplo copiar el contenido de todos los elementos seleccionados usando la combinación de teclas <b>Ctrl + c.</b>
      </li>
      <li>
        También podemos filtrar los datos del componente por cada una de las columnas de la misma, inclusive podemos combinar el filtrado entre múltiples columnas generando de esta forma una búsqueda más exacta.
      </li>
      <li>
        Otra característica interesante, el poder ordenar de manera ascendente y descendente cualquier columna y diferentes tipos de datos (números, textos, fechas).
      </li>
      <li>
        Además, podemos mostrar y ocultar las columnas del componente, pudiendo de esta manera tener una vista más limpia de los resultados y todo ellos sin perder el modelo de datos original.
      </li>
      <li>
        Otra característica muy interesante es la capacidad de redimensionar las columnas, ya que de esta manera podemos reducir el tamaño de las columnas con menos peso y/o contenido para dárselo a otras con más peso y/o contenido.
      </li>
      <li>
        También podemos mostrar un menú contextual en cada celda y que es totalmente personalizable, para realizar acciones sobre la celda o la tabla (esta característica se realiza desde fuera del componente).
      </li>
      <li>
        El componente también nos permite mover las columnas de sitio, consiguiendo de esta manera obtener el orden deseado independientemente del origen de los datos.
      </li>
      <li>
        Podemos tener la opción de paginar el resultado de nuestros datos, ya que en ocasiones la cantidad de datos es extremadamente alta y poder paginarlos con diferentes configuraciones nos permite tener mayor agilidad sobre lo que estamos mostrando.
      </li>
      <li>
        El componente nos ofrece la posibilidad de añadir un tooltip a cada una de las celdas de nuestra cabecera con información extra, ya que en ocasiones por limitaciones físicas no podemos mostrar todo el contenido en la propia cabecera.
      </li>
      <li>
        Como sucede en las cabeceras en las celdas podemos encontrarnos el mismo problema, así que el componente nos permite mostrar un tooltip por cada celda con información extra.
      </li>
      <li>
        En el caso de que optemos por no paginar el resultado el componente está preparado para dejar la cabecera fija, de esta manera nunca perdemos el origen de los datos de cada columna, ya que está en todo momento visible y accesible.
      </li>
      <li>
        Otra característica más que nos ofrece el componente, es la capacidad de añadir nuestras funciones personalizadas pera mostrar resultados en el pie de la tabla. Con esta función podríamos por ejemplo realizar un sumatorio de la columna, o una validación sobre el contenido, etc.
      </li>
      <li>
        También podemos guardar, cargar y resetear todos los datos de la tabla en cualquier momento. Ya sea para su exportación o simplemente para tener almacenado el estado que tuviéramos en ese momento.
      </li>
      <li>
        Otra de las características que nos permite efectuar nuestra tabla es la modificación de los datos en la propia tabla, siendo similar al comportamiento de un Excel.
      </li>
      <li>
      El mismo comportamiento que podíamos hacer en el header dejando fija la posición también podemos hacerlo sobre las columnas que necesitemos, pudiendo de esta forma tener un control sobre las columnas que son más importante o relevantes.
      </li>
    </ul>`,
  slots : [
    {
      name  : 'default',
      usage :
          'Contenido a añadir dentro del menú contextual (hasta nuevas mejoras)'
    }
  ],
  events : [
    {
      name      : 'tableupdated',
      condition : 'El usuario escribe dentro de una celda editable.',
      payload   :
          'El array con modelo original de la prop data, con las actualizaciones.'
    },
    {
      name      : 'exporting',
      condition : 'El usuario exporta los datos con el botón.',
      payload   :
          'Una versión del contenido (columnas, data) con la configuración y aspecto actuales.'
    },
    {
      name      : 'onChangePageSize',
      condition : 'El usuario cambia el tamaño de la paginación',
      payload   : 'La configuración de la paginación actual en la tabla'
    },
    {
      name      : 'onChangePage',
      condition : 'El usuario cambia de página',
      payload   :
          'Los datos de la tabla actualizados y la configuración de la paginación actual'
    },
    {
      name      : 'onDataFilter',
      condition : 'El usuario filtra los datos en la tabla',
      payload   : 'Los datos de la tabla filtrados'
    },
    {
      name      : 'onSelectedRow',
      condition : 'El usuario selecciona y o varias filas',
      payload   : 'La fila seleccionada y el estado de la misma'
    },
    {
      name      : 'onOrderColumn',
      condition : 'El usuario ordena los datos de una columna',
      payload   : 'Los datos de la tabla ordenados'
    },
    {
      name      : 'onToggleColumn',
      condition : 'El usuario oculta las columnas',
      payload   : 'Las columnas que están ocultas'
    },
    {
      name      : 'onDrop',
      condition : 'El usuario cambia las columnas de posición',
      payload   : 'Los datos de la tabla con la nueva organización'
    },
    {
      name      : 'onCopyClipboard',
      condition :
          'El usuario realiza la copia de las filas seleccionadas usando Ctrl + c',
      payload : 'Los datos de una o varias filas seleccionadas'
    }
  ],
  scss : [
    {
      name    : 'height',
      default : '100%',
      desc    : 'Altura del datagrid total, incluyendo controles externos'
    },
    {
      name    : 'width',
      default : '100%',
      desc    : 'Anchura del datagrid'
    }
  ],
  notes : `<p>Actualmente solo admite alterar, via mixin, los atributos de altura y anchura.</p>
    <p>A continuación se muestra un ejemplo de columna y fila para pasar como elementos de los respectivos arrays en la prop -data-:</p>
    <div class="dl-comp-kit-demo-use__subtitle">Column</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="javascript">
            {
              text       : 'COL1 (sticky)',
              id         : 'col1',
              textAlign  : 'center',
              order      : 'asc',
              desc       : 'Columna 1',
              sticky     : true,
              footerData : {
                title : 'Contiene B?',
                func  : arr => arr.indexOf('B') !== -1
              }
            },
            ...
            </code>
        </pre>
    </div>
    <div class="dl-comp-kit-demo-use__subtitle">Row</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
          <code class="javascript">
          ['B', 2, '3', 'Longer filling text with appropiate length 4', 'Longer filling text with appropiate length 5', '6', '02/02/2021'],
          ...
          </code>
        </pre>
    </div>
    <p>En este componente, se debe pasar la prop -data- como un objeto con los campos 'columns' y 'data', conteniendo estos los arrays propuestos anteriormente:</p>
    <div class="dl-comp-kit-demo-use__subtitle">data prop</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="javascript">
            {
             columns : [ {column}, {column}, ...],
             data: [ [row], [row], ...]
            }
            </code>
        </pre>
    </div>
    `
};
