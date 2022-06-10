import dlUiMenuRootItem from './dl-ui-menu-root-item';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-menu',
  components : {
    'dl-ui-menu-root-item' : dlUiMenuRootItem
  },
  emits : ['itemClicked'],
  props : {
    /**
     * Init value.
     */
    config : {
      type    : Object,
      default : undefined,
      desc    : 'Configuración de items de menú'
    },
    /**
     * direction H/V.
     */
    direction : {
      type      : String,
      default   : 'horizontal',
      desc      : 'Orientación del menu horizontal/vertical',
      validator : value => ['horizontal', 'vertical'].includes(value)
    },
    /**
     * sense topDown / downTop.
     */
    sense : {
      type      : String,
      default   : 'topDown',
      desc      : 'Sentido del menu horizontal, Vertical',
      validator : value => ['topDown', 'downTop'].includes(value)
    }
  },
  computed : {
    /** detect ho to open child components
     * @return {String} value
     */
    childOpenTo() {
      return this.direction === 'horizontal' ? this.sense === 'downTop' ? 'top' : 'bottom' : 'right';
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
    };
  },
  methods : {
    /**
     * Manage click event on items.
     * Launch item function and/or route with parameters if apply
     * Fire event itemClicked to application
     *
     * @param {Object} item Menu item clicked
     */
    onItemClicked(item) {
      this.$emit('itemClicked', item);
    }
  },
  ...metadata
};
