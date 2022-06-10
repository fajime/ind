import api from '../GraviteeCall';

/**
 * Class that represents the call to the missions service *
 * @export
 * @class TaskService
 */
export default class MissionsService {
  /**
   * Retrieve available missions list
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static getMissionImages(tokenAPI, basePath) {
    const url = `${basePath}/BackEnd/getMissionImages`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }

  /**
   * Retrieve mission list
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static getMissionList(tokenAPI, basePath) {
    const url = `${basePath}/BackEnd/getMissionList`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }

  /**
   * Call to get mission status
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @param {Number} missionId id of mission to get status
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static getMissionInfo(tokenAPI, basePath, missionId) {
    const url = `${basePath}/missions/${missionId}`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }

  /**
   * Call to exit of a mission
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @param {Number} missionId id of mission to get status
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static join(tokenAPI, basePath, missionId) {
    const url = `${basePath}/missions/${missionId}/join`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }

  /**
   * Call to create a mission
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static createMission(tokenAPI, basePath) {
    const url = `${basePath}/BackEnd/createMission`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }

  /**
   * Call to set a mission
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @param {String} serverId id ofserver
   * @param {String} missionId id of mission to load in server
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static setMission(tokenAPI, basePath, serverId, missionId) {
    const url = `${basePath}/BackEnd/setMission?id=${serverId}&missionId=${missionId}`;

    // call the modules api service
    return api.post(tokenAPI, url);
  }

  /**
   * Call to set a mission
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @param {String} serverId id of server
   * @param {String} userId user id
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static joinMission(tokenAPI, basePath, serverId, userId) {
    const url = `${basePath}/BackEnd/joinToMission?missionId=${serverId}&userName=${userId}`;

    // call the modules api service
    return api.post(tokenAPI, url);
  }

  /**
   * Call to logout from mission
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @param {String} userId user id
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static logout(tokenAPI, basePath, userId) {
    const url = `${basePath}/BackEnd/logout?userId=${userId}`;

    // call the modules api service
    return api.post(tokenAPI, url);
  }

  /**
   * Call to exit from mission
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @param {String} serverId server id
   * @param {String} userId user id
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static exit(tokenAPI, basePath, serverId, userId) {
    const url = `${basePath}/BackEnd/exitMission?missionId=${serverId}&userId=${userId}`;

    // call the modules api service
    return api.post(tokenAPI, url);
  }

  /**
   * Call to get mission status
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @param {String} serverId id of server
   * @param {String} action action to set
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static setMissionStatus(tokenAPI, basePath, serverId, action) {
    const url = `${basePath}/BackEnd/setMissionStatus?controlStatus=${action}&id=${serverId}`;

    // call the modules api service
    return api.post(tokenAPI, url);
  }

  /**
   * Call to get mission status
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @param {String} serverId id of server
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static getMissionStatus(tokenAPI, basePath, serverId) {
    const url = `${basePath}/BackEnd/getMissionStatus?id=${serverId}`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }

  /**
   * Retrieve entities of a mission
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @param {String} serverId id of server
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static getMissionEntities(tokenAPI, basePath, serverId) {
    const url = `${basePath}/BackEnd/getEntities?id=${serverId}`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }

  /**
   * Retrieve entities of a mission
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to pai services are made
   * @param {String} serverId id of server
   * @return {Promise} Promise with call execution
   * @memberof TaskService
   */
  static updateEntityEvents(tokenAPI, basePath, serverId) {
    const url = `${basePath}/BackEnd/updateEntitiesEvents?id=${serverId}`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }
}
