import DateUtils from '../../utils/DateUtils';
/**
 * Class representing the information related to the api session token
 *
 * @export
 * @class TokenData
 */
export default class TokenData {

  /**
   *Creates an instance of TokenData.
   * @param {String} token Session Token
   * @param {String} expireDate Date of expiration of token
   * @param {Number} questionSet question Set of this game
   * @memberof TokenData
   */
  constructor(token, expireDate, questionSet) {
    this.token = token;
    if (expireDate) {
      this.expireDate = DateUtils.formatDateFromServer(expireDate);
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.role = payload.groups[0];
    this.questionSet = questionSet;
  }
}
