// DEMO META DATA
export default {
  titleName            : 'Leaflet Map',
  nameJS               : 'DlUiLeafletMap',
  type                 : 'organism',
  nameScssMixin        : '',
  nameScssDefaultClass : '',
  nameScssMixinFile    : '',
  description          : `El componente LeafletMap inserta un avanzado mapa de leaflet en nuestro proyecto. Actualmente tiene diversas capacidades, como gestores de capas base o de capas personalizadas (via geoserver), un tool para mostrar información estática o dinámica (según punto en el mapa), un control para edición de features o geofences (via geoserver) y otros como zoom, scale o position (lat-long), algunos de los cuales pueden probarse en el siguiente ejemplo.`,
  // Could we deduce/extract the slots from the html code?
  slots                : [{
    name  : 'default',
    usage : 'Contenido a añadir dentro del contenedor principal del mapa, libre para ser configurado con la posición y estilos que se desee.'
  }],
  // Could we deduce/extract the events from the component code?
  events : [{
    name      : 'ready',
    condition : 'Cuando el componente mapa ha finalizado de inicializarse avisa, mediante este evento, de que puede procederse a manipularlo desde el padre.',
    payload   : 'Instancia del mapa leaflet'
  },
  {
    name      : 'click',
    condition : 'Cuando el componente mapa recibe un click de usuario.',
    payload   : 'Evento'
  },
  {
    name      : 'error',
    condition : 'Cuando el componente mapa maneja un error, lo envía para su posible escalada.',
    payload   : 'String con error'
  },
  {
    name      : 'pointData',
    condition : 'Cuando el componente mapa recoge información de una coordenada (prop \'getInfoOnClick\' activada) la envía mediante este evento. Puede ser la lista de varios features sobrepuestos.',
    payload   : 'Array con las features'
  },
  {
    name      : 'dataload',
    condition : 'Cuando el componente mapa finaliza la carga de una capa, avisa mediante este evento.',
    payload   : 'Evento'
  },
  {
    name      : 'geofenceClicked',
    condition : 'Cuando estamos editando o borrando geofences, al clicar en una geofence, se envía su info hacia arriba para que el HMI pueda mostrar sus datos o cargarlos en modo lectura. Contendrá una única geofence aunque haya varias en el punto.',
    payload   : 'Evento'
  },
  {
    name      : 'geofenceSelected',
    condition : 'Cuando estamos editando o borrando geofences, al confirmar una selección de geofence, se envía su info hacia arriba para que el HMI pueda mostrar sus datos o cargarlos en modo edición. Contendrá una única geofence confirmada.',
    payload   : 'Evento'
  },
  {
    name      : 'shapeCreating',
    condition : 'Se enviará este evento para que la app anfitriona o padre sepa que el compo entra en estado de creación y pueda mostrar lo necesario (p.ej. formulario)',
    payload   : 'Evento'
  },
  {
    name      : 'shapeUpdating',
    condition : 'Se enviará este evento para que la app anfitriona o padre sepa que el compo entra en estado de edición y pueda mostrar lo necesario (p.ej. formulario)',
    payload   : 'Evento'
  },
  {
    name      : 'shapeDeleting',
    condition : 'Se enviará este evento para que la app anfitriona o padre sepa que el compo entra en estado de borrado y pueda mostrar lo necesario (p.ej. confirmación)',
    payload   : 'Evento'
  },
  {
    name      : 'circleRadiusUpdated',
    condition : 'Se enviará este evento para que la app anfitriona o padre sepa que el compo ha actualizado el radio del circulo creado/editado y pueda mostrar lo necesario (p.ej. actualizar campo de texto bidireccional)',
    payload   : 'Evento'
  },
  {
    name      : 'entityClicked',
    condition : 'Al clicar una entidad (icono).',
    payload   : 'Objeto con el icono (leaflet marker)'
  },
  {
    name      : 'entityWaiting',
    condition : 'Se enviará este evento para que la app anfitriona o padre sepa que el compo entra en espera de la info necesaria para añadir a dicha entidad (popup content, FP). Se diferencia de la anterior en que solo se enviará si la prop entityPopup está a false (ver lista de props), lo que indica que se gestional el popup desde fuera. ',
    payload   : 'Id de la entidad'
  },
  {
    name      : 'entityNotWaiting',
    condition : 'Se enviará este evento para que la app anfitriona o padre sepa que el compo ya no está en espera de la info necesaria para añadir a dicha entidad (popup content, FP). Útil para cancelar procesos de carga desde servidor externo y evitar info innecesaria si los clicks en el mapa y sus objetos se suceden con rapidez.',
    payload   : 'Id de la entidad'
  },
  {
    name      : 'geometryClicked',
    condition : 'Al clicar una geometría (circulo, polilínea, polígono...)',
    payload   : 'Id de la entidad'
  }],
  scss  : [],
  notes : `
    <p>El componente actualmente puede ser conectado a un 'end' usando simplemente la prop baseUrl, que será de una instancia geoserver, pudiendo recuperar capas y recoger la info mostrada en popup. Las capas que se pasan al layerTool han de corresponderse con dicho backend y tener el formato especificado.</p>
    <p>La edición de geofences emite eventos con la info de crear, editar o borrar, para que la app anfitriona continúe el CRUD y después vuelva con el estado recibido al mapa y que éste resetee su estado inicial de ediciones.</p>
    <p>No obstante, para el funcionamiento completo se usan capas con filtro cql en el campo 'layer_name' y se usa este campo al recuperar feature para editarla o borrarla, su ausencia provocará fallo hasta que se llegue a un consenso sobre arquitectura entre mapa y geoserver más adecuado.</p>
    <p>El infobox se muestra con info de ejemplo pero su contenido podrá ser alterado y preparado con etiquetas de multiidioma.</p>
    <p>Para obtener features en un punto al clicar, la prop getInfoOnClick ha de estar activada, y para mostrar el popup asociado, la prop showInfoPopup. La consulta se hará en base a las capas que estén seleccionadas actualmente, tengan éstas o no filtros adicionales. Ver ejemplo de capa más abajo.</p>
    <p>La posición de ciertos controles se apila por orden de llegada, siendo necesario ejecutar el posicionamiento en un orden específico para lograr el orden deseado.</p>
    <p>El mapa responde con su aspecto visual al tema seleccionado, para adaptarse al entorno de diseño. No existe parametrización de estilos y apariencia a fecha de hoy, debiendo recurrir a sobreescritura de clases css para customizar el look más detalladamente.</p>
    <p>Para más opciones o parametrización, ver lista de props y eventos.</p>
    <p>Cuando se utiliza el componente dentro de un contenedor que utiliza flexbox, puede ocurrir que se esté renderizando el componente con un alto de 0px, esto es debido a que la librería leaflet pinta un div contenedor con la altura inicial de la capa contenedora, si la capa contenedora está gestionada por flexbox, el tamaño inicial será 0. Existen diferentes formas de mitigar este comportamiento, bien metiendo un 'timeout' para asegurar que flexbox ha renderizado el tamaño final antes de lanzar la carga del mapa o bien fijando un tamaño de altura en px desde un inicio a su contenedor inmediato.</p>
    <div class="dl-comp-kit-demo-use__subtitle">Ejemplo de capa pasada al mapa. Hay niveles jerárquicos, ver ejemplo en código fuente.</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="javascript">
            {
              serverUrl : 'http://server_url/geoserver/wms',
              label     : 'layerControl.drone.label', // etiqueta multiidioma
              title     : 'layerControl.drone.title', // etiqueta multiidioma
              namespace : 'server_namespace',         // namespace en geoserver, requerido
              serverId  : 'layer_id_in_server',       // Id de capa o volumen en geoserver, requerido
              geometry  : 'layer assoc geometry',     // geometría de geoserver, normalmente 'the_geom', requerido
              filter    : 'cql_filter_if_any',        // filtro cql, opcional
              color     : 'fabb21',                   // color mostrado en el control visual
              colorVect : { 'color' : '#fabb21', 'weight' : 1 }, // objeto de color usado en modo wfs
              style     : 'some_server_style',        // estilo para esta capa de los disponibles en geoserver
              visible   : false                       // si será visible al iniciar
            }
            </code>
        </pre>
    </div>
    <div class="dl-comp-kit-demo-use__subtitle">Ejemplo de capa base pasada al mapa en un array. No hay niveles jerárquicos, ver ejemplo en código fuente.</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="javascript">
            {
              id      : 'osm', // Id interno, único
              name    : 'OS Maps', // Texto a mostrar por defecto
              label   : 'baselayer.openStreetMap', // etiqueta multiidioma
              b64img  : 'data:image/png;base64,xxxxxx', // aquí irá la imagen del icono en base64
              default : false, // la activada por defecto tendrá true
              url     : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', // url del servicio
              options : {
                attribution : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains  : 'abcd',
                maxZoom     : 19
              } // opciones de inicialización
            },
            </code>
        </pre>
    </div>`
};
