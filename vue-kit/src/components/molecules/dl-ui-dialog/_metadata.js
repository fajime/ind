// DEMO META DATA
export default {
  titleName            : 'Dialog',
  nameJS               : 'DlUiDialog',
  type                 : 'molecule',
  nameScssMixin        : 'dialog-style-config',
  nameScssDefaultClass : 'dl-ui-dialog',
  nameScssMixinFile    : 'dialog',
  description          : `<p>El componente Dialog permite la generación de un diálogo modal personalizable.</p>
  <p>Mediante el paso de parámetros podemos indicar desde cómo queremos que se cierre hasta el tipo y el número de botones.</p>
  <p>La visualización del componente será por delante del resto en primer plano y se puede elegir si se quiere un aspecto modal
  oscurecendo el resto del fondo y si aparece centrado o no.  </p>`,

  // slots: el default and usage
  slots : [
    {
      name  : 'default',
      usage : 'Dialog body content'
    }
  ],
  // events with name, default state and desc
  events : [
    {
      name      : 'update:modelValue',
      condition : 'Define la visibilidad del Dialogo',
      payload   : 'Valor establecido'
    }
  ],
  scss : [
    {
      name    : 'z-index',
      default : '9',
      desc    : 'posicionamiento en el apilamiento de elementos. El dialogo debe aparecer por encima de cualquier otro'
    },
    {
      name    : 'backdrop::z-index',
      default : '99',
      desc    : 'posicionamiento en el apilamiento de elementos. El dialogo debe aparecer por encima de cualquier otro'
    },
    {
      name    : 'width',
      default : '80%',
      desc    : 'Anchura del dialogo'
    }, {
      name    : 'content::z-index',
      default : '100',
      desc    : 'posicionamiento en el apilamiento de elementos. El dialogo debe aparecer por encima de cualquier otro'
    }, {
      name    : 'backdrop::background',
      default : 'rgba(black, 0.25)',
      desc    : 'color de fondo de la capa modal.'
    }, {
      name    : 'background',
      default : '$color-surface-02',
      desc    : 'color de fondo del Dialogo'
    }, {
      name    : 'box-shadow',
      default : '0 2px 8px rgba(black, 0.25)',
      desc    : 'Sombreado del Dialogo'
    }, {
      name    : 'header::background',
      default : '$color-surface-04',
      desc    : 'Color de fondo de la cabecera del Dilogo'
    }, {
      name    : 'header::color',
      default : '$color-base-03k',
      desc    : 'Color del texto de la cabecera'
    }, {
      name    : 'body::color',
      default : '$color-base-03k',
      desc    : 'Color del texto del cuerpo del Dialogo'
    }
  ],
  notes : undefined
};
