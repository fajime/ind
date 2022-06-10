export default {
  /**
   * Simple get with fetch formatted to json
   * @param {String} url Url of server
   * @param {Object} queryParams Object than contains query params
   * @returns {Promise} Response JSON of service
   */
  getRequest(url, queryParams) {
    /* Try catch necessary? */
    const urlObject = new URL(url);
    Object.keys(queryParams).forEach(key => urlObject.searchParams.append(key, queryParams[key]));
    return fetch(urlObject).then(response => response.json());
  },
  /**
   * Post request for wfst transactions with xml body
   * Used for posting geofences to geoserver, currently unused
   * @param {String} url Url of server
   * @param {String} body Xml than contains query params
   * @returns {Promise} Response JSON of service
   */
  postRequest(url, body) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/xml');
    const requestOptions = {
      method  : 'POST',
      headers : myHeaders,
      body
    };
    return fetch(url, requestOptions)
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, 'application/xml'))
      // eslint-disable-next-line no-console
      .catch(error => console.error('Error on POST request: ', error));
  }
};
