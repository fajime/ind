import randomId from '../../../mixins/randomId';
import metadata from './_metadata';
export default {
  name   : 'Pane',
  inject : ['requestUpdate', 'onPaneAdd', 'onPaneRemove'],
  mixins : [randomId],
  props  : {
    /** size of panel */
    size : {
      type    : [Number, String],
      default : undefined,
      desc    : 'Tamaño actual del panel en escala 0 -100'
    },
    /** min size of panel */
    minSize : {
      type    : [Number, String],
      default : 0,
      desc    : 'Tamaño mínimo del panel en escala 0 -100'
    },
    /** max size of panel */
    maxSize : {
      type    : [Number, String],
      default : 100,
      desc    : 'Tamaño máximo del panel en escala 0 -100'
    },
    /** title of panel */
    title : {
      type    : String,
      default : undefined,
      desc    : 'Título del panel'
    }
  },
  computed : {
    /**
     * number value of size
     * @return {Number} value
     */
    sizeNumber() {
      return this.size || this.size === 0 ? parseFloat(this.size) : null;
    },
    /**
     * number min value of size
     * @return {Number} value
     */
    minSizeNumber() {
      return parseFloat(this.minSize);
    },
    /**
     * number max value of size
     * @return {Number} value
     */
    maxSizeNumber() {
      return parseFloat(this.maxSize);
    },
    /**
     * detects when pane is collapsed
     * @return {Boolean} value
     */
    isCollapsed() {
      return this.value === 0;
    },
    /**
     * pane id
     * @return {String} random Id generated
     */
    id() {
      return this.randomId;
    }
  },
  watch : {
    /**
     * watch over size
     * @param {Number} size size of panel
     */
    sizeNumber(size) {
      this.requestUpdate({ target : this, size });
    },
    /**
     * watch over min size
     * @param {Number} min min size of panel
     */
    minSizeNumber(min) {
      this.requestUpdate({ target : this, min });
    },
    /**
     * watch over max size
     * @param {Number} max max size of panel
     */
    maxSizeNumber(max) {
      this.requestUpdate({ target : this, max });
    }
  },
  data : () => ({
    style      : {},
    value      : undefined,
    showHeader : true
  }),
  /**
   * override
   * @override
   */
  mounted() {
    this.onPaneAdd(this);
    const containsSubPanels = this.$slots
      .default()
      .find(child => child.type?.name === 'dl-ui-split-panes');
    this.showHeader = this.title && !containsSubPanels;
  },
  /**
   * override
   * @override
   */
  beforeDestroy() {
    this.onPaneRemove(this);
  },
  methods : {
    /**
     * update called from the split panes component.
     * @param {String} style Style string o apply
     * @param {Number} value value of width or height from 0 to 100
     */
    update(style, value) {
      this.style = style;
      this.value = value;
    }
  },
  // DEMO META DATA
  ...metadata
};
