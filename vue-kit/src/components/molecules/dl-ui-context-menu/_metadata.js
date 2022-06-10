// DEMO META DATA
export default {
  titleName            : 'Context menu',
  nameJS               : 'DlUiContextMenu',
  type                 : 'molecule',
  nameScssMixin        : 'context-menu-style-config',
  nameScssDefaultClass : 'dl-ui-context-menu',
  nameScssMixinFile    : 'menu',
  description          : 'Componente que muestra un menú contextual sobre cualquier otro elemento, y que permite configurar las acciones a realizar',
  slots                : [{
    name  : '',
    usage : ''
  }],
  events : [
    {
      name      : 'itemClicked',
      condition : 'Cuando el usuario selecciona una acción final del menú',
      payload   : 'Indice del elemento pulsado'
    }
  ],
  scss  : [],
  notes : ``
};
