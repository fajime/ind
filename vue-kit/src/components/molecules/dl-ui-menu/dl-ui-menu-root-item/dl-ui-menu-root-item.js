
import DlUiIcon from '../../../atoms/dl-ui-icon';
import DlUiMenuGroup from '../../dl-ui-menu-group';
import dlUiClosable from '../../../../directives/dl-ui-closable.js';

export default {
  name       : 'dl-ui-menu-root-item',
  components : {
    'dl-ui-icon'       : DlUiIcon,
    'dl-ui-menu-group' : DlUiMenuGroup
  },
  emits      : ['itemClicked'],
  directives : { 'dl-ui-closable' : dlUiClosable },
  props      : {
    /**
     * config menu item.
     */
    config : {
      type    : Object,
      default : () => {},
      desc    : 'Item menu'
    },
    /**
     * index position in parent
     */
    index : {
      type    : Number,
      default : 0,
      desc    : 'Posición del item de menu respecto a la lista de items del contenedor padre'
    },
    /**
     * direction H/V.
     */
    itemOpenTo : {
      type      : String,
      default   : 'bottom',
      desc      : 'Orientación de la apertura del menu',
      validator : value => ['top', 'bottom', 'right'].includes(value)
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
    /** get if this item has children configured
     * @returns {Boolean} value
     */
    hasChildren() {
      return this.config.children && this.config.children.length > 0;
    },
    /**
     * get position to place child
     * @returns {Object} Value
     */
    childPosition() {
      const value = { };
      if (this.isMounted) {
        if (this.itemOpenTo === 'bottom') {
          value.left = 0;
          value.top = this.$refs.item.offsetHeight;
        }
        else if (this.itemOpenTo === 'top') {
          value.left = 0;
          value.bottom = this.$refs.item.offsetHeight;
        }
        else {
          value.left = this.$refs.item.offsetWidth;
          if (this.sense === 'topDown' ) {
            value.top = 0;
          }
          else {
            value.bottom = 0;
          }
        }
      }
      return value;
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.isMounted = true;
  },
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      isMounted    : false,
      showChildren : false
    };
  },
  methods : {
    /**
     * Manage click event on root item
     */
    onRootClick() {
      if (this.config.fn) {
        this.config.fn(...(this.config.fnParams ? this.config.fnParams : []));
      }
      if (this.config.route) {
        this.$router.push({
          name   : this.config.route,
          params : this.config.routeParams ? this.config.routeParams : {}
        });
      }
      if (this.hasChildren) {
        this.showChildren = !this.showChildren;
      }
      else {
        this.$emit('itemClicked', { config : this.config, index : this.index });
      }
    },
    /**
     * item group clicked listener
     * @param {Object} itemConfig Item config clicked
     */
    onItemGroupClicked(itemConfig) {
      itemConfig.index.unshift(this.index);
      this.$emit('itemClicked', { config : this.config, index : [...itemConfig.index] });
      setTimeout(() => {
        this.close();
      }, 200);
    },
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
