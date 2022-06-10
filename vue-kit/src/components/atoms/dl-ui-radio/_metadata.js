// DEMO META DATA
export default {
  titleName            : 'Radio',
  nameJS               : 'DlUiRadio',
  type                 : 'atom',
  nameScssMixin        : 'radio-style-config',
  nameScssDefaultClass : 'dl-ui-radio',
  nameScssMixinFile    : 'radio',
  description          : `<p>El radio button permite al usuario escoger un valor único entre varias opciones de modo exclusivo.</p>
    <p>Permite la definición de diferentes estados (hover, focus, active) además de una personalización completa.</p>
    <p>El contenido del label se insertará mediante un slot, y se puede elegir a qué lado del radio quiere visualizarse.</p>
    <p>También se puede elegir que una opción permanezca desactivada mediante el modo disabled.</p>`,
  slots : [
    {
      name  : 'default',
      usage : 'Etiqueta del radio button'
    }
  ],
  events : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario pulsa sobre una de las opciones',
      payload   : 'Valor nuevo seleccionado'
    },
    {
      name      : 'change',
      condition : 'Cuando el valor interno del conjunto de opciones cambia',
      payload   : 'Evento original'
    },
    {
      name      : 'click',
      condition :
          'Cuando el usuario pulsa sobre una de las opciones (emitido junto a `input`)',
      payload : 'Evento original'
    },
    {
      name      : 'focus',
      condition : 'Cuando el item recibe el foco',
      payload   : 'Evento original'
    }
  ],
  scss : [
    {
      name    : 'width',
      default : '20px',
      desc    : 'Diámetro del círculo'
    },
    {
      name    : 'border-color',
      default : '$color-action-primary-active',
      desc    : 'Color del borde'
    },
    {
      name    : 'background-color::hover',
      default : '$color-emphasis-01',
      desc    : 'Color de fondo en estado hover'
    },
    {
      name    : 'item-background::active',
      default : '$color-surface-01k',
      desc    : 'Color de fondo del círculo activo'
    },
    {
      name    : 'item-color::active',
      default : '$color-action-primary-active',
      desc    : 'Color del borde del círculo activo'
    },
    {
      name    : 'item-background::disabled',
      default : '$color-surface-03',
      desc    : 'Color de fondo del círculo disabled'
    },
    {
      name    : 'item-color::disabled',
      default : '$color-action-primary-disabled',
      desc    : 'Color del borde del círculo disabled'
    },
    {
      name    : 'item-background::hover',
      default : '$color-emphasis-01',
      desc    : 'Color de fondo del círculo activo en hover'
    },
    {
      name    : 'item-color::hover',
      default : '$color-action-primary-hover',
      desc    : 'Color del borde del círculo activo en hover'
    },
    {
      name    : 'nh-item-color::hover',
      default : '$color-action-tertiary-hover',
      desc    : 'Color del borde del círculo inactivo en hover'
    },
    {
      name    : 'item-color::focus',
      default : '$color-action-primary-default',
      desc    : 'Color del borde del círculo con foco'
    }
  ],
  notes : undefined
};
