// DEMO META DATA
export default {
  titleName            : 'Treebox',
  nameJS               : 'DlUiListbox',
  type                 : 'atom',
  nameScssMixin        : 'treebox-style-config',
  nameScssDefaultClass : 'dl-ui-treebox',
  nameScssMixinFile    : 'treebox',
  description          : `<p>El treebox es un elemento de control gráfico que permite al usuario seleccionar una o más opciones (cuenta con opción múltiple) de un desplegable.</p>
    <p>Es una lista que puede reutilizarse como subcomponente de otros, como el select o multiselect, o en necesidades de selección de item/s.</p>`,
  slots  : [],
  events : [
    {
      name      : 'update:modelValue',
      condition : 'Cuando el usuario selecciona un valor de la lista',
      payload   : 'Valor seleccionado'
    }
  ],
  scss : [
  ],
  notes : undefined
};
