
export default {
  state : {
    /** show settings */
    showSettings : false
  },
  getters : {
    showSettings : state => state.showSettings
  },
  mutations : {
    /**
     * showSettings
     * @param {Object} state  store state
     * @param {String} value value to set
     */
    showSettings(state, value) {
      state.showSettings = value;
    }
  },
  actions : {
  }
};
