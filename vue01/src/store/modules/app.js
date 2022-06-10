export default {
  state : {
    /** legends loaded in view */
    appVersion       : process.env.APP_VERSION,
    /** is polling flag */
    polling          : false,
    /** Value that contains polling interval */
    pollingInterval  : 5000,
    /** catalog id */
    catalogId        : 8,
    /** HMI id for queue connect  */
    serverId         : undefined,
    /** connection id  */
    connectionId     : undefined,
    /** user id  */
    userId           : undefined,
    /** mission connected  */
    missionConnected : false

  },
  getters : {
    getAppVersion      : state => state.appVersion,
    isPolling          : state => state.polling,
    getCatalogId       : state => state.catalogId,
    /**
     * get polling interval
     * @param {Object} state State of the app
     * @return {String} Value
     */
    getPollingInterval : state => state.pollingInterval,
    getServerId        : state => state.serverId,
    getConnectionId    : state => state.connectionId,
    getUserId          : state => state.userId,
    isMissionConnected : state => state.missionConnected
  },
  mutations : {
    /**
     * set value of flag to polling
     *
     * @param {Object} state State od app
     * @param {String} value Value to save
     */
    isPolling(state, value) {
      state.polling = value;
    },
    /**
     * set value of polling interval transition
     *
     * @param {Object} state State od app
     * @param {String} value Value to save
     */
    setPollingInterval(state, value) {
      state.pollingInterval = value;
    },
    /**
     * set value of polling interval transition
     *
     * @param {Object} state State od app
     * @param {String} value Value to save
     */
    setCatalogId(state, value) {
      state.catalogId = value;
    },
    setServerId     : (state, value) => state.serverId = value,
    setConnectionId : (state, value) => state.connectionId = value,
    setUserId       : (state, value) => state.userId = value,
    /**
     * set value of flag to polling
     *
     * @param {Object} state State od app
     * @param {String} value Value to save
     */
    isMissionConnected(state, value) {
      state.missionConnected = value;
    }
  }
};
