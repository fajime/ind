export default {
  // DEMO META DATA
  titleName            : 'Avatar-group',
  nameJS               : 'DlUiAvatar-group',
  type                 : 'atom',
  nameScssMixin        : 'avatar-group-style-config',
  nameScssDefaultClass : 'dl-ui-avatar-group',
  nameScssMixinFile    : 'avatar-group',
  description          : `<p>Se puede mostrar un conjunto de Avatares juntos usando el componente AvatarGroup.`,
  events               : [
  ],
  scss : [
    {
      name    : 'border',
      default : '2px solid $color-surface-01k',
      desc    : 'Borde del elemento Avatar'
    },
    {
      name    : 'space',
      default : '-14px',
      desc    : 'Separación horizontal entre cada elemento Avatar'
    }
  ]
};

