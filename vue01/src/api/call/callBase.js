/**
 * Base class of any call to a server, implement a generic fetch *
 * @export
 * @class CallBase
 */
export default class CallBase {
  /**
   * Generic method used to make the invocations, is the one that brings together the call logic
   *
   * @param {String} method Type of call to make
   * @param {String} url Url destination of the call
   * @param {Object} [queryParams] Object containing the key value pairs of the parameters of the querystring
   * @param {Object} body Object containing the key pairs value of the request body
   * @param {Object} [headers = {}] Object containing the call option modifiers
   * @return {Promise} Returns the result of the fetch call promise
   * @memberof CallBase
   */
  static _innerCall(method, url, queryParams, body, headers = {}) {
    const config = {};
    config.method = method;
    config.headers = headers;
    if (method !== 'GET' && body) {
      config.body = JSON.stringify(body);
    }
    if (queryParams) {
      url = `${url}?`;
      Object.keys(queryParams).forEach(key => url = `${url}&${key}=${queryParams[key]}`);
    }
    return fetch(url, config)
      .then(CallBase._proccesResponse)
      .catch(CallBase._handleError);
  }

  /**
   * Process server response
   *
   * @static
   * @param {Object} response Server response object
   * @return {Object} Json object with the result
   * @memberof CallBase
   */
  static _proccesResponse(response) {
    if (response.status === 401) {
      throw new Error(JSON.stringify({ code : 401, level : 'ERROR' }));
    }
    // if the response content is 204 (no-content) or is empty, return an empty object
    else if (response.status === 204 || response.headers.get('content-length') === '0') {
      return { code : response.status, body : {} };
    }
    else {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json().then(json => {
          const value = CallBase._formatJson(json, response.status);
          /* in case an error comes or it is not a 403 error (need a different token) */
          if (
            value &&
                    value.status &&
                    value.status.code &&
                    value.status.code !== 403 &&
                    value.status.level &&
                    value.status.level === 'ERROR'
          ) {
            throw new Error(JSON.stringify(value));
          }

          return value;
        });
      }
      else {
        return response.text().then(text => text);
      }

    }
  }

  /**
   * Exception manager on API calls
   *
   * @static
   * @param {Object} error Object error returned
   * @memberof CallBase
   */
  static _handleError(error) {
    // eslint-disable-next-line no-console
    console.error(`Error calling server: ${error}`);
    throw error;
  }

  /**
   * Format the json returned by the API to convert it to its own format
   *
   * @static
   * @param {Object} json Json object returned by API server
   * @param {Number} httpCode  Http code associated with the response
   * @return {Object} json formatted
   * @memberof CallBase
   */
  static _formatJson(json, httpCode) {
    const jsonReturn = {
      status : {
        level : '',
        code  : 0
      },
      data : ''
    };

    jsonReturn.status.level = httpCode > 400 ? 'ERROR' : 'OK';
    jsonReturn.status.code = httpCode;
    jsonReturn.data = json;

    return jsonReturn;
  }
}
