import CallBase from './ApiCall';
/**
 * Class that is used to encapsulate calls to the api
 *
 * @class GraviteeCall
 */
export default class GraviteeCall extends CallBase {
/**
 * Set up the default header with which the call is set up
 *
 * @static
 * @param {String} tokenAPI api access token
 * @return {Object} Initial configuration object
 * @memberof GraviteeCall
 */
  static _generateHeader(tokenAPI) {
    const headers = {
      /*
       * 'Accept' : 'text/plain, application/json'
       *  'Content-Type' : 'application/json'
       */
    };
    if (tokenAPI) {
      headers.Authorization = `Bearer ${tokenAPI}`;
    }
    return headers;
  }

  /**
   * Method representing a GET call to the Api
   *
   * @param {String} tokenAPI api access token
   * @param {String} path Url destination of the call
   * @param {Object} queryParams Object with the key pairs value of the parameters of the querystring
   * @return {Promise} Returns the result of the Ajax call promise
   * @memberof GraviteeCall
   */
  static get(tokenAPI, path, queryParams) {
    return CallBase._innerCall('GET', path, queryParams, undefined, GraviteeCall._generateHeader(tokenAPI));
  }

  /**
   * Method representing a POST call to the Api
   *
   * @param {String} tokenAPI api access token
   * @param {String} path Url destination of the call
   * @param {Object} queryParams Object with the key pairs value of the parameters of the querystring
   * @param {Object} body = Object containing the key pairs value of the request body
   * @return {Promise} Returns the result of the Ajax call promise
   * @memberof GraviteeCall
   */
  static post(tokenAPI, path, queryParams, body) {
    return CallBase._innerCall('POST', path, queryParams, body, GraviteeCall._generateHeader(tokenAPI));
  }
}

