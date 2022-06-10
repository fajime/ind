// DEMO META DATA
export default {
  titleName            : 'Icon',
  nameJS               : 'DlUiIcon',
  type                 : 'atom',
  nameScssMixin        : 'icon-style-config',
  nameScssDefaultClass : 'dl-ui-icon',
  nameScssMixinFile    : 'icon',
  description          : `<p>Este componente representa un icono. Para optimizar el tamaño de los recursos los iconos utilizan el formato SVG. 
                              El componente, empleando una técnica de generación de símbolos dentro de un 
                              <span class="demo__md--italic">sprite</span> de SVG (<a href="https://css-tricks.com/svg-sprites-use-better-icon-fonts/" target="_blank">link</a>), 
                              es capaz de pintar el icono simplemente indicándole el  <span class="demo__md--syntax">id</span> del icono. </p>
                              <p>El objeto SVG que se representa dentro debe estar cargado previamente dentro del componente <span class="demo__md--syntax">dl-ui-icons-set</span>.
                              Este componente actua solo como contendor.</p><p>Para cambiar el color del icono basta con determinar un color en la propiedad 
                              <span class="demo__md--syntax">fill</span> de cssdel componente o de algunos de los nodos padres, ya que la propiedad fill es heredable entre elemenotos.</p>  `,
  slots  : [],
  events : [],
  scss   : [
    {
      name    : 'height',
      default : '24px',
      desc    : 'Altura de la caja donde se representa el icono'
    },
    {
      name    : 'width',
      default : '24px',
      desc    : 'Anchura de la caja donde se representa el icono'
    },
    {
      name    : 'padding',
      default : '3px',
      desc    : 'Padding interno del icono'
    },
    {
      name    : 'color',
      default : '$color-base-highlight-03k',
      desc    : 'Color del icono'
    }
  ],
  notes : undefined
};
