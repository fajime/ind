// DEMO META DATA
export default {
  titleName            : 'Accordion List',
  nameJS               : 'DlUiAccordionList',
  type                 : 'organism',
  nameScssMixin        : 'accordion-list-style-config',
  nameScssDefaultClass : 'dl-ui-accordion-list',
  nameScssMixinFile    : 'accordion-list',
  description          : `<p> El componente Accordion List tiene su utilidad cuando es necesario mostrar varia información y nos
    permite hacerlo mediante distintos acordeones agrupados </p>
    <p> Este componente tendrá una carga dinámica dependiendo de cuantos acordeones queramos usar. 
    Además, permite personalizar los parámetros que serán mostrados en dichas propiedades si se quiere que no vengan con
    un Valor por defecto simplemente cargándolos como propiedades</p><br>
    <p> También se puede elegir si se quiere mostrar solo un acordeón de la lista abierto o varios. En caso de ser uno, se dejará
    el primero de la lista abierto y se cerrarán los demás. </p> 
    <p>Se puede seleccionar que se desactive toda la lista de acordeones entera.</p>`,
  slots  : [],
  events : [
    {
      name      : 'toggle',
      condition :
          'Cuando el usuario pulsa sobre la cabecera o cambia el valor externamente de show',
      payload :
          'Id del elemento pulsado y nuevo valor del estado del accordeon. <span class="demo__md--syntax">{ id : this.id, value : newValue }</span>'
    }
  ],
  scss : [
    {
      name    : 'width',
      default : '100%',
      desc    : 'Ancho que ocupa la lista'
    },
    {
      name    : 'border',
      default : '0',
      desc    : 'Borde del la lista'
    },
    {
      name    : 'border-radius',
      default : '0',
      desc    : 'Propiedad border radius del borde de la lista'
    },
    {
      name    : 'Padding',
      default : '0',
      desc    : 'Propiedad padding de la lista'
    },
    {
      name    : 'background',
      default : '$color-surface-01k',
      desc    : 'Color del fondo de la lista por defecto'
    },
    {
      name    : 'disable::background',
      default : '$color-surface-05',
      desc    : 'Color del fondo de la lista en estado disable'
    },
    {
      name    : 'disable::opacity',
      default : '0.6',
      desc    : 'Opacidad otorgada a la lista en estado disable'
    }
  ],
  notes : `<p> A continuación se muestra un ejemplo de cómo cargar la propiedad de accordions donde se especificará 
    por cada una de ellos, un título, un icono a mostrar, el contenido del slot, una clase personalizada 
    y si debe mostrarse desplegado por defecto o no. </p>
  
    <pre>
      <code class="javascript">
      accordions : {
        type : Array,
  
        //En el código del componente aquí estaría el metodo Validator() que valida que los acordeones insertados esten correctamente insertados.
  
      default : () => [{
        title       : 'Title 1',
        icon        : 'dl-ids-icon-user-single-outlined',
        slot        : 'Accordion 1',
        customClass : 'dl-ui-accordion  dl-ui-custom-accordion',
        show        : true
      }]
  
      </code>
  
    </pre>`
};
