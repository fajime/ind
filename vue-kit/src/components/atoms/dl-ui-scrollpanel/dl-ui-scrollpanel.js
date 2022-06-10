import metadata from './_metadata';

export default {
  name  : 'dl-ui-scrollpanel',
  emits : [],
  props : {
    /**
     * height scroll
     */
    scrollHeight : {
      type    : String,
      default : '150px'
    },
    /**
     * top scroll
     */
    scrollTop : {
      type    : Number,
      default : 0
    }
  },
  watch : {
    /**
     * watch top scroll
     * @param {Number} newValue new value
     */
    scrollTop(newValue) {
      this.goScrollTo(newValue);
    }
  },
  methods : {
    /**
     * set scroll at position passed by param
      * @param {Number} positionTarget scroll position target
    */
    goScrollTo(positionTarget) {
      const itemsWrapper = this.$refs.itemsWrapper;
      const p1 = itemsWrapper.scrollTop;
      const h = itemsWrapper.offsetHeight;
      const p3 = p1 + h;

      if (itemsWrapper) {
        if ((positionTarget <= p1) || (positionTarget >= p3)) {
          itemsWrapper.scrollTo(0, positionTarget);
        }
      }
    }
  },
  ...metadata
};
