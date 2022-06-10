// DEMO META DATA
export default {
  titleName            : 'Tree',
  nameJS               : 'DlUiTree',
  type                 : 'molecules',
  nameScssMixin        : 'tree-style-config',
  nameScssDefaultClass : 'dl-ui-tree',
  nameScssMixinFile    : 'tree',
  description          : `<p>El tree es un de visualiación de item en árbol, donde todos los elementos son clicables 
                          y configurables y donde los nodos intermedios despliegan el contenido</p>`,
  slots  : [],
  events : [
    {
      name      : 'itemClicked',
      condition : 'Cuando se hace click sobre un elemento del árbol',
      payload   : 'Configuración del elemento seleccionado'
    }
  ],
  scss : [
  ],
  notes : undefined
};
