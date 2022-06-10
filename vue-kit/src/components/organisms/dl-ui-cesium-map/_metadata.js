// DEMO META DATA
export default {
  titleName            : 'Cesium Map',
  nameJS               : 'DlUiCesiumMap',
  type                 : 'organism',
  nameScssMixin        : '',
  nameScssDefaultClass : '',
  nameScssMixinFile    : '',
  description          : `<p>El componente Cesium Map inserta en nuestra página un mapa Cesium que permite recibir todo tipo de parámetros de
    configuración básicos para darle la apariencia que se desee. Tras ser creado, devuelve la instancia de viewer necesaria para 
    añadir al mapa contenido adicional o capas, según documantación oficial de Cesium.</p>
    <p>Actualmente, el componente utiliza la librería oficial de Cesium mediante instalación local npm, lo que hace que se 
    necesite configurar la app Vue con ciertos parámetros especificados en la sección 'Notes'.</p>`,
  // Could we deduce/extract the slots from the html code?
  slots : [
    {
      name  : 'default',
      usage :
          'Contenido a añadir dentro del contenedor principal del mapa, libre para ser configurado con la posición y estilos que se desee.'
    },
    {
      name  : 'top_left_slot',
      usage :
          'Contenido a añadir dentro del contenedor de la esquina superior izquierda del mapa. Aparecerá debajo de nuestros widgets (layer, draw).'
    },
    {
      name  : 'bottom_right_slot',
      usage :
          'Contenido a añadir dentro del contenedor de la esquina inferior dcha del mapa. Ya aporta estilos básicos y de posicionamiento.'
    },
    {
      name  : 'popup_slot',
      usage :
          'Contenido a añadir dentro del contenedor del popup del mapa. Es aconsejable añadir un contenedor con id unico para poder encontrarlo y cambiar su contenido dinámicamente. El popup debería contener poco contenido, idealmente tendrá 200px de ancho.'
    }
  ],
  // Could we deduce/extract the events from the component code?
  events : [
    {
      name      : 'ready',
      condition :
          'Cuando el componente mapa ha finalizado de inicializarse avisa, mediante este evento, de que puede procederse a manipularlo desde el padre.',
      payload :
          'Devuelve dos objetos, Cesium y la instancia de viewer recien creada, para usarla y manipular el mapa.'
    },
    {
      name      : 'update:camera',
      condition :
          'Cuando la instancia de viewer registra un movimiento, se avisa mediante este evento al padre para que pueda actualizar su cámara, si es necesario.',
      payload : 'Devuelve un objeto con la info de cámara según formato Cesium.'
    }
  ],
  scss  : [],
  notes : `
    <p>Al utilizar la librería de Cesium mediante instalación local npm, se ha de tweakear la configuración de proyecto en el archivo <span style="font-weight:bold">vue.config.js</span></p>
    <p>Ha de tenerse en cuenta que el componente usa cesium desde el /node_modules global, por lo que si existe una versión instalada previamente de cesium, se usará ésta y no la obtenida al instalar el kit (que se instalará internamente en node_modules del kit).</p>
    <div class="dl-comp-kit-demo-use__subtitle">vue.config.js</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="javascript">
              const CopyWebpackPlugin = require('copy-webpack-plugin');          
              const webpack = require('webpack');
    
              // In the webpack plugins section, add necessary mounted folders used by Cesium to load assets, etc
    
              configureWebpack : {          
                ...
                plugins : [
                  ...
                  // Copy Cesium Assets, Widgets, and Workers to a static directory
                  new CopyWebpackPlugin([{ from : 'node_modules/cesium/Build/Cesium/Workers', to : 'Workers' }]),
                  new CopyWebpackPlugin([{ from : 'node_modules/cesium/Build/Cesium/ThirdParty', to : 'ThirdParty' }]),
                  new CopyWebpackPlugin([{ from : 'node_modules/cesium/Build/Cesium/Assets', to : 'Assets' }]),
                  new CopyWebpackPlugin([{ from : 'node_modules/cesium/Build/Cesium/Widgets', to : 'Widgets' }]),
                  new webpack.DefinePlugin({
                    CESIUM_BASE_URL : JSON.stringify('/')
                  })
                  ...
                ]      
            </code>
        </pre>
    </div>
    <p>Para que la incrustación de este componente sea más aséptica y no requiera esta configuración, se está considerando poder pasar la ruta 
    de una carpeta en proyecto donde tengamos la librería de cesium via 'prop', o insertar en tiempo de ejecución un nodo html tipo script con el src apuntando a un CDN (carga externa). Se actualizará la info.</p>
    <br>
    <p>El componente queda así listo para funcionar con solo pasar el ION accessToken de Cesium que previamente ha de obtenerse:</p>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="html">
              < dl-ui-cesium-map accessToken="your_access_token" />
            </code>
        </pre>
    </div>
    <br>
    <p>Respecto al <span style="font-weight:bold">LayerTool</span>, ha de saberse que las capas son pasadas via prop 'layers' con el formato especificado más arriba.</p>
    <p>Respecto al <span style="font-weight:bold">DrawTool</span>, ha de saberse que dicha herramienta permite dibujar un polígono ó clicar en el mapa para seleccionar automáticamente la zona administrativa según base de datos de nominatim (openstreetmap). Tras ello, almacena las coordenadas de la forma para poder tratarlas o enviarlas a servidor y analizar su contenido.</p>
    <p>Respecto al <span style="font-weight:bold">PopupTool</span>, ha de saberse que éste puede mostrarse via props, según indicado arriba, aunque está diseñado para aparecer automáticamente cuando cambia su contenido (via slot) y en las coordenadas en las que se haga click. Suponiendo que se clica sobre una feature en concreto de una capa wms, podemos actualizar el contenido en una función callback después de consultar servidor.</p>
    <p>No existe parametrización de estilos y apariencia a fecha de hoy, debiendo recurrir a sobreescritura de clases css para cambiar el look.</p>
    <p>Para más opciones o parametrización, ver lista de props y eventos.</p>
    `
  // END META DATA
};
