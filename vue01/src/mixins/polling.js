import StatusMixin from './services/status';
/**
 * Mixin to manage polling module data service
 */
export default {
  mixins : [StatusMixin],
  /**
   * Override
   *
   * @override
   */
  data() {
    return {
      pollingInterval : undefined
    };
  },
  /**
   * Override
   * @override
   */
  beforeDestroy() {
    this.stopPolling();
  },
  methods : {
    /**
     * Init polling interval
     *
     * @param {Function} fn Function to execute
     */
    initPolling(fn) {
      this.$store.commit('isPolling', true );
      this.pollingInterval = setInterval(() => {
        if (this.$store.getters.isPolling) {
          fn();
        }
      }, this.$store.getters.getPollingInterval);
    },
    /**
     * Stop polling request
     *
     */
    stopPolling() {
      clearInterval(this.pollingInterval);
      this.pollingInterval = undefined;
      this.$store.commit('isPolling', false );
    }
  }
};

