
export default {
  state : {
    /** show settings */
    layoutManager : undefined
  },
  getters : {
    getLayoutManager : state => state.layoutManager
  },
  mutations : {
    /**
     * set the object layoutManager used
     *
     * @param {Object} state State od app
     * @param {Boolean} value Value to save
     */
    setLayoutManager(state, value) {
      state.layoutManager = value;
    }
  }
};
