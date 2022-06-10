// DEMO META DATA
export default {
  titleName            : 'Tab',
  nameJS               : 'DlUiTab',
  type                 : 'atom',
  nameScssMixin        : '',
  nameScssDefaultClass : '',
  nameScssMixinFile    : '',
  description          : `Se trata de un componente atómico que sirve para encapsular la información de visualización de una pestaña dentro del componente <span class="demo__md--syntax">dl-ui-tabs</span>`,
  // Could we deduce/extract the slots from the html code?
  slots                : [
    {
      name  : 'default',
      usage : 'Contenido de la tab'
    }
  ],
  // Could we deduce/extract the events from the component code?
  events : [
    {
      name      : 'update:selected',
      condition :
          'Cuando una pestaña es seleccionada',
      payload : 'Valor booleano que indica que la pestaña está activa'
    }
  ],
  scss  : [],
  notes : `Este componente que no es configurable, se limita a utilizarse para englobar el contenido de una pestaña y poder manjear  su 
    configuración dentro del componente pestañas <span class="demo__md--syntax">dl-ui-tabs</span>`
  // END META DATA
};
