/**
 * MissionInstance
 *
 * @export
 * @class MissionInstance
 */
export default class MissionInstance {

  /**
   *Creates an instance of MissionInstance.
   * @param {Object} server Object received from server
   * @memberof MissionInstance
   */
  constructor(server) {
    this.id = server.id;
    this.foreignId = server.foreignId;
    this.name = server.name;
    this.created = server.created ? MissionInstance.formatDate(server.created) : undefined;
    this.duration = server.duration;
    this.type = server.type;
    this.floatingIp = server.floatingIp;
    this.keyPair = server.keypair;
    this.gpu = server.gpu;
    this.antiAffinity = server.antiaffinity;
    this.status = server.status;
    this.internalStates = server.internalStates;
    this.reason = server.reason;
    this.ttr = server.ttr;
    this.ttl = server.ttl;
    this.addedDate = server.addedDate ? MissionInstance.formatDate(server.addedDate) : undefined;
    this.startDate = server.startDate ? MissionInstance.formatDate(server.startDate) : undefined;
    this.finishDate = server.finishDate ? MissionInstance.formatDate(server.finishDate) : undefined;
    this.completedDate = server.completedDate ? MissionInstance.formatDate(server.completedDate) : undefined;
    this.extras = server.extras;
    this.priority = server.priority;
    this.zone = server.zone;
    this.additionalProperties = server.additionalproperties;
    this.domain = server.domain;
    this.project = server.project;
    this.flavor = server.flavor;
    this.image = server.image;
    this.networks = server.networks;
    this.securityGroup = server.securityGroup;
    this.instance = server.instance;
  }

  /**
   * Get date formate
   *
   * @static
   * @param {String} stringDate String date
   * @returns {Date} date processed
   * @memberof MissionInstance
   */
  static formatDate(stringDate) {
    const date = stringDate.split(' ')[0];
    const time = stringDate.split(' ')[1];
    return new Date(date.split('-')[2], date.split('-')[1], date.split('-')[0], time.split(':')[0], time.split(':')[1], time.split(':')[2]);
  }
}

