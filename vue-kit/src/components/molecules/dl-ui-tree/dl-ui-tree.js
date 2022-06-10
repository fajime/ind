
import DlUiIcon from '../../atoms/dl-ui-icon';
import DlUiTreeNode from './dl-ui-tree-node.vue';
import metadata from './_metadata';

export default {
  name       : 'DLUiTree',
  components : {
    'dl-ui-icon'      : DlUiIcon,
    'dl-ui-tree-node' : DlUiTreeNode
  },
  emits : ['itemClicked'],
  props : {
    /**
     * Init value.
     */
    config : {
      type    : Object,
      default : undefined,
      desc    : 'Objeto de configuración'
    },
    /** level of config */
    level : {
      type    : Number,
      default : -1,
      desc    : 'Nivel de anidamiento'
    },
    /** index of element */
    index : {
      type    : Number,
      default : 0,
      desc    : 'Indice del elemento'
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      childActiveConfig : [],
      childActiveIndex  : false
    };
  },
  methods : {
    /** click over item event listener
     * @param {Number} nodeIndex Index to evaluate
     * @returns {Array} Array of indexes
     */
    getChildrenNodeActiveIndex(nodeIndex) {
      let value = [];
      if (this.childActiveConfig[0] === nodeIndex) {
        value = [...this.childActiveConfig];
        value.shift();
      }
      return value;
    },
    /** click over item event listener
     * @param {Object} itemConfig Item config clicked
   */
    onItemClicked(itemConfig) {
      this.childActiveConfig = [...itemConfig.index];
      this.childActiveIndex = this.childActiveConfig[0];
      this.$emit('itemClicked', itemConfig);
    },
    /**
       * Deactivate any leaf node
   */
    deactivateLeaf() {
      this.leafActiveConfig = [];
    }
  },
  ...metadata
};
