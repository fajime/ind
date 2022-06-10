export default {
  state : {
    /** Value that contains error string */
    tokenData : undefined
  },
  getters : {
    /**
     * get the tokenData
     * @param {Object} state State of the app
     * @return {String} Value
     */
    getTokenData : state => state.tokenData
  },
  mutations : {
    /**
     * set value of tokenData
     *
     * @param {Object} state State od app
     * @param {Object} value Value to save
     */
    setTokenData(state, value) {
      state.tokenData = value;
    }
  }
};
