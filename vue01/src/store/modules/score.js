export default {
  state : {
    /** teams */
    teams        : [],
    /** team score */
    teamScore    : [],
    /** team ranking */
    teamRanking  : [],
    /** student score */
    studentScore : [],
    /** team info */
    teamInfo     : {}
  },
  getters : {
    getTeams        : state => state.teams,
    getTeamInfo     : state => state.teamInfo,
    getTeamScore    : state => state.teamScore,
    getTeamRanking  : state => state.teamRanking,
    getStudentScore : state => state.studentScore
  },
  mutations : {
    /**
     * set value of teams
     *
     * @param {Object} state State of app
     * @param {String} value Value to save
     */
    setTeams(state, value) {
      state.teams = value;
    },
    /**
     * set value of teams
     *
     * @param {Object} state State of app
     * @param {String} value Value to save
     */
    setTeamInfo(state, value) {
      state.teamInfo[value.idTeam] = value;
    },
    /**
     * set value of team score
     *
     * @param {Object} state State of app
     * @param {String} value Value to save
     */
    setTeamScore(state, value) {
      state.teamScore = value;
    },
    /**
     * set value of team score
     *
     * @param {Object} state State of app
     * @param {String} value Value to save
     */
    setTeamRanking(state, value) {
      state.teamRanking = value;
    },
    /**
     * set value of student score
     *
     * @param {Object} state State of app
     * @param {String} value Value to save
     */
    setStudentScore(state, value) {
      state.studentScore = value;
    }
  }
};
