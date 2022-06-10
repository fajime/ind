
export default {
  /**
   * Plugin install.
   *
   * @param {Object} Vue class reference.
   */
  install(Vue) {
    Vue.prototype.$eventBus = new Vue();
  }
};
