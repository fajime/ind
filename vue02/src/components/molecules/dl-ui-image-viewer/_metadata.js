// DEMO META DATA
export default {
  titleName            : 'Image Viewer',
  nameJS               : 'DlUiImageViewer',
  type                 : 'molecule',
  nameScssMixin        : 'image-viewer-style-config',
  nameScssDefaultClass : 'dl-ui-image-viewer',
  nameScssMixinFile    : 'image-viewer',
  description          : `<p>El componente image viewer permite la visualiación e interacción con una imagen.</p>`,
  // Could we deduce/extract the slots from the html code?
  slots                : [
    {
      name  : 'default',
      usage : 'Imagen o contenido sobre el que montar el componente'
    }
  ],
  // Could we deduce/extract the events from the component code?
  events : [
    {
      name      : 'scale',
      condition : 'Cuando el usuario modifica el zoom de la imagen',
      payload   : 'Valor de la escala actual'
    }
  ],
  scss : [
    {
      name    : 'background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo del componente'
    },
    {
      name    : 'border',
      default : '1px solid $color-surface-06',
      desc    : 'Borde del componente'
    },
    {
      name    : 'border-radius',
      default : '3px',
      desc    : 'Radio del borde del componente'
    },
    {
      name    : 'preview::background',
      default : '$color-surface-01k',
      desc    : 'Color de fondo del recuadro de previsualización'
    },
    {
      name    : 'preview::border',
      default : '$color-action-primary-active',
      desc    : 'Borde del recuadro de previsualización'
    },
    {
      name    : 'preview::border-radius',
      default : '2px',
      desc    : 'Radio del borde del recuadro de previsualización del componente'
    },
    {
      name    : 'preview::region::background',
      default : 'rgba(230, 90, 90, 0.3)',
      desc    : 'Colro de fondo del recuadro interno de previsualización del componente'
    },
    {
      name    : 'preview::region::border',
      default : 'rgba(230, 90, 90, 0.8)',
      desc    : 'Borde del recuadro interno de previsualización del componente'
    },
    {
      name    : 'preview::region::border-radius',
      default : '2px',
      desc    : 'Radio del borde del recuadro interno de previsualización del componente'
    }
  ],
  notes : undefined
};
