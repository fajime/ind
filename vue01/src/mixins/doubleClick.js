
export default {
  /**
   * Override
   * @override
   */
  data() {
    return {
      delay               : 350,
      elementsClicked     : [],
      doubleClickCallback : undefined
    };
  },
  methods : {
    /**
     * check clicks over components and raise callback if its necessary
     * @param {Object} event event detected
     */
    processDoubleClick(event) {
      const elementCLicked = event.target;
      let elementClickedPrev = this.elementsClicked.find(x => x.el === elementCLicked);
      if (!elementClickedPrev) {
        elementClickedPrev = {
          el     : elementCLicked,
          clicks : 0,
          timer  : undefined
        };
        this.elementsClicked.push(elementClickedPrev);
      }
      elementClickedPrev.clicks++;
      if (elementClickedPrev.clicks === 1) {
        elementClickedPrev.timer = setTimeout( () => {
          elementClickedPrev.clicks = 0;
        }, this.delay);
      }
      else if (elementClickedPrev.clicks > 1) {
        clearTimeout(elementClickedPrev.timer);
        elementClickedPrev.timer = undefined;
        elementClickedPrev.clicks = 0;
        this.doubleClickCallback(event);
      }
    }
  }
};
