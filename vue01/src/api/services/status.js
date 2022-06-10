import api from '../ApiCall';

/**
 * Class that represents the call to the module service *
 * @export
 * @class StatusService
 */
export default class StatusService {
/**
 * Call to get challenges of a lab
 *
 * @static
 * @param {String} tokenAPI Token obtained in the login process
 * @param {String} basePath base path from which calls to api services are made
 * @return {Promise} Promise with call execution
 * @memberof StatusService
 */
  static getTeamScore(tokenAPI, basePath) {
    const url = `${basePath}/labs/scores/teams`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }

  /**
   * Call to get challenges of a lab
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to api services are made
   * @param {Number} idCatalog id catalog to get ranking
   * @return {Promise} Promise with call execution
   * @memberof StatusService
   */
  static getTeamScoreByCatalog(tokenAPI, basePath, idCatalog) {
    const url = `${basePath}/labs/scores/teams/${idCatalog}`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }

  /**
   * Call to get challenges of a lab
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to api services are made
   * @return {Promise} Promise with call execution
   * @memberof StatusService
   */
  static getStudentScore(tokenAPI, basePath) {
    const url = `${basePath}/labs/scores`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }

  /**
   * Call to get challenges of a lab
   *
   * @static
   * @param {String} tokenAPI Token obtained in the login process
   * @param {String} basePath base path from which calls to api services are made
   * @param {String} teamId id team
   * @return {Promise} Promise with call execution
   * @memberof StatusService
   */
  static getTeamInfo(tokenAPI, basePath, teamId) {
    const url = `${basePath}/teams/${teamId}`;

    // call the modules api service
    return api.get(tokenAPI, url);
  }

}
