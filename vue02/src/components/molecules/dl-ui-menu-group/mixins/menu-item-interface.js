
export default {
  emits : ['itemClicked'],
  props : {
    /**
     * menu item.
     */
    config : {
      type    : Object,
      default : undefined,
      desc    : 'Configuración del menu item'
    },
    /**
     * index position in parent
     */
    index : {
      type    : Number,
      default : 0,
      desc    : 'Posición del item de menu respecto a la lista de items del contenedor padre'
    },
    /** level of config */
    level : {
      type    : Number,
      default : 0,
      desc    : 'Nivel de anidamiento'
    },
    /** position of possible children */
    childPosition : {
      type    : Object,
      default : () => {},
      desc    : 'Posición de los hijos en caso de existir'
    },
    /**
     * sense topDown / downTop.
     */
    sense : {
      type      : String,
      default   : 'topDown',
      desc      : 'Sentido del grupo hijo desplegable',
      validator : value => ['topDown', 'downTop'].includes(value)
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      showChildren : false
    };
  },
  computed :
    {
    /** get if this item has children configured
     * @returns {Boolean} value
     */
      hasChildren() {
        return !!(this.config.children && this.config.children.length > 0);
      }
    },
  methods : {
    /**
     * close children if were open
     */
    close() {
      if (this.hasChildren) {
        this.showChildren = false;
      }
    }
  }
};
