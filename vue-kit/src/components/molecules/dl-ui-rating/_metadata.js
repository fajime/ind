// DEMO META DATA
export default {
  titleName            : 'Rating',
  nameJS               : 'DlUiRating',
  type                 : 'molecule',
  nameScssMixin        : 'rating-style-config',
  nameScssDefaultClass : 'dl-ui-rating',
  nameScssMixinFile    : 'rating',
  description          : `<p>El componente Rating es un campo de entrada (input) formado con iconos de estrellas, utilizado comunmente para valorar. </p>
                            <p>La recopilación de comentarios de los usuarios a través de calificaciones es un análisis simple que puede proporcionar muchos 
                            comentarios sobre su producto o aplicación.</p>`,
  slots  : [],
  events : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario pulsa sobre una estrella',
      payload   : 'Valor seleccionado. Null en caso de borrar.'
    }
  ],
  scss : [
    {
      name    : 'disable::opacity',
      default : '0.5',
      desc    : 'Opacidad del componente en estado <span class="demo__md--syntax">disabled</span>'
    },
    {
      name    : 'star::size',
      default : '24px',
      desc    : 'Tamaño de la estrella'
    },
    {
      name    : 'cancel::color',
      default : '$color-status-danger-03',
      desc    : 'Color del icono de cancelar selección'
    },
    {
      name    : 'cancel::hover::color',
      default : '$color-danger-900',
      desc    : 'Color del icono de cancelar selección al posicionar el ratón encima'
    },
    {
      name    : 'star::color',
      default : '$color-surface-06',
      desc    : 'Color de la estrella en estado no activo'
    },
    {
      name    : 'star::hover::color',
      default : '$color-action-primary-hover',
      desc    : 'Color de la estrella en estado no activo al pasar el ratón por encima'
    },
    {
      name    : 'star::active::color',
      default : '$color-action-primary-default',
      desc    : 'Color de la estrella en estado activo'
    },
    {
      name    : 'star::active::hover::color',
      default : '$color-action-primary-hover',
      desc    : 'Color de la estrella en estado activo al pasar el ratón por encima'
    }
  ],
  notes : undefined
};
