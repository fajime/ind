// DEMO META DATA
export default {
  titleName            : 'Listbox',
  nameJS               : 'DlUiListbox',
  type                 : 'atom',
  nameScssMixin        : 'listbox-style-config',
  nameScssDefaultClass : 'dl-ui-listbox',
  nameScssMixinFile    : 'listbox',
  description          : `<p>El listbox es un elemento de control gráfico que permite al usuario seleccionar una o más opciones (cuenta con opción múltiple) de un desplegable.</p>
    <p>Es una lista que puede reutilizarse como subcomponente de otros, como el select o multiselect, o en necesidades de selección de item/s.</p>`,
  slots  : [],
  events : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario selecciona un valor de la lista',
      payload   : 'Valor seleccionado'
    },
    {
      name      : 'mounted',
      condition : 'Cuando el componente fue montado, se utiliza en los select',
      payload   : 'Montado'
    },
    {
      name      : 'focused',
      condition : 'Cuando entra en foco algún elemento de la lista',
      payload   : 'En foco'
    }
  ],
  scss : [
    {
      name    : 'width',
      default : '210px',
      desc    : 'Anchura del select'
    },
    {
      name    : 'background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo del componente'
    },
    {
      name    : 'color',
      default : '$color-action-tertiary-hover',
      desc    : 'Color del texto'
    },
    {
      name    : 'border',
      default : 'none',
      desc    : 'Borde del componente'
    },
    {
      name    : 'border-radius',
      default : '3px',
      desc    : 'Radio del borde del componente'
    },
    {
      name    : 'box-shadow',
      default :
          '(0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12))',
      desc : 'Sombra del componente'
    },
    {
      name    : 'padding',
      default : '4px 8px',
      desc    : 'Pading del contendor principal'
    },
    {
      name    : 'item::padding',
      default : '8px 16px',
      desc    : 'Pading de cada elemento de opción'
    },
    {
      name    : 'item::background',
      default : 'transparent',
      desc    : 'Fondo de cada elemento de opción'
    },
    {
      name    : 'item::color',
      default : '$color-base-02',
      desc    : 'Color de letra de cada elemento de opción'
    },
    {
      name    : 'item::border-radius',
      default : '4px',
      desc    : 'Radio del borde de cada elemento de opción'
    },
    {
      name    : 'item::height',
      default : '32px',
      desc    : 'Altura de cada elemento de opción'
    },
    {
      name    : 'active::item::background',
      default : '$color-base-highlight-02',
      desc    : 'Fondo de cada elemento de opción en estado activo'
    },
    {
      name    : 'active::item::color',
      default : '$color-base-contrast',
      desc    : 'Color de la letra decada elemento de opción en estado activo'
    },
    {
      name    : 'disabled::item::color',
      default : '$color-action-primary-disabled',
      desc    : 'Color de la letra decada elemento de opción en estado deshabilitado'
    },
    {
      name    : 'hover::item::background',
      default : '$color-primary-100',
      desc    : 'Fondo de cada elemento de opción en estado hover'
    },
    {
      name    : 'hover::item::color',
      default : '$color-base-highlight-02',
      desc    : 'Color de la letra decada elemento de opción en estado hover'
    },
    {
      name    : 'item::icon::size',
      default : '16px',
      desc    : 'Tamaño del icono'
    }
  ],
  notes : undefined
};
