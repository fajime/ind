export default {
  // DEMO META DATA
  titleName            : 'Avatar',
  nameJS               : 'DlUiAvatar',
  type                 : 'atom',
  nameScssMixin        : 'avatar-style-config',
  nameScssDefaultClass : 'dl-ui-avatar',
  nameScssMixinFile    : 'avatar',
  description          : `<p>El componente Avatar representa personas usando iconos, etiquetas e imágenes.`,
  events               : [
  ],
  scss : [
    {
      name    : 'width',
      default : '42px',
      desc    : 'Altura del componente'
    },
    {
      name    : 'height',
      default : '42px',
      desc    : 'Altura del componente'
    },
    {
      name    : 'font-size',
      default : '18px',
      desc    : 'Tamaño de la fuente'
    }
  ],
  notes : 'En tipo de Avatar letter, las letras se muestran según la siguiente lógica, Caso 1: Si en el parámetro van 1 ó 2 caractéres, se mostrarán exáctamente como viene el parámetro. Caso 2: Si el parámetro tiene más de 2 caractéres, solo se mostrarán los 2 primeros y en mayúsculas. Caso 3: Si el parámetro contiene 2 palabras, se mostrará en mayúsculas la primera letra de cada palabra.'
};

