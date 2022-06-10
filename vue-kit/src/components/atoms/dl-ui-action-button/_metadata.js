export default {
  // DEMO META DATA
  titleName            : 'Action Button',
  nameJS               : 'DlUiActionButton',
  type                 : 'atom',
  nameScssMixin        : 'action-button-style-config',
  nameScssDefaultClass : 'dl-ui-action-button',
  nameScssMixinFile    : 'action-button',
  description          : `<p>El componente Action Button, al igual que los botones, permite a los usuarios ejecutar acciones, y tomar decisiones, 
    con un simple toque.</p></br>
    <p>Este componente implementa un botón de acción.</p></br>
    <p>Permite la definición de diferentes estados (hover, focus, active, disabled y loading) además de una personalización completa.</p>
    <p>Dentro del componente existen dos iconos. Cada uno de ellos tendrá su nombre habitual estilo dl-ui-icon-{nombre del icono}, 
    además, añadiendo la terminación -outlined o -filled después del nombre del icono elegido, podremos disponer de cualquiera de ellos en sus
    distintas versiones.</p>
    <p>Con esto controlamos cómo se ve en los distintos estados anteriormente citados. Podemos elegir cualquier icono del icon set. </p>
    </br>
    <p> El uso del Action Button dependerá de donde queramos usarlo o la acción que queramos comunicar al usuario que puede realizar.</p>
    
    <p>Usualmente están ubicados dentro de tu interfaz, en lugares como:</p>
    <ul>
    <li>Diálogos</li>
    <li>Ventanas modal</li>
    <li>Formularios</li>
    <li>Tarjetas</li>
    <li>Barras de herramientas</li>
    </ul>`,
  events : [
    {
      name      : 'clicked',
      condition : 'Cuando el usuario pulsa sobre el botón',
      payload   :
    'Evento nativo de click. <a href="https://developer.mozilla.org/es/docs/Web/API/Element/click_event">Ver más</a>'
    }
  ],
  scss : [
    {
      name    : 'height',
      default : '32px',
      desc    : 'Altura del botón'
    },
    {
      name    : 'width',
      default : '32px',
      desc    : 'Ancho del botón'
    },
    {
      name    : 'outline',
      default : '0',
      desc    : 'Borde outline'
    }, {
      name    : 'box-shadow',
      default : 'none',
      desc    : 'Sombra'
    },
    {
      name    : 'background',
      default : '$color-action-primary-focus',
      desc    : 'Color de fondo del botón'
    },
    {
      name    : 'border',
      default : '1px solid $color-action-primary-focus',
      desc    : 'Borde del botón'
    },
    {
      name    : 'color',
      default : '$color-action-primary-default',
      desc    : 'Color del icono'
    },
    {
      name    : 'border-radius',
      default : '4px',
      desc    : 'Propiedad <span class="demo__md--syntax">border-radius</span> del botón'
    },
    {
      name    : 'icon::width',
      default : '16px',
      desc    : 'Ancho del icono'
    },
    {
      name    : 'icon::height',
      default : '16px',
      desc    : 'Altura del icono'
    }, {
      name    : 'icon::padding',
      default : '1px',
      desc    : 'Padding del icono'
    },
    {
      name    : 'hover::background',
      default : '$color-action-primary-focus',
      desc    : 'Color de fondo del botón'
    },
    {
      name    : 'hover::border',
      default : '1px solid $color-action-primary-focus',
      desc    : 'Borde del botón'
    },
    {
      name    : 'hover::color',
      default : '$color-action-primary-hover',
      desc    : 'Color del icono'
    }, {
      name    : 'active::background',
      default : '$color-action-primary-focus',
      desc    : 'Color de fondo del botón'
    },
    {
      name    : 'active::border',
      default : '1px solid $color-action-primary-focus',
      desc    : 'Borde del botón'
    },
    {
      name    : 'active::color',
      default : '$color-action-primary-active',
      desc    : 'Color del icono'
    }, {
      name    : 'loading::background',
      default : '$color-action-primary-focus',
      desc    : 'Color de fondo del botón'
    },
    {
      name    : 'loading::border',
      default : '1px solid $color-action-primary-focus',
      desc    : 'Borde del botón'
    },
    {
      name    : 'loading::color',
      default : '$color-action-primary-active',
      desc    : 'Color del icono'
    }, {
      name    : 'focus::background',
      default : '$color-action-primary-focus',
      desc    : 'Color de fondo del botón'
    },
    {
      name    : 'focus::border',
      default : '1px solid $color-action-primary-active',
      desc    : 'Borde del botón'
    },
    {
      name    : 'focus::color',
      default : '$color-action-primary-active',
      desc    : 'Color del icono'
    }, {
      name    : 'disabled::background',
      default : 'transparent',
      desc    : 'Color de fondo del botón'
    },
    {
      name    : 'disabled::border',
      default : '1px solid $color-action-primary-disabled',
      desc    : 'Borde del botón'
    },
    {
      name    : 'disabled::color',
      default : 'transparent',
      desc    : 'Color del icono'
    }
  ],
  notes : 'El componente esta concebido para incorporar de inicio iconos <span class="demo__md--syntax">-outlined</span>. Asi, en modo <span class="demo__md--italic">active</span>, poder cambiarlo a <span class="demo__md--syntax">-filled</span>.'
};

