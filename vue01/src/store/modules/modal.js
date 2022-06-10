export default {
  state : {
    /** Flag to show modal load layout */
    showModalLoadLayout  : false,
    /** Flag to show modal save layout */
    showModalSaveLayout  : false,
    /** Flag to show logout on header */
    showIconLogout       : false,
    /** Flag to show modal logout */
    showModalLogout      : false,
    /** Flag to show modal error */
    showModalLoadMission : false
  },
  getters : {
    /**
     * get the flag to show modal load layout
     * @param {Object} state State of the app
     * @return {Boolean} Value
     */
    showModalLoadLayout  : state => state.showModalLoadLayout,
    /**
     * get the flag to show modal save layout
     * @param {Object} state State of the app
     * @return {Boolean} Value
     */
    showModalSaveLayout  : state => state.showModalSaveLayout,
    /**
     * get the flag to show icon logout in header
     * @param {Object} state State of the app
     * @return {Boolean} Value
     */
    showIconLogout       : state => state.showIconLogout,
    /**
     * get the flag to show modal logout
     * @param {Object} state State of the app
     * @return {Boolean} Value
     */
    showModalLogout      : state => state.showModalLogout,
    /**
     * get the flag to show logut on header
     * @param {Object} state State of the app
     * @return {Boolean} Value
     */
    showModalLoadMission : state => state.showModalLoadMission
  },
  mutations : {
    /**
     * set value to show or hide modal load layout
     *
     * @param {Object} state State od app
     * @param {Boolean} value Value to save
     */
    showModalLoadLayout(state, value) {
      if (value) {
        window.document.body.style.overflow = 'hidden';
      }
      else {
        window.document.body.style.overflow = '';

      }
      state.showModalLoadLayout = value;
    },
    /**
     * set value to show or hide modal save layout
     *
     * @param {Object} state State od app
     * @param {Boolean} value Value to save
     */
    showModalSaveLayout(state, value) {
      if (value) {
        window.document.body.style.overflow = 'hidden';
      }
      else {
        window.document.body.style.overflow = '';

      }
      state.showModalSaveLayout = value;
    },
    /**
     * set value to show or hide logout icon in header
     *
     * @param {Object} state State od app
     * @param {Boolean} value Value to save
     */
    showIconLogout(state, value) {
      state.showIconLogout = value;
    },
    /**
     * set value to show or hide modal logout
     *
     * @param {Object} state State od app
     * @param {Boolean} value Value to save
     */
    showModalLogout(state, value) {
      if (value) {
        window.document.body.style.overflow = 'hidden';
      }
      else {
        window.document.body.style.overflow = '';

      }
      state.showModalLogout = value;
    },
    /**
     * set value to show or hide modal ti load mission
     *
     * @param {Object} state State od app
     * @param {Boolean} value Value to save
     */
    showModalLoadMission(state, value) {
      if (value) {
        window.document.body.style.overflow = 'hidden';
      }
      else {
        window.document.body.style.overflow = '';

      }
      state.showModalLoadMission = value;
    }
  }
};
