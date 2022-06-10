import api from '../ApiCall';

/**
 * Class that represents the call to the login service *
 * @export
 * @class LoginService
 */
export default class LoginService {
/**
 * Call to do login
 *
 * @static
 * @param {String} basePath base path from which calls to api services are made
 * @param {String} email User email
 * @param {String} password User password
 * @param {String} locale locale in two characters
 * @return {Promise} Promise with call execution
 * @memberof LoginService
 */
  static login(basePath, email, password, locale) {
    const url = `${basePath}/login`;
    const bodyRequest = {
      email,
      password,
      locale
    };

    // call the login api service
    return api.post(undefined, url, undefined, bodyRequest);
  }
}
