import CallBase from './call/callBase';
/**
 * Class that is used to encapsulate calls to the api
 *
 * @class ApiCall
 */
export default class ApiCall extends CallBase {
/**
 * Set up the default header with which the call is set up
 *
 * @static
 * @param {String} tokenAPI api access token
 * @return {Object} Initial configuration object
 * @memberof ApiCall
 */
  static _generateHeader(tokenAPI) {
    const headers = {
      'Accept'       : 'text/plain, application/json',
      'Content-Type' : 'application/json'
    };
    if (tokenAPI) {
      headers.Authorization = `Bearer ${tokenAPI}`;
    }
    else {
      const cookieName = 'token=';
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
          headers.Authorization = cookie.substring(cookieName.length, cookie.length);
        }
      }
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
   * @memberof ApiCall
   */
  static get(tokenAPI, path, queryParams) {
    return ApiCall._innerCall('GET', path, queryParams, undefined, ApiCall._generateHeader(tokenAPI));
  }

  /**
   * Method representing a POST call to the Api
   *
   * @param {String} tokenAPI api access token
   * @param {String} path Url destination of the call
   * @param {Object} queryParams Object with the key pairs value of the parameters of the querystring
   * @param {Object} body = Object containing the key pairs value of the request body
   * @return {Promise} Returns the result of the Ajax call promise
   * @memberof ApiCall
   */
  static post(tokenAPI, path, queryParams, body) {
    return ApiCall._innerCall('POST', path, queryParams, body, ApiCall._generateHeader(tokenAPI));
  }
}

