/* eslint-disable max-lines */
import * as L from 'leaflet';
import service from './js/extService';
import leafletLang from './js/leafletLang';

import DlUiProgressBar from '../../atoms/dl-ui-progress-bar';
import DlUiSnack from '../../molecules/dl-ui-snack';
import randomIdMixin from '../../../mixins/randomId';

import DlLeafletGeofences from './dl-ui-leaflet-map__geo-tool';
import DlLeafletInfo from './dl-ui-leaflet-map__info-tool';
import DlLeafletLayers from './dl-ui-leaflet-map__layer-tool';
import DlLeafletBasemap from './dl-ui-leaflet-map__basemap-tool';
import DlLeafletLatlng from './dl-ui-leaflet-map__latlng-tool';
import DlLeafletIconset from './dl-ui-leaflet-map__icon-set';
import metadata from './_metadata';

export default {
  name   : 'dl-ui-leaflet-map',
  mixins : [randomIdMixin],
  emits  : ['ready', 'click', 'dataload', 'geofenceClicked', 'geofenceSelected', 'shapeCreating', 'shapeUpdating',
    'shapeDeleting', 'circleRadiusUpdated', 'pointData', 'entityNotWaiting', 'error', 'entityClicked', 'entityWaiting',
    'entityNotWaiting', 'geometryClicked'],
  components : {
    DlUiProgressBar,
    DlUiSnack,
    DlLeafletGeofences,
    DlLeafletInfo,
    DlLeafletLayers,
    DlLeafletBasemap,
    DlLeafletLatlng,
    DlLeafletIconset
  },
  props : {
    /** Lang literals for custom external values */
    lang : {
      type    : Object,
      default : null,
      desc    : 'Lang literals for custom external strings'
    },
    /** Default Geoserver url */
    baseUrl : {
      type    : String,
      default : null,
      desc    : 'Default Geoserver url, for customization of click-in-point request'
    },
    /** Start Latitude */
    startLat : {
      type    : Number,
      default : 39.5,
      desc    : 'Start Latitude'
    },
    /** Start longitude */
    startLng : {
      type    : Number,
      default : -2,
      desc    : 'Start longitude'
    },
    /** Start zoom */
    startZoom : {
      type    : Number,
      default : 6,
      desc    : 'Start zoom'
    },
    /** show attribution */
    attribution : {
      type    : Boolean,
      default : true,
      desc    : 'Show attribution'
    },
    /** info to show in footer message */
    mapSnackConfig : {
      type    : Object,
      default : () => ({
        show     : false,
        text     : [],
        timeout  : 0,
        type     : 'error',
        position : 'absolute'
      }),
      desc : 'Options to show footer msg'
    },
    /** connect to server to get features in click */
    getInfoOnClick : {
      type    : Boolean,
      default : false,
      desc    : 'Enable click feature request'
    },
    /** show popup with coordinate info*/
    showInfoPopup : {
      type    : Boolean,
      default : true,
      desc    : 'Show popup with coordinate info'
    },
    /**
     * Flag to enable or disable info box
     */
    showInfoBox : {
      type    : Boolean,
      default : false,
      desc    : 'Flag to enable or disable info box'
    },
    /**
     * Flag to enable or disable opening the info box
     */
    openInfoBox : {
      type    : Boolean,
      default : false,
      desc    : 'Flag to enable or disable opening the info box at startup'
    },
    /**
     * Contents of infoBox. Calculates translated texts.
     */
    infoBoxData : {
      type    : Object,
      default : () => {},
      desc    : 'Contents of infoBox. Calculates translated texts'
    },
    /** Init options */
    initVisualOptions : {
      type    : Object,
      default : () => ({
        center             : [39.5, -2],
        zoom               : 6,
        minZoom            : 1,
        maxZoom            : 20,
        attributionControl : false,
        zoomControl        : false,
        doubleClickZoom    : false
      }),
      desc : 'Init options'
    },
    /** scale control */
    scale : {
      type    : Boolean,
      default : false,
      desc    : 'Sets scale control'
    },
    /** scale position */
    scaleControlPos : {
      type    : String,
      default : 'bottomright',
      desc    : 'Sets scale control position'
    },
    /** zoom control */
    zoom : {
      type    : Boolean,
      default : true,
      desc    : 'Sets zoom control'
    },
    /** zoom position */
    zoomControlPos : {
      type    : String,
      default : 'bottomright',
      desc    : 'Sets zoom control position'
    },
    /** Use wfs for layers */
    wfs : {
      type    : Boolean,
      default : false,
      desc    : 'Use wfs for layers'
    },
    /** Show geofence control */
    showDrawControl : {
      type    : Boolean,
      default : false,
      desc    : 'Show geofence control'
    },
    /** Show coordinate control */
    showLatlngControl : {
      type    : Boolean,
      default : false,
      desc    : 'Show coordinate control'
    },
    /** Flag to disable compo basemap selector. */
    showBaseLayerList : {
      type    : Boolean,
      default : true,
      desc    : 'Flag to disable compo basemap selector. It won\'t display if only one basemap or prop baseLayers is missing'
    },
    /** Set of map base layers */
    baseLayers : {
      type    : Array,
      default : () => [{
        id      : 'toner',
        name    : 'Light',
        default : true,
        url     : 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
        options : {
          attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom     : 0,
          maxZoom     : 20,
          subdomains  : 'abcd',
          ext         : 'png'
        }
      }],
      desc : 'Set of map base layers'
    },
    /** Flag to disable compo custom map tree. */
    showCustomLayerList : {
      type    : Boolean,
      default : true,
      desc    : 'Flag to disable compo custom map tree. It won\'t display if prop customLayers is missing'
    },
    /**
     * Set of geoserver layers that are added to the map
     * It has a complex data-model for tree-view that has to be documented
     */
    customLayers : {
      type    : Object,
      default : () => null,
      desc    : 'Set of geoserver layers that are added to the map'
    },
    /** Flag to disable normal popup so we can control it from outside */
    entityPopup : {
      type    : Boolean,
      default : true,
      desc    : 'Flag to disable normal popup so we can control it from outside'
    },
    /** Flag to disable intersection when creating shapes */
    allowIntersection : {
      type    : Boolean,
      default : false,
      desc    : 'Flag to disable intersection when creating shapes'
    }
  },
  /**
   * Override function
   * @override
   */
  data() {
    return {
      mapId                   : this.randomId,
      map                     : null,
      scaleControl            : null,
      zoomControl             : null,
      attributionControl      : null,
      pointData               : [],
      mapSnackData            : this.mapSnackConfig,
      progressBarMaxStep      : 2, // On init, updateProgress will be called from baseLayer and layer compos
      progressBarStepValue    : 0,
      progressBarPercentValue : 0,
      entityGroup             : null,
      entityIconOptions       : {
        iconSize    : [44, 52],  // (Size of SVG) if no sizes are given, default size = 12px x 12px
        iconAnchor  : [22, 22], // Center of marker SVG (Value before popup CSS tweaks: [22, 26])
        popupAnchor : [0, -16], // Center of marker SVG (Value before popup CSS tweaks: [0, 0])
        className   : 'dl-ui-leaflet-marker' // This replaces the 'leaflet-div-icon' class and default styling, allowing us to use custom styles
      },
      geometryGroup   : null,
      geometryOptions : {
        stroke      : true,
        color       : '#185ABD', // blue is default
        weight      : 4,
        fill        : true,
        fillColor   : '#185ABD77',
        opacity     : 1,
        fillOpacity : 0.3
      },
      selectedEntity : null
    };
  },
  computed : {
    /**
     * Returns if child is selecting geofence now
     * @return {Boolean} if so
     */
    selectingGeofence() {
      return this.$refs.geoTool.geoStatus === this.$refs.geoTool.geoModes.selectingGeofence;
    },
    /**
     * Returns the scale of entity depending on zoom
     * @return {Number} scale
     */
    calculateScale() {
      return this.map.getZoom() < 11 ? 0.7 : 1;
    }
  },
  watch : {
    /**
     * Detects locale changes and changes leaflet internal draw control texts
     */
    '$i18n.locale'() {
      this.setLeafletLang();
    },
    /**
     * Detects language changes
     * @param {String} val lang
     */
    lang : {
      immediate : true,
      // eslint-disable-next-line require-jsdoc
      handler(val) {
        this.mergeLangs(val);
      }
    },
    /**
     * Detects when zoom pos changes and positions zoom accordingly
     * @param {String} val pos
     */
    attribution(val) {
      if (val) {
        this.attributionControl.addTo(this.map);
      }
      else {
        this.attributionControl.remove();
      }
    },
    /**
     * Detects when scale flag changes
     * @param {Bool} val flag
     */
    scale(val) {
      if (val) {
        this.scaleControl.addTo(this.map);
      }
      else {
        this.scaleControl.remove();
      }
    },
    /**
     * Detects when scale pos changes and positions scale accordingly
     * @param {String} val pos
     */
    scaleControlPos(val) {
      this.scaleControl.setPosition(val);
    },
    /**
     * Detects when zoom flag changes
     * @param {Bool} val flag
     */
    zoom(val) {
      if (val) {
        this.zoomControl.addTo(this.map);
      }
      else {
        this.zoomControl.remove();
      }
    },
    /**
     * Detects when zoom pos changes and positions zoom accordingly
     * @param {String} val pos
     */
    zoomControlPos(val) {
      this.zoomControl.setPosition(val);
    }
  },
  /**
   * Override function
   * @override
   */
  mounted() {
    // timing out due to loading problems --> ONLY ON WC
    setTimeout(() => {
      this.initMap();
    }, 0);
  },
  /**
   * Override function
   * @override
   */
  beforeDestroy() {
    try {
      this.map.remove();
    }
    catch (e) {
      this.map = null;
    }
  },
  methods : {
    /**
     * Random id
     * @return {Number} number
     */
    makeRandomId() {
      return new Date().valueOf();
    },
    /**
     * Decode a base64 value
     * @param {String} strBase64 String to decode
     * @returns {Object} Object JSON decoded
     */
    b64decode(strBase64) {
      if (strBase64 && strBase64.length) {
        return JSON.parse(atob(strBase64));
      }
      else {
        return {};
      }
    },
    /**
     * Initialize map
     */
    initMap() {
      const initOptions = this.initVisualOptions;
      // Overwrite init visual options with specific props if informed
      initOptions.center[0] = this.startLat;
      initOptions.center[1] = this.startLng;
      initOptions.zoom = this.startZoom;
      this.map = L.map(this.$refs.mapContainer, initOptions);
      this.initElements();
    },
    /**
     * Increment progrees control and notify if exists function callback. From 0 to 100
     */
    updateProgress() {
      this.progressBarStepValue++;
      this.progressBarPercentValue = Math.round(100 * this.progressBarStepValue / this.progressBarMaxStep);
      if (this.progressBarPercentValue >= 100) {
        this.$emit('ready', this.map);
      }
    },
    /**
     * Configure leaflet map
     */
    initElements() {
      // Attribution
      this.attributionControl = L.control.attribution();
      if (this.attribution) {
        this.attributionControl.addTo(this.map);
      }
      // Scale
      this.scaleControl = L.control.scale();
      this.scaleControl.setPosition(this.scaleControlPos);
      if (this.scale) {
        this.scaleControl.addTo(this.map);
      }
      // Zoom
      this.zoomControl = L.control.zoom({
        zoomInTitle  : 'Zoom +',
        zoomOutTitle : 'Zoom -'
      });
      this.zoomControl.setPosition(this.zoomControlPos);
      if (this.zoom) {
        this.zoomControl.addTo(this.map);
      }
      // Lang: Add custom internal translations
      this.mergeLangs(leafletLang.customValues);
      // Lang: Add external translations if any
      this.mergeLangs(this.lang);
      // Lang: set internal draw control texts
      this.setLeafletLang();
      // Events
      this.configureEventListener();
    },
    /**
     * Create a WMSLayer
     * @param {Object} layer layer
     * @returns {Object | String} layer added, or error
     */
    addWMSLayer(layer) {
      return this.$refs.layerTool.addWMSLayer(layer);
    },
    /**
     * Request to Geoserver for layer info and create a WFSLayer
     * @param {Object} layer layer
     * @returns {Promise} Promise of execution with layer inside
     */
    addWFSLayer(layer) {
      return this.$refs.layerTool.addWFSLayer(layer);
    },
    /**
     * Switch a layer
     * @param {Object} layer layer
     */
    switchLayer(layer) {
      this.$refs.layerTool.switchLayer(layer);
    },
    /**
     * Remove layer with server id from map, not object
     * @param {String} serverId layer id
     * @param {String} filter layer filter: optional, sometimes we use same serverid with filters
     * @return {String} ok or error
     */
    removeLayer(serverId, filter) {
      return this.$refs.layerTool.removeLayer(serverId, filter);
    },
    /**
     * Remove all custom layers from map, not object
     */
    removeAllLayers() {
      this.$refs.layerTool.removeAllLayers();
    },
    /**
     * Returns all layers
     * @param {Bool} external if external layers or internal
     * @returns {Array} layers
     */
    getAllLayers(external) {
      return this.$refs.layerTool.getAllLayers(external);
    },
    /**
     * Draw a circle
     */
    createCircle() {
      this.$refs.geoTool.createCircle();
    },
    /**
     * Draw a polygon
     */
    createPolygon() {
      this.$refs.geoTool.createPolygon();
    },
    /**
     * Draw a corridor
     */
    createCorridor() {
      this.$refs.geoTool.createCorridor();
    },
    /**
     * Confirm draw
     */
    confirmPaint() {
      this.$refs.geoTool.confirmPaint();
    },
    /**
     * Cancel draw
     */
    cancelPaint() {
      this.$refs.geoTool.cancelPaint();
    },
    /**
     * Update circle radius on create or edit
     * @param {Number} radius meters
     */
    updateCircleRadius(radius) {
      this.$refs.geoTool.updateCircleRadius(radius);
    },
    /**
     * Update corridor width on create or edit
     * @param {Number} width meters
     */
    updateCorridorWidth(width) {
      this.$refs.geoTool.updateCorridorWidth(width);
    },
    /**
     * Cancel whole geofence edit process from host app
     */
    cancelGeoProcess() {
      this.$refs.geoTool.cancelGeoProcess();
    },
    /**
     * Add eventlisteners
     */
    configureEventListener() {
      // Map:
      this.map.on('click', e => {
        this.onClick(e);
      });
      this.map.on('error', e => {
        this.triggerError(e);
      });
      this.map.on('dataload', e => {
        this.$emit('dataload', e);
      });
      this.map.on('geofenceClicked', e => {
        this.$emit('geofenceClicked', e);
      });
      this.map.on('geofenceSelected', e => {
        this.$emit('geofenceSelected', e);
      });
      this.map.on('shapeCreating', e => {
        this.$emit('shapeCreating', e);
      });
      this.map.on('shapeUpdating', e => {
        this.$emit('shapeUpdating', e);
      });
      this.map.on('shapeDeleting', e => {
        this.$emit('shapeDeleting', e);
      });
      this.map.on('circleRadiusUpdated', e => {
        this.$emit('circleRadiusUpdated', e);
      });
      // TODO unbind with map.off on destroy?
    },
    /**
     * Find features in a point determined by the coordinates
     * @param {Object} coordinates Coordinates of point
     * @returns {Object} Object with features info
     */
    async getFeaturesInCoord(coordinates) {
      /* change cursor style */
      this.$refs.mapContainer.style.cursor = 'progress';
      let noDataError = false;
      let currentLayersTypenames = '';
      let currentLayersFilter = '';
      // Only if active layers
      if (this.$refs.layerTool.layersLoaded.length > 0) {
        this.$refs.layerTool.layersLoaded.forEach(element => {
          // Get all layer typenames
          if (element.namespace && element.serverId && element.geometry) {
            currentLayersTypenames += (currentLayersTypenames === '') ? '' : ',';
            currentLayersTypenames += `${element.namespace}:${element.serverId}`;
            // Construct filter for every layer
            currentLayersFilter += (currentLayersFilter === '') ? '' : ';';
            currentLayersFilter += `INTERSECTS(${element.geometry},POINT(${coordinates.lat} ${coordinates.lng}))`;
            if (element.filter) {
              currentLayersFilter += ` AND (${element.filter})`;
            }
          }
          else {
            noDataError = true;
          }
        });
        // If request cannot be made
        if (noDataError) {
          this.triggerError(this.$t('error.layerincomplete'));
        }
        // Otherwise, proceed
        else {
          const queryParams = {
            'service'      : 'wfs',
            'version'      : '2.0.0',
            'request'      : 'GetFeature',
            'typeName'     : currentLayersTypenames,
            'cql_filter'   : currentLayersFilter,
            'outputFormat' : 'application/json'
          };
          try {
            await service.getRequest(this.baseUrl, queryParams)
              .then(response => {
                if (response.features) {
                  this.pointData = response.features;
                  if (!this.selectingGeofence) {
                    this.$emit('pointData', this.pointData);
                  }
                  if (this.showInfoPopup) {
                    this.showPopup(coordinates, this.featuresToHtml(this.pointData));
                  }
                }
                else {
                  this.triggerError(this.$t('error.nofeatsresp'));
                }
              });
          }
          catch (error) {
            this.triggerError(this.$t('error.getIntersections'));
          }
        }
      }
      // Otherwise show popup with message
      else if (this.showInfoPopup) {
        this.showPopup(coordinates, this.$t('layerControl.noactivelayers'));
      }
      /* restore cursor style */
      this.$refs.mapContainer.style.cursor = '';

    },
    /**
     * Show L popup
     * @param {Object} coordinates location of popup
     * @param {Object} content popup content
     */
    showPopup(coordinates, content) {
      L.popup({ minWidth : 200, className : 'dl-ui-leaflet-map__popup-custom' })
        .setLatLng(coordinates)
        .setContent(content)
        .openOn(this.map);
    },
    /**
     * Render html
     * @param {Array} features Array to process
     * @return {String} html
     */
    featuresToHtml(features) {
      // TODO process whatever features contains and create html, or import a new compo and pass prop features
      let msg;
      if (features.length === 0) {
        msg = `<p>${this.$t('geoControl.nofeats')}</p>`;
      }
      else if (features.length > 1 && !this.selectingGeofence) {
        msg = `<p>${this.$t('geoControl.severalfeats')}</p>`;
      }
      else {
        const ftId = features[0].id || 'No id';
        const ftName = features[0].properties.name_feature || 'No properties.name_feature';
        const ftLayer = features[0].properties.layer_name || 'No properties.layer_name';
        msg = `<p>Id: <b>${ftId}</b></p>`;
        msg += `<p>Name: ${ftName}</p>`;
        msg += `<p>Layer: <b>${ftLayer}</b></p>`;
      }
      return `<div class="dl-ui-leaflet-map__popup-custom-content">${msg}</div>`;
    },
    /**
     * Callback funtion when user press on map
     * @param {Object} e Event data
     */
    onClick(e) {
      this.$emit('click', e);
      // If an entity is selected, remove associated lines and deselect it:
      if (this.selectedEntity) {
        this.removeGeometry(this.selectedEntity.options.customId);
        this.removeSelectedStyles();
        this.selectedEntity.unbindPopup();
        this.$emit('entityNotWaiting', this.selectedEntity.options.customId);
        this.selectedEntity = null;
      }
      const geofenceAction = this.$refs.geoTool.geoStatus !== this.$refs.geoTool.geoModes.idle;
      // If prop enabled but not interfering with geotool, or geotool child needs to access point info
      if ((this.getInfoOnClick && !geofenceAction) || this.selectingGeofence) {
        this.getFeaturesInCoord(e.latlng);
      }
    },
    /**
     * Callback function when error occurs
     * @param {String} type type of message: snack's ok, warn, error, default
     * @param {String} text text
     * @param {Number} time millisecs
     */
    triggerSnack(type, text, time) {
      let fixedMsg;
      switch (type) {
        case 'ok':
          fixedMsg = this.$t('error.success');
          break;
        case 'warn':
          fixedMsg = this.$t('error.warn');
          break;
        case 'error':
          fixedMsg = this.$t('error.error');
          break;
        default:
          break;
      }
      this.mapSnackData = {
        show     : true,
        text     : [fixedMsg, text],
        timeout  : time || 4000,
        type,
        position : 'absolute'
      };
    },
    /**
     * Get map center coords
     * @returns {Object} coords
     */
    getPosition() {
      return this.map.getCenter();
    },
    /**
     * Position map with some options
     * @param {Object} params options
     */
    setPosition(params) {
      const zoom = params.zoom && params.zoom >= 1 && params.zoom <= 20 ? params.zoom : this.map.getZoom();
      const animation = !!(params.animation && params.animation === true);
      const time = params.duration && params.duration >= 1 && params.duration <= 5 ? params.duration : 1;
      this.map.flyTo(new L.LatLng(params.lat, params.lng), zoom, { animate : animation, duration : time });
    },
    /**
     * Gets map current zoom level
     * @returns {Number} zoom
     */
    getZoom() {
      return this.map.getZoom();
    },
    /**
     * Zoom map with to number
     * @param {Number} zoom zoom
     */
    setZoom(zoom) {
      if (zoom && zoom >= 1 && zoom <= 20) {
        this.map.setZoom(zoom);
      }
    },
    /**
     * Merges external i18n lang values with internal ones
     * Called when lang prop changes and on init
     * @param {Object} langs lang values
     */
    mergeLangs(langs) {
      if (langs &&
          typeof langs === 'object' &&
          langs.constructor === Object &&
          Object.prototype.hasOwnProperty.call(langs, 'en-GB') &&
          Object.prototype.hasOwnProperty.call(langs, 'es-ES')) {
        this.$i18n.mergeLocaleMessage('en-GB', langs['en-GB']);
        this.$i18n.mergeLocaleMessage('es-ES', langs['es-ES']);
      }
      else {
        this.$emit('error', 'Languages could not be merged. Check the lang object has en-GB and es-ES entries.');
      }
    },
    /**
     * Updates internal leaflet langs like tooltips
     */
    setLeafletLang() {
      L.drawLocal = leafletLang.drawTool[this.$i18n.locale];
    },
    /**
     * Travels to a specific feature
     * @param {String} id id of geoserver / feature
     * @return {Object} ok or error
     */
    async viewFeature(id) {
      const queryParams = {
        'request'      : 'GetFeature',
        'featureID'    : id,
        'outputFormat' : 'application/json'
      };
      try {
        await service.getRequest(this.baseUrl, queryParams)
          .then(response => {
            if (response.bbox) {
              const bounds = [[response.bbox[0], response.bbox[1]], [response.bbox[2], response.bbox[3]]];
              this.map.flyToBounds(bounds);
              // And... after flying, highlight shape for a sec? */
            }
            else {
              this.triggerError(this.$t('error.featnotfound'));
            }
          });
      }
      catch (error) {
        this.triggerError(this.$t('error.featnotloaded'));
        return { error };
      }
      return { ok : id };
    },
    /**
     * Add an entity
     * @param {Object} config config
     * @return {Object} id or error
     */
    addEntity(config) {
      // Not without coords
      if (config.pos === undefined || config.pos.lat === undefined || config.pos.long === undefined) {
        return { error : 'No position supplied.' };
      }
      // Initialise group and zoom listener only if using entities
      if (this.entityGroup === null) {
        this.entityGroup = L.layerGroup().addTo(this.map);
        this.setMovementListener();
      }
      config.icon === undefined && (config.icon = 'drone');
      config.heading === undefined && (config.heading = 0);
      const id = config.id || this.makeRandomId();
      const entityIcon = L.divIcon({
        ...this.entityIconOptions,
        html : `<div class="dl-ui-leaflet-icon ${config.icon}" style="transform:rotate(${config.heading}deg) scale(${this.calculateScale})"></div>`
      });
      const options = {
        customId     : id,
        customIcon   : config.icon,
        icon         : entityIcon,
        heading      : config.heading,
        popupContent : config.popupContent || id,
        tooltip      : config.tooltip
      };
      const marker = new L.Marker([config.pos.lat, config.pos.long], options)
        .on('click', this.entityOnClick)
        .addTo(this.entityGroup);
      // Tooltip
      if (config.tooltip !== undefined) {
        marker.bindTooltip(config.tooltip, {
          permanent : true,
          direction : 'bottom',
          offset    : [0, 25],
          opacity   : 0.7,
          className : 'dl-ui-leaflet-map__tooltip'
        }).closeTooltip();
        if (this.calculateScale === 1) {
          marker.openTooltip();
        }
      }
      // Use try catch and return error if so
      return { id };
    },
    /**
     * Update an entity
     * @param {Number} id id
     * @param {Object} config config
     * @return {Object} id or error
     */
    updateEntity(id, config) {
      const entity = this.entityGroup ?
        this.entityGroup.getLayers().find(layer => layer.options.customId === id) :
        null;
      if (!entity) {
        return { error : 'Entity not found.' };
      }
      let position;
      if (config.pos !== undefined && config.pos.lat && config.pos.long) {
        entity.setLatLng([config.pos.lat, config.pos.long]);
        position = {
          lat : config.pos.lat,
          lng : config.pos.long
        };
      }
      else {
        position = entity.getLatLng();
      }
      // Save memory and update only if coming into bbox
      if (this.map.getBounds().contains(position)) {
        // If coming into bbox, it may need look update
        this.updateEntityLook(entity);
        if (config.tooltip !== undefined && config.tooltip !== entity.options.tooltip) {
          if (entity.getTooltip()) {
            entity.setTooltipContent(config.tooltip);
          }
          else {
            entity.bindTooltip(config.tooltip, {
              permanent : true,
              direction : 'bottom',
              offset    : [0, 25],
              opacity   : 0.7,
              className : 'dl-ui-leaflet-map__tooltip'
            }).closeTooltip();
            if (this.calculateScale === 1) {
              entity.openTooltip();
            }
          }
          entity.options.tooltip = config.tooltip;
        }
        if (config.icon !== undefined && config.icon !== entity.options.customIcon) {
          const entityIcon = L.divIcon({
            ...this.entityIconOptions,
            html : `<div class="dl-ui-leaflet-icon ${config.icon}" style="transform:rotate(${entity.options.heading}deg) scale(${this.calculateScale})"></div>`
          });
          entity.setIcon(entityIcon);
          entity.options.customIcon = config.icon;
        }
        if (config.heading >= 0 && config.heading < 360 && config.heading !== entity.options.heading) {
          entity._icon.firstChild.style.transform = `rotate(${config.heading}deg) scale(${this.calculateScale})`;
          entity.options.heading = config.heading;
        }
        if (config.popupContent !== undefined && config.popupContent !== entity.options.popupContent) {
          entity.setPopupContent(config.popupContent);
          entity.options.popupContent = config.popupContent;
        }
      }
      // Use try catch and return error if so
      return { id };
    },
    /**
     * Delete an entity
     * @param {Number} id id
     * @return {Object} id or error
     */
    deleteEntity(id) {
      const entity = this.entityGroup ?
        this.entityGroup.getLayers().find(layer => layer.options.customId === id) :
        null;
      if (entity) {
        entity.removeFrom(this.entityGroup);
        // If a geometry is associated with same id, delete too
        this.removeGeometry(id);
        this.selectedEntity = null;
        return { ok : id };
      }
      else {
        return {
          error : 'Entity not found.'
        };
      }
      // Use try catch and return error if so
    },
    /**
     * Delete all entities
     */
    deleteAllEntities() {
      if (this.entityGroup) {
        // iterate over the entities object
        this.entityGroup.getLayers().forEach(entity => {
          this.deleteEntity(entity.options.customId);
        });
        this.entityGroup.clearLayers();
        this.entityGroup.remove();
        this.entityGroup = null;
      }
    },
    /**
     * Get all entities
     * @return {Object} entities
     */
    getAllEntities() {
      return this.entityGroup ? this.entityGroup.getLayers() : [];
    },
    /**
     * Removes other entities selected style
     */
    removeSelectedStyles() {
      const icons = this.$refs.mapContainer.querySelectorAll('.dl-ui-leaflet-icon');
      // For loop is faster
      for (let i = 0, n = icons.length; i < n; i++) {
        icons[i].className = icons[i].className.replace('_selected', '');
      }
    },
    /**
     * Entity click handler
     * @param {Event} e e
     */
    entityOnClick(e) {
      // Send clicked event always with entity
      this.$emit('entityClicked', e.target);
      if (this.selectedEntity === null || this.selectedEntity.options.customId !== e.target.options.customId) {
        this.removeSelectedStyles();
        this.selectedEntity = e.target;
        // Add selected style if any
        if (!e.target._icon.firstChild.className.includes('_selected')) {
          e.target._icon.firstChild.className += '_selected';
        }
        // If popup enabled, bind popup (only once)
        if (this.entityPopup) {
          if (e.target.getPopup() === undefined) {
            e.target.bindPopup(e.target.options.popupContent).openPopup();
          }
        }
        // Else, start external process thru event below, show progress in the meantime
        else if (e.target.getPopup() === undefined || !e.target.isPopupOpen()) {
          e.target._icon.classList.add('markerLoading');
          this.$emit('entityWaiting', e.target.options.customId);
        }
      }
    },
    /**
     * Entity click handler
     * @param {String} id id of associated drone
     * @param {Object} html htmlString
     * @return {Object} id or error
     */
    updatePopupContent(id, html) {
      const entity = this.entityGroup ?
        this.entityGroup.getLayers().find(layer => layer.options.customId === id) :
        null;
      if (!entity) {
        return {
          error : 'Entity not found.'
        };
      }
      try {
      // eslint-disable-next-line no-negated-condition
        if (!entity.getPopup()) {
          entity.bindPopup(html).openPopup();
          entity.getPopup().on('remove', () => {
            this.entityPopupClosed(entity);
          });
        }
        else {
          entity.setPopupContent(html);
        }
        // Return to normal cursor after external updating process
        entity._icon.classList.remove('markerLoading');
        return { ok : id };
      }
      catch (e) {
        return { error : e };
      }
    },
    /**
     * Entity click handler
     * @param {Object} e htmlString
     */
    entityPopupClosed(e) {
      e.unbindPopup();
      this.$emit('entityNotWaiting', e.options.customId);
    },
    /**
     * Entity click handler
     */
    setMovementListener() {
      // Add zoom behaviors for entities
      this.map.on('moveend', () => {
        // Save memory and update only those visible
        const visibleEntities = this.entityGroup ?
          this.entityGroup
            .getLayers()
            .filter(entity => this.map.getBounds().contains(entity.getLatLng())) :
          [];
        visibleEntities.forEach(entity => {
          this.updateEntityLook(entity);
        });
      });
    },
    /**
     * Sets entity tooltip and size depending on zoom level
     * @param {Object} entity entity
     *
     */
    updateEntityLook(entity) {
      const z = this.getZoom();
      if (z < 11) {
        if (entity.getTooltip() && entity.isTooltipOpen()) {
          entity.closeTooltip();
        }
        entity._icon.firstChild.style.transform = `rotate(${entity.options.heading}deg) scale(${this.calculateScale})`;
      }
      else {
        if (entity.getTooltip() && !entity.isTooltipOpen()) {
          entity.openTooltip();
        }
        entity._icon.firstChild.style.transform = `rotate(${entity.options.heading}deg) scale(${this.calculateScale})`;
      }
    },
    /**
     * Makes an icon with style config for marker of a FP
     * @param {String} label label of marker
     * @param {String} bgColor if it is start or end marker
     * @param {String} color if it is start or end marker
     * @returns {Object} icon of marker
     */
    getFPMarkerIcon(label = '', bgColor, color) {
      let style = '';
      if (bgColor) {
        style += `background:${bgColor};`;
      }
      if (color) {
        style += `color: ${color}; border: 2px solid ${color}77;`;
      }

      const icon = L.divIcon({
        className : 'dl-ui-leaflet-wayPoint',
        html      : `<span style="${style}">${label}</span>`
      });

      return { icon };
    },
    /**
     * Add markers to map
     * @param {Object} config config
     * @return {Object} ok or error
     */
    addMarkers(config) {
      if (this.geometryGroup === null) {
        this.geometryGroup = L.layerGroup().addTo(this.map);
      }
      try {
        const markerGroup = new L.FeatureGroup([], {
          customId : config.id
        });

        config.latlngs.forEach((point, index) => {
          const icon = this.getFPMarkerIcon(index + 1, config.markerColor, config.color);
          L.marker([point.lat, point.lng], icon).addTo(markerGroup);
        });

        markerGroup
          .on('click', this.geometryOnClick)
          .addTo(this.geometryGroup);
        config.zoomTo && this.map.flyToBounds(markerGroup.getBounds(), { padding : [15, 15] });
        return { ok : 'ok' };
      }
      catch (e) {
        return { error : e };
      }

    },
    /**
     * Add a circle to map
     * @param {Object} config config
     * @return {Object} ok or error
     */
    addCircle(config) {
      // Initialise only if using geometries
      if (this.geometryGroup === null) {
        this.geometryGroup = L.layerGroup().addTo(this.map);
      }

      const circleOptions = {
        color       : config.color || this.geometryOptions.color,
        weight      : config.weight || this.geometryOptions.weight,
        fill        : config.fill || this.geometryOptions.fill,
        fillColor   : config.fillColor || this.geometryOptions.fillColor,
        opacity     : config.opacity || this.geometryOptions.opacity,
        fillOpacity : config.fillOpacity || this.geometryOptions.fillOpacity,
        radius      : config.radius || 100
      };

      try {
        const circleGroup = new L.FeatureGroup([], {
          customId : config.id
        });

        const center = L.latLng(config.latlng);
        const circle = L.circle(center, circleOptions).addTo(circleGroup);

        if (config.addMarker) {
          const icon = this.getFPMarkerIcon(config.markerLabel, config.markerColor, config.color);
          L.marker(config.latlng, icon).addTo(circleGroup);
        }

        circleGroup
          .on('click', this.geometryOnClick)
          .addTo(this.geometryGroup);
        config.zoomTo && this.map.flyToBounds(circle.getBounds(), { padding : [15, 15] });
        return { ok : 'ok' };
      }
      catch (e) {
        return { error : e };
      }

    },
    /**
     * Adds a polyline to map
     * @param {Object} config config
     * @param {String} startsWith first index of markers
     * @param {Boolean} isEnd indicates if geometry ends
     * @return {Object} ok or error
     */
    addPolyline(config) {
      // Initialise only if using geometries
      if (this.geometryGroup === null) {
        this.geometryGroup = L.layerGroup().addTo(this.map);
      }

      const lineOptions = {
        color  : config.color || this.geometryOptions.color,
        weight : config.weight || this.geometryOptions.weight
      };

      try {
        const lineGroup = new L.FeatureGroup([], {
          customId : config.id
        });

        // Swap order if needed
        let points = config.latlngs;
        if (config.swapCoords) {
          points = L.GeoJSON.coordsToLatLngs(points, config.coordDepth || 0);
        }

        const polyline = L.polyline(points, lineOptions).addTo(lineGroup);

        if (config.addMarkers) {
          const markerConfig = {
            id          : config.id,
            latlngs     : points,
            color       : config.color || this.geometryOptions.color,
            markerColor : config.markerColor || this.geometryOptions.fillColor
          };
          this.addMarkers(markerConfig);
        }

        lineGroup
          .on('click', this.geometryOnClick)
          .addTo(this.geometryGroup);
        config.zoomTo && this.map.flyToBounds(polyline.getBounds(), { padding : [15, 15] });
        return { ok : 'ok' };
      }
      catch (e) {
        return { error : e };
      }
    },
    /**
     * Add a polygon to map
     * @param {Object} config config
     * @param {String} startsWith first index of markers
     * @return {Object} ok or error
     */
    addPolygon(config) {
      // Initialise only if using geometries
      if (this.geometryGroup === null) {
        this.geometryGroup = L.layerGroup().addTo(this.map);
      }

      const polygonOptions = {
        color       : config.color || this.geometryOptions.color,
        weight      : config.weight || this.geometryOptions.weight,
        fill        : config.fill || this.geometryOptions.fill,
        fillColor   : config.fillColor || this.geometryOptions.fillColor,
        opacity     : config.opacity || this.geometryOptions.opacity,
        fillOpacity : config.fillOpacity || this.geometryOptions.fillOpacity
      };

      try {
        const polygonGroup = new L.FeatureGroup([], {
          customId : config.id
        });

        // remove duplicates
        let points = Array.from(new Set(config.latlngs.map(JSON.stringify)), JSON.parse);

        // Swap order if needed
        if (config.swapCoords) {
          points = L.GeoJSON.coordsToLatLngs(points, config.coordDepth || 0);
        }

        const polygon = L.polygon(points, polygonOptions).addTo(polygonGroup);

        if (config.addMarkers) {
          const markerConfig = {
            id          : config.id,
            latlngs     : points,
            color       : config.color || this.geometryOptions.color,
            markerColor : config.markerColor || this.geometryOptions.fillColor
          };
          this.addMarkers(markerConfig);
        }

        polygonGroup
          .on('click', this.geometryOnClick)
          .addTo(this.geometryGroup);
        config.zoomTo && this.map.flyToBounds(polygon.getBounds(), { padding : [15, 15] });
        return { ok : 'ok' };
      }
      catch (e) {
        return { error : e };
      }
    },
    /**
     * Geometry click handler
     * @param {Event} e e
     */
    geometryOnClick(e) {
      this.$emit('geometryClicked', e);
      L.DomEvent.stopPropagation(e);
    },
    /**
     * Removes a generic geometry from map
     * @param {Object} id ids
     * @return {Object} id or error
     */
    removeGeometry(id) {
      try {
        if (this.geometryGroup) {
          this.geometryGroup.getLayers().forEach(layer => {
            if (layer.options.customId === id) {
              layer.removeFrom(this.geometryGroup);
            }
          });
        }
      }
      catch (e) {
        return { error : e };
      }
      return { ok : id };
    },
    /**
     * Removes all geometries from map
     * @return {Object} ok or error
     */
    removeAllGeometries() {
      try {
        if (this.geometryGroup) {
          this.geometryGroup.getLayers().forEach(layer => {
            layer.removeFrom(this.geometryGroup);
          });
        }
        this.geometryGroup = null;
        return { ok : 'ok' };
      }
      catch (e) {
        return { error : e };
      }
    },
    /**
     * Update map snack status when child changes
     */
    snackClosed() {
      this.mapSnackData.show = false;
    },
    /**
     * Changes basemap
     * @param {String} newBasemap basemap
     */
    changeBaseMap(newBasemap) {
      this.$refs.basemapTool.changeBaseMap(newBasemap);
    },
    /**
     * Handles errors
     * @param {String} error error
     */
    triggerError(error) {
      this.triggerSnack('error', error);
      this.$emit('error', error);
    }
  },
  //  DEMO META DATA
  ...metadata
};
