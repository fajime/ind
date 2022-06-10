
import { defineAsyncComponent } from 'vue';
import dlUiMenuItemSeparator from './dl-ui-menu-item-separator/index.vue';
const dlUiMenuItem = defineAsyncComponent(() => import('./dl-ui-menu-item/index.vue'));
import metadata from './_metadata';
import ChildPositions from '../../../tools/dom/ChildPositions';

export default {
  name       : 'dl-ui-menu-group',
  components : {
    'dl-ui-menu-item'           : dlUiMenuItem,
    'dl-ui-menu-item-separator' : dlUiMenuItemSeparator
  },
  emits : ['itemClicked'],
  props : {
    /**
     * Init value.
     */
    config : {
      type    : Object,
      default : undefined,
      desc    : 'Inicio menu'
    },
    /** offset of container */
    offset : {
      type    : Object,
      default : {},
      desc    : 'Desplazamiento'
    },
    /** level of config */
    level : {
      type    : Number,
      default : 0,
      desc    : 'Nivel de anidamiento'
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
      isMounted       : false,
      itemRefs        : [],
      childPositions  : null,
      parentContainer : null
    };
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.isMounted = true;
    this.childPositions = new ChildPositions();
    this.parentContainer = this.childPositions.getParentContainer(this.$refs.group);

  },
  computed :
  {
    /**
     * get position to place child group
     * @returns {Object} Value
     */
    childPosition() {
      if (this.isMounted) {

        return this.getChildPosition(this.$refs.group);
      }
      else {
        return { };
      }
    },
    /**
     * get computed style
     * @returns {String} Style string computed
     */
    computedStyle() {
      let style = '';
      if (this.offset.left !== undefined) {
        style += `left: ${this.offset.left}px; `;
      }
      if (this.offset.right !== undefined) {
        style += `right: ${this.offset.right}px; `;
      }
      if (this.offset.top !== undefined) {
        style += `top: ${this.offset.top}px; `;
      }
      if (this.offset.bottom !== undefined) {
        style += `bottom: ${this.offset.bottom}px; `;
      }
      return style;
    }
  },
  /**
   * override
   * @override
   */
  beforeUpdate() {
    this.itemRefs = [];
  },
  methods : {
    /**
     * Add ref to element
     * @param {Object} el element
     */
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el);
      }
    },
    /**
     * item clicked listener
     * @param {Object} itemConfig itemConfig clicked
     */
    onItemClicked(itemConfig) {
      this.$emit('itemClicked', itemConfig);
    },
    /**
     * close other subgroups opened
     * @param {Object} itemConfig itemConfig clicked
    */
    closeOthers(itemConfig) {
      this.itemRefs.forEach(item => {
        if (item.index !== itemConfig.index[0]) {
          item.close();
        }
      });
    },
    /**
     * calculate child position
     * @param {Object} groupElement ref group element
     * @return {Object} value
    */
    getChildPosition(groupElement) {

      const parentContainer = this.childPositions.getParentContainer(this.$refs.group);

      const value = { };
      value.left = this.childPositions.getChildLeftPosition(groupElement, parentContainer); ;

      if (this.sense === 'topDown') {
        value.top = 0;
      }
      else {
        value.bottom = 0;
      }

      return value;
    }
  },
  ...metadata
};
