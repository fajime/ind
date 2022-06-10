// DEMO META DATA
export default {
  titleName            : 'Snack',
  nameJS               : 'DlUiSnack',
  type                 : 'molecule',
  nameScssMixin        : 'snack-style-config',
  nameScssDefaultClass : 'dl-ui-snack',
  nameScssMixinFile    : 'snack',
  description          : `<p>El componente snack nos permite cargar un mensaje de aviso sencillo que mostrará temporalmente al usuario información en un formato y posición determinados.</p>`,
  slots                : [],
  events               : [
    {
      name      : 'closed',
      condition :
          'Cuando el usuario pulsa sobre el icono para cerrar el snack, o se cumple el timeout.'
    }
  ],
  scss : [
    {
      name    : 'color',
      default : '#ffffff',
      desc    : 'Color del texto'
    },
    {
      name    : 'info::color',
      default : '$color-status-info-02k',
      desc    : 'Color por defecto'
    },
    {
      name    : 'warning::color',
      default : '$color-status-warning-02k',
      desc    : 'Color en modo warning'
    },
    {
      name    : 'success::color',
      default : '$color-status-success-02k',
      desc    : 'Color en modo OK'
    },
    {
      name    : 'error::color',
      default : '$color-status-danger-02k',
      desc    : 'Color en modo error'
    },
    {
      name    : 'close::size',
      default : '24px',
      desc    : 'Tamaño de la X de cierre'
    },
    {
      name    : 'border',
      default : 'none',
      desc    : 'Borde'
    },
    {
      name    : 'opacity',
      default : '1',
      desc    : 'Opacidad'
    }
  ],
  notes : `<p>Este componente via mixin nos permite modificar múltiple atributos para cambiar su aspecto.</p>
    <p>Nos puede ser util cuando necesitemos mostrar mensajes de aviso o información puntual para mantener informado al usuario en cualquier momento y sitio.</p>
    <p>A continuación se muestra un ejemplo de uso:</p>
    <div class="dl-comp-kit-demo-use__subtitle">show</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="javascript">
            show: true,
            ...
            </code>
        </pre>
    </div>
    <div class="dl-comp-kit-demo-use__subtitle">position</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
          <code class="javascript">
          position: 'relative' || 'absolute' || 'fixed'
          ...
          </code>
        </pre>
    </div>
    <div class="dl-comp-kit-demo-use__subtitle">type</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="javascript">
            type: 'ok' || 'warn' || 'error' || 'info'
            </code>
        </pre>
    </div>
    <div class="dl-comp-kit-demo-use__subtitle">timeout</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="javascript">
            timeout: 2000
            </code>
        </pre>
    </div>
    <div class="dl-comp-kit-demo-use__subtitle">text</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="javascript">
            text: 'Message
            </code>
        </pre>
    </div>`
};
