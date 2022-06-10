import MissionsService from '../../api/services/missions';
import Mission from '../../models/Mission';
import MissionInstance from '../../models/MissionInstance';

/**
 * Mixin for the management of services related to missions
 */
export default {
  methods : {
    /**
     * Do login
     * @return {Promise} response Json
     */
    getMissionList() {
      const token = undefined;
      const basePath = this.apiHostDT;
      const missions = [];
      return MissionsService.getMissionImages(token, basePath)
        .then( responseImages => MissionsService.getMissionList(token, basePath)
          .then( responseActives => {
            responseImages.data.forEach(missionServer => {
              let mission;
              const missionsActiveData =
                responseActives.data.filter(x => Number(x.mission) === Number(missionServer.idmission));
              if (missionsActiveData[0] && missionsActiveData[0].virtualMachine) {
                mission = new Mission(missionServer, missionsActiveData[0]);
                missionsActiveData.forEach(missionActiveData => {
                  const missionInstance = new MissionInstance(missionActiveData.virtualMachine);
                  mission.instances.push(missionInstance);
                });
              }
              else {
                mission = new Mission(missionServer);
              }
              missions.push(mission);
            });
            return missions;
          }))
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          throw error;
        });
    },
    /**
     * create a Mission
     * @return {Promise} response Json
     */
    createMission() {
      const token = undefined;
      const basePath = this.apiHostDT;
      return MissionsService.createMission(token, basePath)
        .then( response => {
          const serverId = response.data.id;
          const connectionId = response.data.name;
          this.$store.commit('setServerId', serverId);
          this.$store.commit('setConnectionId', connectionId);
          return { serverId, connectionId };
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          throw error;
        });
    },
    /**
     * create a Mission
     * @param {String} serverId id of server
     * @param {String} missionId id of mission to load in server
     * @return {Promise} response Json
     */
    setMission(serverId, missionId) {
      const token = undefined;
      const basePath = this.apiHostDT;
      return MissionsService.setMission(token, basePath, serverId, missionId)
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          throw error;
        });
    },
    /**
     * create a Mission
     * @param {String} serverId id of server
     * @param {String} userId id connection
     * @param {String} missionName mission name
     * @return {Promise} response Json
     */
    joinMission(serverId, userId/* , missionName*/) {
      const token = undefined;
      const basePath = this.apiHostDT;
      return MissionsService.joinMission(token, basePath, serverId, userId)
        .then(() => {
          /*
           * this.$store.commit('setMissionNameLoaded', missionName);
           * this.$store.commit('setUserId', userId);
           */
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          throw error;
        });
    },

    /**
     * change mission status
     * @param {String} serverId id of server
     * @param {String} action action to set
     * @return {Promise} response Json
     */
    setMissionStatus(serverId, action) {
      const token = undefined;
      const basePath = this.apiHostDT;
      if (!serverId) {
        return Promise.reject(new Error('Param serverId not supplied'));
      }
      return MissionsService.setMissionStatus(token, basePath, serverId, action)
        .then( response => response)
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          throw error;
        });
    },

    /**
     * change mission status
     * @param {String} serverId id of server
     * @return {Promise} response Json
     */
    getMissionStatus(serverId) {
      const token = undefined;
      const basePath = this.apiHostDT;
      if (!serverId) {
        return Promise.reject(new Error('Param serverId not supplied'));
      }
      return MissionsService.getMissionStatus(token, basePath, serverId)
        .then( response =>
          // this.$store.commit('setServerStatus', response);
          response
        )
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          throw error;
        });
    },

    /**
     * Retrieve entities of a mission
     * @param {String} serverId id of server
     * @return {Promise} Promise with call execution
     * @memberof TaskService
     */
    getMissionEntities(serverId) {
      const token = undefined;
      const basePath = this.apiHostDT;
      if (!serverId) {
        return Promise.reject(new Error('Param serverId not supplied'));
      }
      return MissionsService.getMissionEntities(token, basePath, serverId)
        .then( response => response)
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          throw error;
        });
    },

    /**
     * Retrieve entities of a mission
     * @param {String} serverId id of server
     * @return {Promise} Promise with call execution
     * @memberof TaskService
     */
    updateEntityEvents(serverId) {
      const token = undefined;
      const basePath = this.apiHostDT;
      if (!serverId) {
        return Promise.reject(new Error('Param serverId not supplied'));
      }
      return MissionsService.updateEntityEvents(token, basePath, serverId)
        .then( response => response)
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          throw error;
        });
    },

    /**
     * do logout of mission
     *
     * @return {Promise} Promise with call execution
     * @memberof TaskService
     */
    logout() {
      const token = undefined;
      const basePath = this.apiHostDT;
      const userId = this.$store.getters.getUserId;
      if (!userId) {
        return Promise.reject(new Error('Param userId or userId not supplied'));
      }
      return MissionsService.logout(token, basePath, userId)
        .then( response => response)
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          throw error;
        });
    },

    /**
     * do logout of mission
     *
     * @param {String} serverId id of server
     * @param {String} userId id of user
     * @return {Promise} Promise with call execution
     * @memberof TaskService
     */
    exitMission(serverId, userId) {
      const token = undefined;
      const basePath = this.apiHostDT;
      if (!serverId || !userId) {
        return Promise.reject(new Error('Param serverId or userId not supplied'));
      }
      return MissionsService.exit(token, basePath, serverId, userId)
        .then( response => response)
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          throw error;
        });
    }
  }

};
