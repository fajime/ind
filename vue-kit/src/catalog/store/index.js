import { createStore } from 'vuex';

const store = createStore({
  // eslint-disable-next-line require-jsdoc
  state() {
    return {
      // package.json file
      appVersion : process.env.APP_VERSION,
      appLang    : localStorage.language
    };
  },
  getters : {
    getAppVersion : state => state.appVersion,
    getAppLang    : state => state.appLang
  },
  mutations : {
    /**
     * appLang mutation
     * @param {*} state State
     * @param {*} lang language
     */
    changeLang(state, lang) {
      // mutate state
      state.appLang = lang;
    }
  },
  actions : {
  },
  modules : {
  }
});

export default store;
