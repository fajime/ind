
export default {
  state : {
    /** toggle to show in snack  */
    showSnack    : false,
    /** text array to show in snack  */
    snackText    : [],
    /** snack type to show in snack  */
    snackType    : undefined,
    /** snack timeout to hide snack  */
    snackTimeout : 3000
  },
  getters : {
    showSnack       : state => state.showSnack,
    getSnackText    : state => state.snackText,
    getSnackType    : state => state.snackType,
    getSnackTimeout : state => state.snackTimeout
  },
  mutations : {
    /**
     * show or hide the snack
     *
     * @param {Object} state State od app
     * @param {Boolean} value Value to save
     */
    hideSnack(state) {
      state.showSnack = false;
    },
    /**
     * set the object layoutManager used
     *
     * @param {Object} state State od app
     * @param {Boolean} value Value to save
     */
    showSnack(state, { text, type, timeout }) {
      if (Array.isArray(text)) {
        state.snackText = text;
      }
      else {
        state.snackText = [text];
      }
      state.snackType = type;
      state.snackTimeout = timeout ? timeout : 3000;
      state.showSnack = true;
    }
  }
};
