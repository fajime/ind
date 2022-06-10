<!-- eslint-disable max-lines -->
<template>
  <!-- Leaflet geo tool -->
  <div class="dl-ui-leaflet-geotool">
    <!-- Button Group: Idle -->
    <div
      v-show="geoStatus == geoModes.idle"
      class="dl-ui-leaflet-geotool__buttons"
    >
      <dl-ui-abutton
        class="geotool-button"
        icon="dl-leaflet-add"
        :title="$t('geoControl.add')"
        @clicked="createGeofence"
      />
      <dl-ui-abutton
        class="geotool-button"
        icon="dl-leaflet-edit"
        :title="$t('geoControl.edit')"
        @clicked="selectGeofence('update')"
      />
      <dl-ui-abutton
        class="geotool-button"
        icon="dl-leaflet-delete"
        :title="$t('geoControl.delete')"
        @clicked="selectGeofence('delete')"
      />
    </div>

    <!-- Button Group: Geofence Shape Selection -->
    <div
      v-show="geoStatus == geoModes.selectingGeofenceType"
      class="dl-ui-leaflet-geotool__buttons"
    >
      <dl-ui-abutton
        class="geotool-button"
        icon="dl-leaflet-circle"
        :title="$t('geoControl.circle')"
        @clicked="createCircle"
      />
      <dl-ui-abutton
        class="geotool-button"
        icon="dl-leaflet-polygon"
        :title="$t('geoControl.polygon')"
        @clicked="createPolygon"
      />
      <dl-ui-abutton
        class="geotool-button"
        icon="dl-leaflet-corridor"
        :title="$t('geoControl.corr')"
        @clicked="createCorridor"
      />
      <dl-ui-abutton
        class="geotool-button"
        icon="dl-leaflet-cancel"
        :title="$t('geoControl.cancel')"
        @clicked="cancelGeoProcess"
      />
    </div>

    <!-- Button Group: Geofence Draw Actions -->
    <div v-show="painting" class="dl-ui-leaflet-geotool__buttons">
      <dl-ui-abutton
        class="geotool-button geotool-button--confirm"
        icon="dl-leaflet-2confirm"
        :disabled="paintStatus < paintModes.drawn"
        :title="$t('geoControl.confirm')"
        @clicked="confirmPaint"
      />
      <dl-ui-abutton
        v-show="
          geoStatus == geoModes.addingPolygon ||
            geoStatus == geoModes.addingCorridor
        "
        class="geotool-button"
        icon="dl-leaflet-undo"
        :disabled="paintStatus != paintModes.drawingUndoable"
        :title="$t('geoControl.undo')"
        @clicked="undoPaintStep"
      />
      <dl-ui-abutton
        class="geotool-button"
        icon="dl-leaflet-cancel"
        :title="$t('geoControl.cancel')"
        @clicked="cancelPaint"
      />
    </div>

    <!-- Button Group: Geofence Selection Actions -->
    <div
      v-show="geoStatus == geoModes.selectingGeofence"
      class="dl-ui-leaflet-geotool__buttons"
    >
      <dl-ui-abutton
        class="geotool-button"
        icon="dl-leaflet-confirm"
        :disabled="selectedGeofence === null"
        :title="$t('geoControl.confirms')"
        @clicked="geofenceSelected"
      />
      <dl-ui-abutton
        class="geotool-button"
        icon="dl-leaflet-cancel"
        :title="$t('geoControl.confirms')"
        @clicked="cancelGeoProcess"
      />
    </div>

    <!-- Button Group: Editing geofence block -->
    <div v-show="editing || deleting" class="dl-ui-leaflet-geotool__buttons">
      <dl-ui-abutton
        class="geotool-button geotool-button--confirm"
        icon="dl-leaflet-2confirm"
        :disabled="lastConfirmDisabled"
        :title="$t('geoControl.final')"
        @clicked="confirmPaint"
      />
      <dl-ui-abutton
        class="geotool-button"
        icon="dl-leaflet-cancel"
        :title="$t('geoControl.cancel')"
        @clicked="cancelGeoProcess"
      />
    </div>
  </div>
</template>
<script>
/* istanbul ignore file  */
import * as L from 'leaflet';
import 'leaflet-draw';
import '../js/corridorExtension';

import DlUiAbutton from '../../../atoms/dl-ui-action-button';

export default {
  name       : 'DlLeafletWcGeofenceTool',
  components : {
    DlUiAbutton
  },
  props : {
    /**
     * parent's leaflet map object
     */
    map : {
      type    : Object,
      default : () => null
    },
    /**
     * parent's clicked point data
     */
    pointData : {
      type    : Array,
      default : () => []
    },
    /** Flag to disable intersection when creating shapes */
    allowIntersection : {
      type    : Boolean,
      default : true,
      desc    : 'Flag to disable intersection when creating shapes'
    }
  },
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      geoModes : {
        idle                  : 0,
        selectingGeofenceType : 1,
        addingPolygon         : 2,
        addingCircle          : 3,
        addingCorridor        : 4,
        selectingGeofence     : 5,
        editingCircle         : 6,
        editingCorridor       : 7,
        editingPolygon        : 8,
        deletingGeofence      : 9
      },
      geoStatus  : 0,
      paintModes : {
        idle            : 0,
        drawing         : 1,
        drawingUndoable : 2,
        drawn           : 3,
        drawnEdited     : 4
      },
      paintStatus     : 0,
      selectionFor    : null,
      polylineOptions : {
        allowIntersection : this.allowIntersection,
        drawError         : {
          color   : '$color-status-danger-02k',
          timeout : 2500
        },
        shapeOptions : {
          stroke    : true,
          color     : '$color-action-secondary-default',
          weight    : 20,
          opacity   : 0.5,
          fill      : false,
          clickable : true
        },
        showLength        : true,
        guidelineDistance : 20
      },
      polygonOptions : {
        allowIntersection : this.allowIntersection,
        drawError         : {
          color   : '$color-status-danger-02k',
          timeout : 2500
        },
        shapeOptions : {
          stroke      : true,
          color       : '$color-action-secondary-contrast',
          weight      : 4,
          opacity     : 0.6,
          fill        : true,
          fillColor   : '$color-action-secondary-default',
          fillOpacity : 0.3,
          clickable   : true
        },
        showArea          : true,
        showLength        : true,
        guidelineDistance : 20
      },
      circleOptions : {
        shapeOptions : {
          stroke      : true,
          color       : '$color-action-secondary-contrast',
          weight      : 4,
          opacity     : 0.6,
          fill        : true,
          fillColor   : '$color-action-secondary-default',
          fillOpacity : 0.3,
          clickable   : true
        },
        showRadius : true
      },
      deletingShapeOptions : {
        stroke      : true,
        color       : '$color-status-danger-02k',
        weight      : 4,
        dashArray   : '5, 5',
        opacity     : 1,
        fill        : true,
        fillColor   : '$color-status-danger-02k',
        fillOpacity : 0.5,
        clickable   : false
      },
      drawObject          : null,
      eventLayer          : null,
      selectedGeofence    : null,
      temporaryShape      : null,
      temporaryLayer      : null,
      lastConfirmDisabled : true
    };
  },
  computed : {
    /**
     * Calculates if any shape is being added
     * @returns {Bool} val
     */
    painting() {
      return (
        this.geoStatus === this.geoModes.addingCircle ||
        this.geoStatus === this.geoModes.addingPolygon ||
        this.geoStatus === this.geoModes.addingCorridor
      );
    },
    /**
     * Calculates if any shape is being edited
     * @returns {Bool} val
     */
    editing() {
      return (
        this.geoStatus === this.geoModes.editingCircle ||
        this.geoStatus === this.geoModes.editingPolygon ||
        this.geoStatus === this.geoModes.editingCorridor
      );
    },
    /**
     * Calculates if any shape is being deleted
     * @returns {Bool} val
     */
    deleting() {
      return this.geoStatus === this.geoModes.deletingGeofence;
    }
  },
  watch : {
    /**
     * Soon as map is ready, start listeners
     */
    map() {
      this.init();
    },
    /**
     * Listen to clicked point data if we're selecting a geofence
     * @param {Array} val val
     */
    pointData(val) {
      this.removeTemporaryShape();
      if (val.length && this.geoStatus === this.geoModes.selectingGeofence) {
        this.selectedGeofence = val[0];
        this.drawSelectedGeofence();
        // Emit geofence data so HMI can proceed to load it
        this.map.fireEvent('geofenceClicked', this.selectedGeofence);
      }
    }
  },
  methods : {
    /**
     * Initialization
     */
    init() {
      // Creating, each vertex on polygon, corridor
      this.map.on('draw:drawvertex', e => {
        if (e.layers && e.layers.getLayers()) {
          e.layers.getLayers().forEach((element, i) => {
            if (this.geoStatus === this.geoModes.addingPolygon && i === 0) {
              element._icon.classList.add('leaflet-icon-hlight');
            }
            if (this.geoStatus === this.geoModes.addingCorridor) {
              if (i === e.layers.getLayers().length - 1) {
                element._icon.classList.add('leaflet-icon-hlight');
              }
              else {
                element._icon.classList.remove('leaflet-icon-hlight');
              }
            }
            element._icon.innerText = i + 1;
          });
        }
        if (
          (this.geoStatus === this.geoModes.addingPolygon ||
            this.geoStatus === this.geoModes.addingCorridor) &&
          Object.keys(e.layers._layers).length > 1
        ) {
          this.changePaintStatus('drawingUndoable');
        }
        else {
          this.changePaintStatus('drawing');
        }
      });
      // Creating: finished any
      this.map.on('draw:created', e => {
        if (e.layerType === 'polyline') {
          /* On corridors, we must use the corridor extension so we can play with width
             Set a width appropiate for current position */
          this.polylineOptions.shapeOptions.corridor = this.calculateCorridor();
          this.eventLayer = L.corridor(
            e.layer.editing.latlngs[0],
            this.polylineOptions.shapeOptions
          ).addTo(this.map);
        }
        else {
          this.eventLayer = e.layer;
        }
        this.eventLayer.addTo(this.map);
        this.changePaintStatus('drawn');
        this.eventLayer.editing.enable(); // -- for activating edition after creation
        if (e.layerType === 'polyline' || e.layerType === 'polygon') {
          this.updateMiddleMarkers(); // -- for activating middle marker difference
        }
      });
      // Editing: on edit circles center
      this.map.on('draw:editmove', e => {
        this.eventLayer = e.layer;
        this.changePaintStatus('drawnEdited');
        this.lastConfirmDisabled = false;
      });
      // Editing: on edit circles radius
      this.map.on('draw:editresize', e => {
        // Host app may wanna know when radius has been edited:
        this.map.fireEvent('circleRadiusUpdated', e.layer);
        this.eventLayer = e.layer;
        this.changePaintStatus('drawnEdited');
        this.lastConfirmDisabled = false;
      });
      // Editing: on edit polygons or polylines
      this.map.on('draw:editvertex', e => {
        this.eventLayer = e.poly;
        this.changePaintStatus('drawnEdited');
        this.lastConfirmDisabled = false;
      });
    },
    /**
     * Update status
     * @param {String} val val
     */
    changeStatus(val) {
      this.geoStatus = this.geoModes[val];
    },
    /**
     * Update paint status
     * @param {String} val val
     */
    changePaintStatus(val) {
      this.paintStatus = this.paintModes[val];
    },
    /**
     * Start creating a geofence
     */
    createGeofence() {
      // Go to shape selection
      this.changeStatus('selectingGeofenceType');
    },
    /**
     * Selecting a geofence
     * @param {String} forWhat delete or update
     */
    selectGeofence(forWhat) {
      this.selectionFor = forWhat;
      // Go to selection status
      this.changeStatus('selectingGeofence');
    },
    /**
     * Selected a geofence
     */
    geofenceSelected() {
      // Close all popups
      this.map.closePopup();
      // Emit geofence data so HMI can proceed to edit it
      this.map.fireEvent('geofenceSelected', {
        selectedFor : this.selectionFor,
        shape       : this.selectedGeofence
      });
      // If selection made for deletion
      if (this.selectionFor === 'delete') {
        this.changeStatus('deletingGeofence');
        this.lastConfirmDisabled = false;
        this.temporaryShape.setStyle(this.deletingShapeOptions);
        return;
      }
      // Else, updating.
      if (this.selectedGeofence.properties.geom_radius > 0) {
        this.changeStatus('editingCircle');
        // For circles, we need to paint a new one on center radius mode
        this.temporaryShape.remove();
        this.temporaryShape = L.circle(
          L.latLng(
            this.selectedGeofence.properties.geom_center.geometries[0]
              .coordinates[1],
            this.selectedGeofence.properties.geom_center.geometries[0]
              .coordinates[0]
          ),
          this.selectedGeofence.properties.geom_radius,
          this.circleOptions.shapeOptions
        ).addTo(this.map);
      }
      else if (this.selectedGeofence.properties.geom_radius < 0) {
        this.changeStatus('editingCorridor');
        // For corridors, similar
        this.temporaryShape.remove();
        // Add here the width from the selected geofence
        this.polylineOptions.shapeOptions.corridor =
          this.selectedGeofence.properties.geom_radius * -1;
        this.temporaryShape = L.corridor(
          L.GeoJSON.coordsToLatLngs(
            this.selectedGeofence.properties.geom_center.geometries[0]
              .coordinates
          ),
          this.polylineOptions.shapeOptions
        ).addTo(this.map);
      }
      else if (this.selectedGeofence.properties.geom_radius === null) {
        this.changeStatus('editingPolygon');
        // For polygons we can just use
        this.temporaryShape.setStyle(this.polygonOptions.shapeOptions);
      }
      // Swap layers: Get and shallow-copy the related layer, so we can remove during process
      const layer = this.$parent.$refs.layerTool.customLayersChildren.find(
        theLayer =>
          theLayer.filter.includes(this.selectedGeofence.properties.layer_name)
      );
      this.temporaryLayer = { ...layer };
      // Duplicate the leaflet layer object so it is not overwritten and kept for reactivation
      this.temporaryLayer.leafletLayer = this.temporaryLayer.layer;
      // Now add the same layer temporarily, but without this feature (changing filter)
      this.temporaryLayer.filter = `not in ('${this.selectedGeofence.id}') AND ${this.temporaryLayer.filter}`;
      this.temporaryLayer.visible = true;
      this.$parent.addWMSLayer(this.temporaryLayer).then(() => {
        this.map.removeLayer(this.temporaryLayer.leafletLayer);
      });
      // Close up:
      this.map.flyToBounds(this.temporaryShape, {
        padding  : [30, 30],
        duration : 1
      });
      // Finally enable editing after flyto (no callback, so we use timeout)
      setTimeout(() => {
        this.temporaryShape.editing.enable();
        if (
          this.geoStatus === this.geoModes.editingPolygon ||
          this.geoStatus === this.geoModes.editingCorridor
        ) {
          this.updateMiddleMarkers();
        }
      }, 1100);
    },
    /**
     * Turn middle markers smaller
     */
    updateMiddleMarkers() {
      // If we're on creation or edition:
      const theObject = this.temporaryShape || this.eventLayer;
      const theMarkers =
        theObject.editing._verticesHandlers[0]._markerGroup._layers;
      Object.keys(theMarkers).forEach(key => {
        theMarkers[key].once('mouseup', () => {
          setTimeout(() => {
            this.updateMiddleMarkers();
          }, 50);
        });
        const icon = theMarkers[key]._icon;
        if (
          theMarkers[key]._middleLeft === undefined &&
          theMarkers[key]._middleRight === undefined
        ) {
          theMarkers[key].setOpacity(0.4);
          icon.classList.add('leaflet-marker-middle');
        }
        else {
          icon.classList.remove('leaflet-marker-middle');
        }
      });
    },
    /**
     * Draw selected geofence
     */
    drawSelectedGeofence() {
      const coords = this.selectedGeofence.geometry.coordinates[0][0];
      this.temporaryShape = L.polygon(L.GeoJSON.coordsToLatLngs(coords), {
        color       : 'red',
        weight      : 2,
        fillColor   : '#f03',
        fillOpacity : 0.7
      }).addTo(this.map);
    },
    /**
     * Draw a circle
     */
    createCircle() {
      this.changeStatus('addingCircle');
      this.changePaintStatus('drawing');
      this.drawObject = new L.Draw.Circle(this.map, this.circleOptions);
      this.drawObject.enable();
    },
    /**
     * Draw a polygon
     */
    createPolygon() {
      this.changeStatus('addingPolygon');
      this.changePaintStatus('drawing');
      this.drawObject = new L.Draw.Polygon(this.map, this.polygonOptions);
      this.drawObject.enable();
    },
    /**
     * Draw a corridor
     */
    createCorridor() {
      this.changeStatus('addingCorridor');
      this.changePaintStatus('drawing');
      this.drawObject = new L.Draw.Polyline(this.map, this.polylineOptions);
      this.drawObject.enable();
    },
    /**
     * Update corridor width on edit
     * @returns {Number} a corridor in meters
     */
    calculateCorridor() {
      const currentWeight = this.polylineOptions.shapeOptions.weight;
      const centerLatLng = this.map.getCenter();
      const pointC = this.map.latLngToContainerPoint(centerLatLng); // convert to containerpoint (pixels)
      const pointX = [pointC.x + 1, pointC.y]; // add one pixel to x
      // convert containerpoints to latlng's
      const latLngC = this.map.containerPointToLatLng(pointC);
      const latLngX = this.map.containerPointToLatLng(pointX);
      const distance = latLngC.distanceTo(latLngX); // calculate distance between c and x (latitude)
      return (distance * currentWeight) / 2;
    },
    /**
     * Update circle radius on create or edit
     * @param {Number} radius meters
     */
    updateCircleRadius(radius) {
      // If we're on creation or edition:
      const shape = this.temporaryShape || this.eventLayer;
      if (shape && shape.setRadius) {
        shape.setRadius(radius);
        // This will force the drawing to adjust to new radius:
        shape.editing.disable();
        shape.editing.enable();
        this.changePaintStatus('drawnEdited');
        this.lastConfirmDisabled = false;
      }
    },
    /**
     * Update corridor width on create or edit
     * @param {Number} width meters
     */
    updateCorridorWidth(width) {
      // If we're on creation or edition:
      const shape = this.temporaryShape || this.eventLayer;
      if (shape && shape.updateCallback) {
        shape.corridor = width;
        shape.updateCallback.call(this.map);
        this.changePaintStatus('drawnEdited');
        this.lastConfirmDisabled = false;
      }
    },
    /**
     * Go to start, reset all
     */
    cancelGeoProcess() {
      // Reset edit actions
      this.removeTemporaryShape();
      if (this.temporaryLayer) {
        this.resetLayers();
      }
      this.cancelCreation();
      this.lastConfirmDisabled = true;
      this.changeStatus('idle');
      this.changePaintStatus('idle');
      this.map.closePopup();
    },
    /**
     * Remove temp items
     */
    removeTemporaryShape() {
      this.selectedGeofence = null;
      if (this.temporaryShape) {
        this.temporaryShape.editing.disable();
        this.temporaryShape.remove();
      }
      this.temporaryShape = null;
    },
    /**
     * Cancel switching layer process
     */
    resetLayers() {
      this.temporaryLayer.leafletLayer.once('load', () => {
        this.$parent.removeLayer(
          this.temporaryLayer.serverId,
          this.temporaryLayer.filter
        );
        this.temporaryLayer = null;
      });
      // Avoid caching
      this.temporaryLayer.leafletLayer.setParams({ ts : Date.now() }, false);
      this.map.addLayer(this.temporaryLayer.leafletLayer);
    },
    /**
     * Cancel creation process
     */
    cancelCreation() {
      // Reset create actions
      this.drawObject && this.drawObject.disable();
      this.drawObject = null;
      this.eventLayer && this.eventLayer.remove();
      this.eventLayer = null;
    },
    /**
     * Confirm shape
     */
    confirmPaint() {
      let settings;
      switch (this.geoStatus) {
        case this.geoModes.addingCircle:
          settings = {
            shape  : 'Circle',
            latlng : this.eventLayer._latlng,
            radius : this.eventLayer._mRadius
          };
          this.map.fireEvent('shapeCreating', settings);
          break;
        case this.geoModes.addingCorridor:
          settings = {
            shape    : 'Corridor',
            latlngs  : this.eventLayer._latlngs,
            corridor : this.eventLayer.corridor
          };
          this.map.fireEvent('shapeCreating', settings);
          break;
        case this.geoModes.addingPolygon:
          settings = {
            shape   : 'Polygon',
            latlngs : this.eventLayer._latlngs[0]
          };
          this.map.fireEvent('shapeCreating', settings);
          break;
        case this.geoModes.editingCircle:
          settings = {
            shape  : 'Circle',
            latlng : this.temporaryShape._latlng,
            radius : this.temporaryShape._mRadius
          };
          this.map.fireEvent('shapeUpdating', settings);
          break;
        case this.geoModes.editingCorridor:
          settings = {
            shape    : 'Corridor',
            latlngs  : this.temporaryShape._latlngs,
            corridor : this.temporaryShape.corridor
          };
          this.map.fireEvent('shapeUpdating', settings);
          break;
        case this.geoModes.editingPolygon:
          settings = {
            shape   : 'Polygon',
            latlngs : this.temporaryShape._latlngs[0]
          };
          this.map.fireEvent('shapeUpdating', settings);
          break;
        case this.geoModes.deletingGeofence:
          settings = {
            id : this.selectedGeofence.id
          };
          this.map.fireEvent('shapeDeleting', settings);
          break;
        default:
          break;
      }
    },
    /**
     * Reload a layer after some update
     * @param {Object} layer layer if it becomes dynamic, currently sensitive
     */
    reloadLayer(layer) {
      const layerToReload =
        this.$parent.$refs.layerTool.customLayersChildren.find(theLayer =>
          theLayer.filter.includes(layer)
        );
      /* This two lines will not make layer reload if browser's 'disable cache' is not enabled
         Lower line forces cache busting but may have performance implications for concurrent clients

         this.map.removeLayer(layerToReload.layer);
         this.map.addLayer(layerToReload.layer); */
      layerToReload.layer.setParams({ ts : Date.now() }, false);
    },
    /**
     * Undo last shape point
     */
    undoPaintStep() {
      this.drawObject.deleteLastVertex();
    },
    /**
     * Cancel shape
     */
    cancelPaint() {
      this.cancelCreation();
      this.changeStatus('selectingGeofenceType');
      this.changePaintStatus('idle');
    }
  }
};
</script>

<style lang="scss">
@import '../../../atoms/dl-ui-action-button/mixins/action-button';
@import '../mixins/leaflet-map';

// Configure Action Button
$config-button: (
  'height': 40px,
  'width': 40px,
  'icon::width': 24px,
  'icon::height': 24px,
  'border': none,
  'background': unset,
  'hover::button::background': $color-surface-05,
  'hover::icon::color': unset,
  'focus::button::background': $color-action-tertiary-default,
  'focus::button::border': unset,
  'focus::icon::color': $color-base-contrast
);

// Class for middle markers on polygons, added thru js
.leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-marker-middle {
  width: 8px !important;
  height: 8px !important;
  margin-left: -6px !important;
  margin-top: -6px !important;
}

// Geofence Buttons container
.dl-ui-leaflet-geotool__buttons {
  display: flex;
  flex-direction: column;
  background-color: $color-action-tertiary-contrast;
  border: 2px solid $color-surface-05;
  border-radius: 6px;
  box-shadow: $lmap-componentBoxShadow;

  // Geofence Buttons
  .geotool-button {
    @include action-button-style-config($config-button);

    &:first-child {
      border-radius: 4px 4px 0 0;
    }

    &:last-child {
      border-radius: 0 0 4px 4px;
    }

    &:not(:first-child, :last-child) {
      border-radius: 0;
    }

    &:not(&--disabled).geotool-button--confirm {
      svg {
        fill: $color-status-success-02k;
      }
    }
  }
}

/***************** Drawing points **************/
.leaflet-icon-hlight {
  background-color: $color-base-highlight-02 !important;
}

.leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon {
  width: 16px !important;
  height: 16px !important;
  margin-left: -11px !important;
  margin-top: -11px !important;
  border-radius: 20px;
  background-color: $color-base-highlight-02;
  border: solid 2px $color-base-contrast;
  text-align: center;
  line-height: 1.4 !important;
  color: $color-base-contrast;
  box-sizing: content-box;

  @include font-body-small-regular();
}
</style>
