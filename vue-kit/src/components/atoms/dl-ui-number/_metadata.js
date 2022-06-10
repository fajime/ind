// DEMO META DATA
export default {
  titleName            : 'Number',
  nameJS               : 'DlUiNumber',
  type                 : 'atom',
  nameScssMixin        : 'number-style-config',
  nameScssDefaultClass : 'dl-ui-number',
  nameScssMixinFile    : 'number',
  description          : `<p>Los number-input nos permiten efectuar una entrada numérica en nuestras aplicaciones.</p>
    <p>Éstos incluyen validación incorporada para rechazar entradas no numéricas. Se provee de flechas de pasos para permitir al usuario incrementar y decrementar el valor usando su ratón o símplemente pulsando con la punta del dedo.</p>
    <p>Se pueden establecer valores máximo, mínimo, el salto entre valores, etc</p>
    <p>Emite el evento input cuando cambia su contenido y lleva asociadas transiciones cuando cambia alguna propiedad.</p>`,
  // Could we deduce/extract the slots from the html code?
  slots  : [],
  // Could we deduce/extract the events from the component code?
  events : [
    {
      name      : 'update:modelValue',
      condition :
          'Cuando el usuario escribe dentro del campo o usa los botones para cambiar el valor.',
      payload : 'Evento nativo de input.'
    }
  ],
  scss : [
    {
      name    : 'width',
      default : '100%',
      desc    : 'Anchura del componente'
    }, {
      name    : 'height',
      default : 'auto',
      desc    : 'Altura del input'
    }, {
      name    : 'label::top',
      default : '-20px',
      desc    : 'Margen superior de la etiqueta'
    }, {
      name    : 'arrow::margin',
      default : '6px',
      desc    : 'Margen icon buttons'
    }, {
      name    : 'label::color',
      default : '$color-base-highlight-02',
      desc    : 'Color de la etiqueta'
    }, {
      name    : 'label::size',
      default : '12px',
      desc    : 'Color de la etiqueta'
    }, {
      name    : 'border',
      default : '1px solid $color-surface-06',
      desc    : 'Borde de la caja'
    }, {
      name    : 'background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo de la caja'
    }, {
      name    : 'color',
      default : '$color-base-highlight-03k',
      desc    : 'Color tes texto de entrada'
    }, {
      name    : 'padding',
      default : '8px 9px',
      desc    : 'Padding de la caja'
    }, {
      name    : 'help::color',
      default : '$color-base-highlight-02',
      desc    : 'Colcor del texto de ayuda'
    }, {
      name    : 'help::background',
      default : 'transparent',
      desc    : 'Color de fondo del texto de ayuda'
    }, {
      name    : 'help::margin-top',
      default : '10px',
      desc    : 'Separación entte el texto de ayuda y la caja'
    }
  ],
  notes : undefined
  // END META DATA
};
