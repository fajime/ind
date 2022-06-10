/* eslint-disable max-nested-callbacks */
import StatusService from '../../api/services/status';

/**
 * Mixin for the management of services related to login
 */
export default {
  methods : {
    /**
     * Get team score from server
     *
     * @param {Number} idModuleLab id lab to get challenge
     * @return {Promise} Promise of execution
     */
    getTeamScore() {
      const tokenAPI = this.$store.getters.getTokenData.token;
      const basePath = this.apiHostCyber;
      return StatusService.getTeamScore(tokenAPI, basePath)
        .then(response => {
          let rawData;
          if (response.data) {
            rawData = response.data;
          }
          const dataRefined = [];
          rawData.forEach(lab => {
            let labData = dataRefined.find(labAux => labAux.id === lab.id);
            if (!labData) {
              labData = {
                id    : lab.idActivity,
                title : lab.title,
                teams : []
              };
              dataRefined.push(labData);
            }
            lab.labScores.forEach(teamInfo => {
              let teamData = labData.teams.find(team => team.id === teamInfo.extendedScore.team);
              if (!teamData) {
                teamData = {
                  id         : teamInfo.extendedScore.team,
                  name       : teamInfo.extendedScore.teamName,
                  rank       : 0,
                  score      : teamInfo.extendedScore.score,
                  totalScore : teamInfo.extendedScore.totalScore,
                  medal      : teamInfo.extendedScore.medal,
                  idLab      : teamInfo.idModule,
                  challenges : []
                };
                teamInfo.extendedScore.challenges.forEach(challenge => {
                  const completed =
            (challenge.challengeStatusStr === 'FINISHED' ||
            challenge.challengeStatusStr === 'FINISHING' ||
            challenge.challengeStatusStr === 'PATCHED' ||
            challenge.challengeStatusStr === 'HACKED' );
                  const challengeData = {
                    title      : challenge.title,
                    statusStr  : challenge.challengeStatusStr,
                    completed,
                    score      : challenge.score,
                    totalScore : challenge.totalScore,
                    hints      : []
                  };
                  challenge.hints.forEach(hint => {
                    const hintData = {
                      id     : hint.idHint,
                      opened : hint.opened
                    };
                    challengeData.hints.push(hintData);
                  });
                  teamData.challenges.push(challengeData);
                });
                labData.teams.push(teamData);
              }
            });
          });
          /* set ranking by score and time */
          const sortFn = ((a, b) => {
            let value;
            if (a.score < b.score) {
              value = -1;
            }
            else if (a.score > b.score) {
              value = 1;
            }
            return value;
          });
          dataRefined.forEach(labData => {
            labData.teams = labData.teams.sort(sortFn);
            labData.teams.forEach((team, index) => {
              team.rank = index + 1;
            });
          });

          /** team ranking  */
          const teamInfo = this.$store.getters.getTeamInfo;
          let teamRanking = [];
          dataRefined.forEach(course => {
            course.teams.forEach(async courseTeam => {
              let teamData = teamRanking.find(team => team.id === courseTeam.id);
              if (teamData) {
                teamData.score = teamData.score + courseTeam.score;
                teamData.value = teamData.value + courseTeam.score;
                teamData.totalScore = teamData.totalScore + courseTeam.totalScore;
              }
              else {
                teamData = {
                  id         : courseTeam.id,
                  name       : courseTeam.name,
                  rank       : 0,
                  score      : courseTeam.score,
                  value      : courseTeam.score,
                  totalScore : courseTeam.totalScore,
                  teamInfo   : teamInfo[courseTeam.id]
                };
                if (!teamData.teamInfo) {
                  teamData.teamInfo = await this.getTeamInfo(teamData.id);
                }
                teamRanking.push(teamData);
              }
            });
          });
          teamRanking = [...teamRanking].sort(sortFn);

          /* set ranking by score and time */
          const sortByName = ((a, b) => {
            let value;
            if (a.name > b.name) {
              value = -1;
            }
            else if (a.name < b.name) {
              value = 1;
            }
            return value;
          });

          const teams = [...teamRanking].sort(sortByName);

          this.$store.commit('setTeamScore', dataRefined);
          this.$store.commit('setTeams', teams);
          this.$store.commit('setTeamRanking', teamRanking);

          return { dataRefined, teams, teamRanking };
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(new Error('Error while retrieving status info.', error));
          this.$store.commit('showSnack', { text : this.$t('data.retrieving.error'), type : 'error' });
          throw error;
        });
    },
    /**
     * Get team score from server
     *
     * @param {Number} idCatalog id catalog to get ranking
     * @return {Promise} Promise of execution
     */
    getTeamScore2(idCatalog) {
      const tokenAPI = this.$store.getters.getTokenData.token;
      const basePath = this.apiHostCyber;
      return StatusService.getTeamScoreByCatalog(tokenAPI, basePath, idCatalog)
        .then(response => {
          let catalogData;
          if (response.data) {
            catalogData = response.data;
          }
          const dataRefined = [];
          catalogData[0].labScores.forEach(labData => {
            let lab = dataRefined.find(labAux => labAux.id === labData.id);
            if (!lab) {
              lab = {
                id         : labData.idActivity,
                title      : labData.title,
                teamsScore : []
              };
              dataRefined.push(lab);
            }
            labData.extendedScores.forEach(teamLabData => {
              let teamScoreData = lab.teamsScore.find(team => team.id === teamLabData.team);
              if (!teamScoreData) {
                teamScoreData = {
                  id          : teamLabData.team,
                  name        : teamLabData.teamName,
                  rank        : 0,
                  score       : teamLabData.score,
                  totalScore  : teamLabData.totalScore,
                  medal       : teamLabData.medal,
                  idLab       : labData.idModule,
                  hintsOpened : 0,
                  challenges  : []
                };
                lab.teamsScore.push(teamScoreData);
              }
              teamLabData.challenges.forEach(challenge => {
                const completed =
                      (challenge.challengeStatusStr === 'FINISHED' ||
                      challenge.challengeStatusStr === 'FINISHING' ||
                      challenge.challengeStatusStr === 'PATCHED' ||
                      challenge.challengeStatusStr === 'HACKED' );
                const challengeData = {
                  title      : challenge.title,
                  statusStr  : challenge.challengeStatusStr,
                  completed,
                  score      : challenge.score,
                  totalScore : challenge.totalScore,
                  hints      : []
                };
                challenge.hints.forEach(hint => {
                  const hintData = {
                    id     : hint.idHint,
                    opened : hint.opened
                  };
                  if (hint.opened) {
                    teamScoreData.hintsOpened = teamScoreData.hintsOpened + 1;
                  }
                  challengeData.hints.push(hintData);
                });
                teamScoreData.challenges.push(challengeData);
              });
            });
          });
          /** team ranking  */
          const teamInfo = this.$store.getters.getTeamInfo;
          let teamRanking = [];
          dataRefined.forEach( lab => {
            lab.teamsScore.forEach(async teamScore => {
              let teamData = teamRanking.find(team => team.id === teamScore.id);
              if (teamData) {
                teamData.score = teamData.score + teamScore.score;
                teamData.value = teamData.value + teamScore.score;
                teamData.totalScore = teamData.totalScore + teamScore.totalScore;
              }
              else {
                teamData = {
                  id          : teamScore.id,
                  name        : teamScore.name,
                  rank        : 0,
                  score       : teamScore.score,
                  value       : teamScore.score,
                  totalScore  : teamScore.totalScore,
                  hintsOpened : teamScore.hintsOpened,
                  teamInfo    : teamInfo[teamScore.id]
                };
                if (!teamData.teamInfo) {
                  teamData.teamInfo = await this.getTeamInfo(teamData.id);
                }
                teamRanking.push(teamData);
              }
            });
          });
          /* set ranking by score and hintsopened */
          const sortFn = ((a, b) => {
            let value;
            if (a.score > b.score) {
              value = -1;
            }
            else if (a.score < b.score) {
              value = 1;
            }
            else if (a.hintsOpened < b.hintsOpened) {
              value = 1;
            }
            else if (a.hintsOpened > b.hintsOpened) {
              value = -1;
            }
            return value;
          });
          teamRanking = [...teamRanking].sort(sortFn);

          /* set ranking by score and time */
          const sortByName = ((a, b) => {
            let value;
            if (a.name < b.name) {
              value = -1;
            }
            else if (a.name > b.name) {
              value = 1;
            }
            return value;
          });

          const teams = [...teamRanking].sort(sortByName);

          this.$store.commit('setTeamScore', dataRefined);
          this.$store.commit('setTeams', teams);
          this.$store.commit('setTeamRanking', teamRanking);

          return { dataRefined, teams, teamRanking };
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(new Error('Error while retrieving status info.', error));
          this.$store.commit('showSnack', { text : this.$t('data.retrieving.error'), type : 'error' });
          throw error;
        });
    },
    /**
     * Get team score from server
     *
     * @param {Number} idModuleLab id lab to get challenge
     * @return {Promise} Promise of execution
     */
    getStudentScore() {
      const tokenAPI = this.$store.getters.getTokenData.token;
      const basePath = this.apiHostCyber;
      return StatusService.getStudentScore(tokenAPI, basePath)
        .then(response => {
          let objReturn;
          if (response.data) {
            objReturn = response.data;
          }
          this.$store.commit('setStudentScore', objReturn);
          return objReturn;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(new Error('Error while retrieving status info.', error));
          this.$store.commit('showSnack', { text : this.$t('data.retrieving.error'), type : 'error' });
          throw error;
        });
    },
    /**
     * Get team info from server
     *
     * @param {String} teamId id team
     * @return {Promise} Promise of execution
     */
    getTeamInfo(teamId) {
      const tokenAPI = this.$store.getters.getTokenData.token;
      const basePath = this.apiHostCyber;
      return StatusService.getTeamInfo(tokenAPI, basePath, teamId)
        .then(response => {
          let objReturn;
          if (response.data) {
            objReturn = response.data;
          }
          this.$store.commit('setTeamInfo', objReturn);
          return objReturn;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(new Error('Error while retrieving status info.', error));
          throw error;
        });
    }
  }
};
