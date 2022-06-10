// DEMO META DATA
export default {
  titleName            : 'Dropdown',
  nameJS               : 'DlUiDropdown',
  type                 : 'atom',
  nameScssMixin        : 'dropdown-style-config',
  nameScssDefaultClass : 'dl-ui-dropdown',
  nameScssMixinFile    : 'dropdown',
  description          :
      '<p>El componente <b>dropdown</b> nos permite al ser presionada se despliega un componente como una lista, lista múltiple o lista de arbol, o reutilizar con otro componente que necesite desplegar al hacer click.</p>',

  events : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario pulsa sobre un valor del desplegable',
      payload   : 'Valor nuevo seleccionado'
    },
    {
      name      : 'click',
      condition : 'Cuando el usuario pulsa sobre el desplegable',
      payload   : 'Evento original y nuevo valor seleccionado.'
    },
    {
      name      : 'change',
      condition : 'Cuando el valor del desplegable cambia.',
      payload   : 'Evento original y nuevo valor seleccionado.'
    },
    {
      name      : 'showed',
      condition : 'Cuando el valor del desplegable cambia.',
      payload   : 'Evento original y nuevo valor seleccionado.'
    },
    {
      name      : 'hide',
      condition : 'Cuando el valor del desplegable cambia.',
      payload   : 'Evento original y nuevo valor seleccionado.'
    },
    {
      name      : 'blur',
      condition : 'Cuando el valor del desplegable cambia.',
      payload   : 'Evento original y nuevo valor seleccionado.'
    },
    {
      name      : 'press:enter',
      condition : 'Cuando el valor del desplegable cambia.',
      payload   : 'Evento original y nuevo valor seleccionado.'
    }
  ],
  scss : [
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
      default : '$color-action-primary-disabled',
      desc    : 'Color del separador de elementos'
    },
    {
      name    : 'item::text-decoration-line',
      default : 'underline',
      desc    : 'Estilo de la linea del item'
    },
    {
      name    : 'item::color',
      default : '$color-action-primary-hover',
      desc    : 'Color del elemento de navegación'
    },
    {
      name    : 'item::color::active',
      default : '$color-action-primary-hover',
      desc    : 'Color del elemento en estado activo'
    },
    {
      name    : 'item::color::inactive',
      default : '$color-base-02',
      desc    : 'Color del elemento en estado inactivo'
    },
    {
      name    : 'icon::color',
      default : '$color-action-primary-hover',
      desc    : 'Color del icono'
    }
  ],
  notes : `<p>Este componente via mixin nos permite modificar múltiple atributos para cambiar su aspecto.</p>
    <p>A continuación se muestra un ejemplo de uso:</p>
    <div class="dl-comp-kit-demo-use__subtitle">homeIconConfig</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
        <code class="javascript">
        {
          icon : 'dl-ids-icon-home-outlined',
          to   : '/'
        },
        ...
        </code>
        </pre>
    </div>
    <div class="dl-comp-kit-demo-use__subtitle">model</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
          <code class="javascript">
          [{
            to   : '#',
            item : 'Text A'
          }, {
            to   : '#',
            item : 'Text A'
          }, {
            to   : '#',
            item : 'Text A'
          }]
          ...
          </code>
        </pre>
    </div>
    <div class="dl-comp-kit-demo-use__subtitle">separator</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="javascript">
            separator: '/'
            </code>
        </pre>
    </div>
    `
};
