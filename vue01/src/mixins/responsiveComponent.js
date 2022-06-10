export default {
  /**
   * Override
   * @override
   */
  data() {
    return {
      width          : undefined,
      height         : undefined,
      observer       : undefined,
      callbackResize : undefined
    };
  },
  computed : {
    /**
     * breakpoint applied of component
     * @return {Object} width and height breakpoint
     */
    breakpoint() {
      return {
        width  : (this.width > 1000) ? 'l' : (this.width > 620) ? 'm' : 's',
        height : (this.height > 900) ? 'l' : (this.height > 100) ? 'm' : 's'
      };
    },
    /**
     * size of component
     * @return {Boolean} indicates if this compo is on small size
     */
    isSmallSize() {
      return (this.breakpoint.height === 's' || this.breakpoint.width === 's');
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.width = this.$el.getBoundingClientRect().width;
    this.height = this.$el.getBoundingClientRect().height;
    // initialize the observer on mount
    this.initObserver();
  },
  /**
   * Override
   * @override
   */
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods : {
    /** Resize handler */
    onResize() {
      this.width = this.$el.getBoundingClientRect().width;
      this.height = this.$el.getBoundingClientRect().height;
      if (this.callbackResize) {
        this.callbackResize({ width : this.width, height : this.height });
      }
    },

    /** initObserver */
    initObserver() {
      // eslint-disable-next-line consistent-this
      const vm = this;
      const resizeFn = () => {
        vm.onResize();
      };
      const observer = new ResizeObserver(resizeFn);
      observer.observe(this.$el);
      this.observer = observer;
    }
  }
};
