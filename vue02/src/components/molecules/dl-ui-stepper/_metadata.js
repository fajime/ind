// DEMO META DATA
export default {
  titleName            : 'Stepper',
  nameJS               : 'DlUiStepper',
  type                 : 'molecule',
  nameScssMixin        : 'stepper-style-config',
  nameScssDefaultClass : 'dl-ui-stepper',
  nameScssMixinFile    : 'stepper',
  description          : `<p>Muestra el progreso a través de unos pasos determinados.</p>
    <p>Es un combinador de hermanos adyacentes. Combina dos secuencias de selectores simples que tienen el mismo padre y el segundo debe venir inmediatamente después del primero.</p>
    `,
  // slots vacío
  slots  : [],
  // events with name, default state and desc
  events : [ {
    name      : 'update:modelValue',
    condition :
        'Cuando el usuario pulsa sobre el componente o se cambia desde una propiedad externa',
    payload : 'Valor entero indica el step selecionado'
  }],
  scss : [
    {
      name    : 'marker::size',
      default : '42px',
      desc    : 'Tamaño del marcador'
    }, {
      name    : 'bar::height',
      default : '1px',
      desc    : 'Ancho de la barra de progreso'
    }, {
      name    : 'bar::color',
      default : '$color-surface-contrast',
      desc    : 'Color de la barra de progreso completada'
    }, {
      name    : 'bar::background',
      default : '$color-surface-06',
      desc    : 'Color de fondo la barra de progreso en la parte no completada'
    }, {
      name    : 'bar::border-radius',
      default : '0',
      desc    : 'Radio del borde de la barra'
    }, {
      name    : 'marker::transition-duration',
      default : '50ms',
      desc    : 'Tiempo de transición al cambiar de estado un marcador'
    }, {
      name    : 'bar::transition-duration',
      default : '300ms',
      desc    : 'Tiempo de transición al cambiar la barra progreso al cambiar de step'
    }, {
      name    : 'bar::transition-delay',
      default : '100ms',
      desc    : 'Tiempo de espera transición al cambiar la barra progreso al cambiar de step'
    }, {
      name    : 'bar::transition-timing-function',
      default : 'linear',
      desc    : 'Define como cambian los valores intermedios de las propiedades afectadas (longitud del progreso) en las transiciones.'
    }
  ],
  notes : `
    <p>El objeto se configura cargando un array de Steps con la siguiente estructura general</p>
    <div class="dl-comp-kit-demo-use__title">Step Object</div>
    <div class="dl-comp-kit-demo-use__code">
      <pre>
          <code class="javascript">
          { 
            idx : 0, 
            label : 'STEP 1', 
            iconPending : 'dl-ids-icon-lock-open-outlined', 
            iconComplete: 'dl-ids-icon-lock-close-filled',
            num : 1, 
            complete : false, 
            disabled : false, 
            clickable : true 
          },
          </code>
      </pre>         
    </div>
    <p>Los atributos <span class="demo__md--italic">iconPending</span> y <span class="demo__md--italic">iconComplete</span> solo aplican al <span class="demo__md--syntax">mode='icon'</span>, 
    mientras que el atributo <span class="demo__md--italic">num</span> solo aplica al <span class="demo__md--syntax">mode='numeric'</span>.</p>
`
};
