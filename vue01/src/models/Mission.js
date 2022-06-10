/**
 * Mission
 *
 * @export
 * @class Mission
 */
export default class Mission {

  /**
   *Creates an instance of Mission.
   * @param {Object} serverImage Object received from server
   * @param {Object} serverActive Object received from server
   * @memberof Mission
   */
  constructor(serverImage, serverActive) {
    this.id = serverImage.idmission;
    this.name = serverImage.name;
    this.ipAddress = serverActive ? serverActive.ipAddress : undefined;
    this.port = serverActive ? serverActive.port : undefined;
    this.containerId = serverActive ? serverActive.containerId : undefined;
    this.mission = serverActive ? serverActive.mission : undefined;
    this.type = serverImage.mtype;
    this.summary = serverImage.msummary;
    this.desc = serverImage.description;
    this.author = serverImage.author;
    this.scope = serverImage.mscope;
    this.coordinates = Mission.getCoordinates(serverImage.area);
    this.area = Mission.getAreaCoordinates(serverImage.area);
    this.volume = Mission.getVolumeCoordinates(serverImage.area);
    this.tags = [];
    if (serverActive && serverActive.tags) {
      this.tags = Array.isArray(serverActive.tags) ? serverActive.tags : this.tags = [serverActive.tags];
    }
    this.status = serverActive ? serverActive.status : undefined;
    this.creation = Mission.formatDate(serverImage.mcreation);
    this.update = Mission.formatDate(serverImage.mupdate);
    this.users = serverActive ? serverActive.users : [];
    this.instances = [];
    this.image = undefined;
    this.serverId = serverActive ? serverActive.id : undefined;
    this.connectionId = serverActive ? serverActive.name : undefined;
  }

  /**
   * Get date formatted
   *
   * @static
   * @param {String} stringDate String date
   * @returns {Date} date processed
   * @memberof Mission
   */
  static formatDate(stringDate) {
    const date = stringDate.split(' ')[0];
    const time = stringDate.split(' ')[1];
    return new Date(date.split('-')[2], date.split('-')[1], date.split('-')[0], time.split(':')[0], time.split(':')[1], time.split(':')[2]);
  }

  /**
   * Get date formatted
   *
   * @static
   * @param {String} rawCoordinates Coordinates in raw
   * @returns {Object} corrdinates
   * @memberof Mission
   */
  static getCoordinates(rawCoordinates) {
    const returnObj = { lat : '', long : '' };
    if (rawCoordinates) {
      const aux = rawCoordinates.split('((')[1].split('))')[0];
      const auxArray = aux.split(',');
      const cord1 = auxArray[0];
      const cord2 = auxArray[1];
      const cord3 = auxArray[2];
      const cord4 = auxArray[3];
      const cord1Long = cord1.split(' ')[0];
      const cord2Long = cord2.split(' ')[0];
      const cord3Lat = cord3.split(' ')[1];
      const cord4Lat = cord4.split(' ')[1];
      const lat = ((parseFloat(cord4Lat) + parseFloat(cord3Lat) ) / 2).toFixed(8);
      const long = ((parseFloat(cord2Long) + parseFloat(cord1Long) ) / 2).toFixed(8);
      returnObj.lat = lat;
      returnObj.long = long;
    }
    return returnObj;
  }

  /**
   * get Area Coordinates
   *
   * @static
   * @param {String} rawCoordinates Coordinates in raw
   * @returns {Object} corrdinates
   * @memberof Mission
   */
  static getAreaCoordinates(rawCoordinates) {
    const returnObj = [];
    if (rawCoordinates) {
      const aux = rawCoordinates.split('((')[1].split('))')[0];
      const points = aux.split(',');
      points.forEach(point => {
        const pointObj = { lat : '', long : '', alt : '' };
        pointObj.lat = parseFloat(point.split(' ')[1]).toFixed(8);
        pointObj.long = parseFloat(point.split(' ')[0]).toFixed(8);
        returnObj.push(pointObj);
      });
    }
    return returnObj;
  }

  /**
   * get Area coordinates
   *
   * @static
   * @param {String} rawCoordinates coordinates in raw
   * @returns {Object} corrdinates
   * @memberof Mission
   */
  static getVolumeCoordinates(rawCoordinates) {
    const returnObj = [];
    if (rawCoordinates) {
      const aux = rawCoordinates.split('((')[1].split('))')[0];
      const points = aux.split(',');
      points.forEach(point => {
        const pointObj = { lat : '', long : '', alt : '' };
        pointObj.lat = parseFloat(point.split(' ')[1]).toFixed(8);
        pointObj.long = parseFloat(point.split(' ')[0]).toFixed(8);
        pointObj.alt = parseFloat(point.split(' ')[2]).toFixed(8);
        returnObj.push(pointObj);
      });
    }
    return returnObj;
  }

  /**
   * get Leaflet Polygon
   * @returns {Array} Leaflet Polygon
   */
  getLeafletPolygon() {
    const returnArr = [];
    if (this.area) {
      this.area.forEach(position => {
        returnArr.push([parseFloat(position.lat), parseFloat(position.long)]);
      });
    }
    return returnArr;
  }

  /**
   * get Leaflet Coordinates
   * @returns {Array} Leaflet Coordinates
   */
  getLeafletCoordinates() {
    let returnArr = [40.463667, -3.74922];
    if (this.coordinates) {
      returnArr = [parseFloat(this.coordinates.lat), parseFloat(this.coordinates.long)];
    }
    return returnArr;
  }

}
