// DEMO META DATA
export default {
  titleName            : 'Checkbox Group',
  nameJS               : 'DlUiCheckbox',
  type                 : 'molecule',
  nameScssMixin        : 'checkbox-group-style-config',
  nameScssDefaultClass : 'dl-ui-checkbox-group',
  nameScssMixinFile    : 'checkbox-group',
  description          : `<p>El componente checkbox-group representa un árbol de checkboxes, donde el comportamiento del padre afecta y es afectado por el comportamiento de sus hijos.</p>
    <p>Permite selección simple y múltiple</p>
    <p>Sus principales atributos son disabled y collapsed</p>
    `,
  // slots: with names and kind of usages
  slots : [
    {
      name  : 'parent',
      usage : 'Contenido del padre'
    },
    {
      // eslint-disable-next-line no-template-curly-in-string
      name  : 'child-${index}',
      usage :
          'Slot cuyo contenido se añade a cada uno de los hijos. El valor de <span class="demo__md--syntax">index</span> representa la posición en el array de cada hijo.'
    }
  ],
  events : [
    {
      name      : 'input',
      condition :
          'Cuando el usuario hace click en algun elemento del checkbox group',
      payload : 'Valor modificado y nombre del checkbox pulsado'
    },
    {
      name      : 'group',
      condition : 'Cuando cambia el estado del padre',
      payload   :
          'Nuevo estado del padre en formato <span class="demo__md--syntax">string</span>'
    }
  ],
  // scss (names, default state and descrs)
  scss : [
    {
      name    : 'arrow::color',
      default : '$color-base-02',
      desc    : 'Color del icono que muestra si el contenido está desplegado o no'
    },
    {
      name    : 'arrow::character',
      default : "'\\25bc'",
      desc    : 'Caracter que representa el indicador de desplegado o no'
    },
    {
      name    : 'arrow::rotate',
      default : 'rotate(0deg)',
      desc    : 'Rotación del icono indicador cuando se encuentra desplegado'
    },
    {
      name    : 'arrow::rotate::collapsed',
      default : 'rotate(-90deg)',
      desc    : 'Rotación del icono indicador cuando no se encuentra desplegado'
    }
  ],
  notes :
      'Este componente utiliza internamente el componente <span class="demo__md--syntax">dl-ui-checkbox</span> por lo que se si se desea modificar el aspecto visual de este elemento es necesario pasar al mixin del componente <span class="demo__md--syntax">checkbox-group-style-config</span> un segundo parámetro con la configuración del mixin <span class="demo__md--syntax">checkbox-style-config</span>.'

};
