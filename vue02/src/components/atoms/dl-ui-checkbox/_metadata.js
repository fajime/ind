// DEMO META DATA
export default {
  titleName            : 'Checkbox',
  nameJS               : 'DlUiCheckbox',
  type                 : 'atom',
  nameScssMixin        : 'checkbox-style-config',
  nameScssDefaultClass : 'dl-ui-checkbox',
  nameScssMixinFile    : 'checkbox',
  description          : `<p>Este componente permite al usuario activar o desactivar una propiedad booleana en un formulario o página web.</p>
    <p>te permite insertar un vector o array de valores</p>
    <p>El atributo value es usado para definr el valor enviado por el checkbox.</p> 
    <p>El atributo checked se usa para indicar que el elemento está seleccionado</p> 
    <p>El atributo indeterminate se usa para indicar que el checkbox esta en un estado indeterminado (en la mayoria de las plataformas, esto dibuja una linea horizontal que atraviesa el checkbox).</p>`,
  // slot: name y tag
  slots : [
    {
      name  : 'default',
      usage : 'Etiqueta del checkbox'
    }
  ],
  // events: names, conditions, descrp
  events : [
    {
      name      : 'update:modelValue',
      condition :
          'Cuando el usuario pulsa sobre el componente, cambiando su valor.',
      payload : 'Valor booleano que indica el nuevo estado'
    },
    {
      name      : 'focus',
      condition : 'Cuando el foco recae sobre el componente.',
      payload   : 'Evento focus.'
    }
  ],
  scss : [
    {
      name    : 'size',
      default : '20px',
      desc    : 'Tamaño del componente'
    },
    {
      name    : 'padding',
      default : '2px',
      desc    : 'padding interno sobre el contenido'
    },
    {
      name    : 'background',
      default : '$color-surface-01k',
      desc    : 'Color del icono en estado desactivado'
    },
    {
      name    : 'border',
      default : '1px solid $color-surface-06',
      desc    : 'Border del componente'
    },
    {
      name    : 'border-radius',
      default : '1px',
      desc    : 'Radio del borde'
    },
    {
      name    : 'hover::background',
      default : '$color-surface-03',
      desc    : 'Color de fondo en hover'
    },
    {
      name    : 'hover::border',
      default : '1px solid $color-base-highlight-02',
      desc    : 'Border del componente en estado hover'
    },
    {
      name    : 'focus::background',
      default : 'transparent',
      desc    : 'Color de fondo en estado foco'
    },
    {
      name    : 'focus::border',
      default : '1px solid $color-surface-06',
      desc    : 'Border del componente en estado foco'
    },
    {
      name    : 'focus::border::outlined',
      default : '1px solid $color-action-primary-default',
      desc    : 'Recuadro exterior al recibir el foco'
    },
    {
      name    : 'disable::background',
      default : '$color-surface-03',
      desc    : 'Color de fondo en estado desactivado'
    },
    {
      name    : 'disable::border',
      default : '1px solid $color-action-primary-disabled',
      desc    : 'Borde del elemento cuando se encuentra desactivado'
    },
    {
      name    : 'checked::background',
      default : '$color-surface-01K',
      desc    : 'Color de fondo en estado checked'
    },
    {
      name    : 'checked::border',
      default : '1px solid $color-action-primary-active',
      desc    : 'Border del componente en estado checked'
    },
    {
      name    : 'checked::color',
      default : '$color-action-primary-active',
      desc    : 'color del icono en estado checked'
    },
    {
      name    : 'indet::background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo en estado indeterminado'
    },
    {
      name    : 'indet::border',
      default : '1px solid $color-action-primary-active',
      desc    : 'Border del componente en estado indeterminado'
    },
    {
      name    : 'indet::color',
      default : '$color-action-primary-active',
      desc    : 'color del icono indeterminado'
    },
    {
      name    : 'checked::focus::background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo en estado activo con foco'
    },
    {
      name    : 'checked::focus::border',
      default : '1px solid $color-action-primary-active',
      desc    : 'Border del componente en estado activo con foco'
    },
    {
      name    : 'checked::focus::outlined::border',
      default : '1px solid $color-action-primary-default',
      desc    : 'Border del recuadro exterior al recibir el foco en estado activo con foco'
    },
    {
      name    : 'checked::focus::color',
      default : '1px solid $color-action-primary-active',
      desc    : 'Color del icono al recibir el foco en estado activo con foco'
    },
    {
      name    : 'checked::hover::background',
      default : ' $color-action-primary-focus',
      desc    : 'Color de fondo en estado activo con hover'
    },
    {
      name    : 'checked::hover::border',
      default : '1px solid $color-action-primary-hover',
      desc    : 'Border del componente en estado activo con hover'
    },
    {
      name    : 'checked::hover::color',
      default : '1px solid $color-action-primary-hover',
      desc    : 'Color del icono en estado activo con hover'
    }
  ],
  notes : undefined
};
