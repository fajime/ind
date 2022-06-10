import presetsConfig from '../config/layoutPresets';

/** constant used in class  */
const PREFIX = 'layout-config-';
const LAST = 'layout-last';

/**
 * class to manage viewer layout configs
 * @export
 * @class LayoutManager
 */
export default class LayoutManager {
  /**
   *Creates an instance of LayoutManager.
   * @memberof LayoutManager
   */
  constructor() {
    this._presets = presetsConfig;
    this.config = this._getLastUserConfig();
    this.flags = {};
    this.lastConfig = {
      'dl-hl-map-2d'   : undefined,
      'dl-hl-map-race' : undefined
    };
    this._updateFlags();
  }

  /**
   * update flag info on layout items loaded
   *
   * @memberof LayoutManager
   */
  _updateFlags() {
    this.flags = {
      map2D : this.config.value.some(item => item.i === 'dl-hl-map-2d'),
      map3D : this.config.value.some(item => item.i === 'dl-hl-map-race')
    };
  }

  /**
   * Add new grid item to the layout
   *
   * @param {String} id Id of grid item
   * @memberof LayoutManager
   */
  addItemToLayout(id) {
    if (!this.config.value.find(item => (item.i === id))) {
      if (this.lastConfig[id]) {
        this.config.value.push(this.lastConfig[id]);
      }
      else {
        this.config.value.push({ 'x' : 0, 'y' : 0, 'w' : 5, 'h' : 5, 'i' : id, 'component' : id, moved : false });
      }
    }
    this.config.name = 'temp';
    this._updateFlags();
    window.localStorage.setItem(LAST, JSON.stringify(this.config));
  }

  /**
   * Delete grid item to the layout
   *
   * @param {String} id Id of grid item
   * @memberof LayoutManager
   */
  removeItemFromLayout(id) {
    this.lastConfig[id] = this.config.value.find(item => (item.i === id));
    this.config.value = this.config.value.filter(item => (item.i !== id));
    this.config.name = 'temp';
    this._updateFlags();
    window.localStorage.setItem(LAST, JSON.stringify(this.config));
  }

  /**
   * Save the actual config in browser storage
   *
   * @param {String} name Name of the configuration
   * @memberof LayoutManager
   */
  saveLayout(name) {
    window.localStorage.setItem(`${PREFIX}${name}`, JSON.stringify(this.config) );
  }

  /**
   * Return all config save in browser by the user
   *
   * @returns {Array} Array o configs name
   * @memberof LayoutManager
   */
  getLayoutsAvailable() {
    const keys = Object.keys( window.localStorage);
    const values = keys.filter(key => (key.startsWith(PREFIX)));
    values.forEach((value, index, array) => {
      array[index] = value.substring(PREFIX.length, value.length);
    });
    this._presets.forEach(preset => {
      values.push(preset.name);
    });
    return values;
  }

  /**
   * Load a config from browser storage
   *
   * @param {String} name Name of the configuration
   * @memberof LayoutManager
   */
  loadLayout(name) {
    const valueLocal = window.localStorage.getItem(`${PREFIX}${name}`);
    const valuePreset = this._presets.find(preset => preset.name === name);
    const defaultValue = [];
    this.config = (valueLocal) ? JSON.parse(valueLocal) : (valuePreset) ? valuePreset : defaultValue;
    this._updateFlags();
    window.localStorage.setItem(LAST, JSON.stringify(this.config));
  }

  /**
   * update layout values config
   *
   * @param {Array} layoutValues New configuration
   * @memberof LayoutManager
   */
  updateLayoutValues(layoutValues) {
    this.config.value = layoutValues;
    this._updateFlags();
    window.localStorage.setItem(LAST, JSON.stringify(this.config));
  }

  /**
   * remove a config from browser storage
   *
   * @param {String} name Name of the configuration
   * @memberof LayoutManager
   */
  removeLayout(name) {
    window.localStorage.removeItem(`${PREFIX}${name}`);
  }

  /**
   * get the las configuration used by user
   *
   * @returns {Array} configuration
   * @memberof LayoutManager
   */
  _getLastUserConfig() {
    let value = window.localStorage.getItem(LAST);
    if (value) {
      value = JSON.parse(value);
    }
    else {
      value = this._presets[1];
    }
    return value;
  }

  /**
   * Adjust item configuration to show in full size
   *
   * @param {String} id Id of grid item
   * @param {Number} rows Number of rows
   * @param {Number} columns Number of columns
   * @memberof LayoutManager
   */
  fullSizeItem(id, rows, columns) {
    const configItem = this.config.value.find(item => (item.i === id));
    configItem.x = 0;
    configItem.w = columns;
    configItem.h = rows;
  }

  /**
   * Adjust item configuration to show minimized
   *
   * @param {String} id Id of grid item
   * @param {Number} rows Number of rows
   * @param {Number} columns Number of columns
   * @memberof LayoutManager
   */
  minimizeItem(id, rows, columns) {
    const configItem = this.config.value.find(item => (item.i === id));
    configItem.w = columns;
    configItem.h = rows;
  }
}
