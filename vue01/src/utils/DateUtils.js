
/**
 * class with utility functions about dates *
 * @export
 * @class DateUtils
 */
export default class DateUtils {

  /**
   *
   * Convert string date from server to JS date object
   * @param {String} dateFromServer string date from server
   * @return {Date} date converted
   * @memberof DateUtils
   */
  static formatDateFromServer(dateFromServer) {
    const date = dateFromServer.split('T')[0];
    const time = dateFromServer.split('T')[1];
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];
    const hour = time.split(':')[0];
    const minute = time.split(':')[1];
    const second = time.split(':')[2];
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  }

  /**
   *
   * Calculate time dif between two times and get string representation
   * @param {String} dateFromServer1 string date from server
   * @param {String} dateFromServer2 string date from server
   * @return {String} String represent calc
   * @memberof DateUtils
   */
  static calculateDiffTime(dateFromServer1, dateFromServer2) {
    const date1 = DateUtils.formatDateFromServer(dateFromServer1);
    const date2 = DateUtils.formatDateFromServer(dateFromServer2);
    const diffTimeSeconds = (Math.abs(date2 - date1) / 1000);
    const hours = Math.trunc(diffTimeSeconds / 3600);
    const modHours = diffTimeSeconds % 3600;
    const minutes = Math.trunc(modHours / 60);
    const seconds = modHours % 60;
    const hoursStr = (hours < 10) ? `0${hours}` : `${hours}`;
    const minutesStr = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    const secondsStr = (seconds < 10) ? `0${seconds}` : `${seconds}`;

    const returnStr = `${hoursStr}:${minutesStr}:${secondsStr}`;
    return returnStr;
  }
}
