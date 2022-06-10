<template>
  <div class="corner_content">
    <div class="draw-tool">
      <div class="draw-tool__container">
        <div class="draw-tool__row">
          <p class="draw-tool__label-medium">
            {{ lang.labelm1 }}
          </p>
          <p class="draw-tool__label-medium">
            {{ lang.labelm2 }}
          </p>
        </div>
        <div v-if="state === 'initial'" class="draw-tool__row draw-tool__row--actions">
          <dl-ui-button class="draw-tool__button" @clicked="startDrawing">
            {{ lang.start }}
          </dl-ui-button>
          <dl-ui-button class="draw-tool__button" @clicked="pickArea">
            {{ lang.click }}
          </dl-ui-button>
        </div>
        <div v-if="state === 'drawing'" class="draw-tool__row draw-tool__row--actions">
          <dl-ui-button class="draw-tool__button draw-tool__button--reddish" @clicked="cancelDrawing">
            {{ lang.cancel }}
          </dl-ui-button>
        </div>
        <div v-if="state === 'shapeDone'" class="draw-tool__row draw-tool__row--actions">
          <dl-ui-button class="draw-tool__button" @clicked="confirmShape">
            {{ lang.confirm }}
          </dl-ui-button>
          <dl-ui-button class="draw-tool__button draw-tool__button--reddish" @clicked="deleteMapShapes">
            {{ lang.delete }}
          </dl-ui-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* istanbul ignore file */
const Cesium = require('cesium/Source/Cesium');
import DlUiButton from '../../../atoms/dl-ui-button';
import geoserver from '../services';
const nominatimRepository = geoserver.use('NominatimService');
export default {
  name       : 'DrawTool',
  components : {
    'dl-ui-button' : DlUiButton
  },
  props : {
    /**
     * lang props
     */
    lang : {
      type    : Object,
      default : () => ({
        labelm1 : 'Draw in the map the area you want to analyze',
        labelm2 : '(Left click to add a vertex, right click to end shape)',
        start   : 'Start drawing',
        click   : 'Click on map',
        cancel  : 'Cancel',
        confirm : 'Confirm',
        delete  : 'Delete AOI'
      })
    },
    /**
     * viewer object
     */
    viewer : {
      type    : Object,
      default : () => {}
    }
  },
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      state                    : 'initial',
      activeShapePoints        : [],
      activeShapePointEntities : [],
      activeShape              : undefined,
      floatingPoint            : undefined,
      handler                  : undefined,
      camPos                   : {
        x : null,
        y : null,
        z : null
      },
      addmode       : null,
      dataSource    : new Cesium.GeoJsonDataSource('jsonArea'),
      loadedGeoJson : null
    };
  },
  computed : {
    /**
     * Calculates a latlong array from points
     * @returns {Array} latlong array of current shape
     */
    shapeLatLongArray() {
      const latLongArray = [];
      this.activeShapePoints.forEach(element => {
        latLongArray.push(this.latlong(element));
      });
      return latLongArray;
    }
  },
  watch : {
    /**
     * Viewer gets initialised in parent after this child inherits it empty: child must react then
     * @override
     */
    viewer : {
      immediate : true,
      // eslint-disable-next-line require-jsdoc
      handler(val) {
        /* Must be called only when viewer really ready
           If loaded initially, the watcher will execute when parent is ready
           If loaded by user on runtime, immediate option will do the job */
        if (val.cesiumWidget !== undefined) {
          this.viewerReady();
        }
      }
    }
  },
  methods : {
    /**
     * Method
     * Initialise stuff only when viewer ready
     */
    viewerReady() {
      this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
      this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
    },
    /**
     * Start drawing state
     */
    startDrawing() {
      this.addmode = 'draw';
      // eslint-disable-next-line consistent-this
      const vm = this;
      // On left click
      this.handler.setInputAction(event => {
        /* const earthPosition = vm.viewer.scene.terrainProvider._scheme === 'tms'
           ? vm.viewer.scene.pickPosition(event.position)
           : vm.viewer.camera.pickEllipsoid(event.position); */
        const earthPosition = vm.viewer.camera.pickEllipsoid(event.position);
        // `earthPosition` will be undefined if our mouse is not over the globe.
        if (Cesium.defined(earthPosition)) {
          if (vm.activeShapePoints.length === 0) {
            vm.floatingPoint = vm.createPoint(earthPosition);
            vm.activeShapePoints.push(earthPosition);
            const dynamicPositions = new Cesium.CallbackProperty(
              () => new Cesium.PolygonHierarchy(vm.activeShapePoints),
              false
            );
            vm.activeShape = vm.drawShape(dynamicPositions);
          }
          vm.activeShapePoints.push(earthPosition);
          vm.activeShapePointEntities.push(vm.createPoint(earthPosition));
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      // On mouse move
      this.handler.setInputAction(event => {
        if (Cesium.defined(vm.floatingPoint)) {
          const newPosition = vm.viewer.camera.pickEllipsoid(event.endPosition);
          if (Cesium.defined(newPosition)) {
            vm.floatingPoint.position.setValue(newPosition);
            vm.activeShapePoints.pop();
            vm.activeShapePoints.push(newPosition);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      // On right click
      this.handler.setInputAction(() => {
        this.terminateShape();
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      this.state = 'drawing';
    },
    /**
     * Finish drawing state
     */
    pickArea() {
      this.addmode = 'pick';
      // eslint-disable-next-line consistent-this
      const vm = this;
      this.state = 'drawing';
      // On left click
      this.handler.setInputAction(event => {
        const earthPosition = vm.viewer.camera.pickEllipsoid(event.position);
        // `earthPosition` will be undefined if our mouse is not over the globe.
        if (Cesium.defined(earthPosition)) {
          const popLocation =
            Cesium.Ellipsoid.WGS84.cartesianToCartographic(earthPosition);
          nominatimRepository
            .getLocationReverse({
              lat : Cesium.Math.toDegrees(popLocation.latitude),
              lng : Cesium.Math.toDegrees(popLocation.longitude)
            })
            .then(result => {
              vm.addGeoJSONToMap(result.data);
              this.handler.removeInputAction(
                Cesium.ScreenSpaceEventType.LEFT_CLICK
              );
            })
            .catch(error => {
              // eslint-disable-next-line no-console
              console.error(error);
            });
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    /**
     * Add geojson shape to the map
     * @param {geoJson} geoJson shape
     */
    addGeoJSONToMap(geoJson) {
      this.viewer.dataSources.add(this.dataSource);
      this.dataSource.load(geoJson.geojson, {
        stroke       : Cesium.Color.WHITE,
        fill         : Cesium.Color.DARKSLATEGRAY.withAlpha(0.5),
        strokeWidth  : 4.0,
        markerSymbol : '?'
      });
      this.loadedGeoJson = geoJson.geojson.coordinates;
      this.state = 'shapeDone';
    },
    /**
     * Finish drawing state
     */
    finishDrawing() {
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    /**
     * Cancel drawing
     */
    cancelDrawing() {
      this.finishDrawing();
      this.deleteMapShapes();
    },
    /**
     * Delete all shapes and entities done so far
     */
    deleteMapShapes() {
      if (this.camPos.x !== null) {
        this.viewer.camera.flyTo({
          destination : Cesium.Cartesian3.fromDegrees(
            this.camPos.x,
            this.camPos.y,
            this.camPos.z
          ),
          duration : 2.0
        });
      }
      if (this.addmode === 'draw') {
        this.viewer.entities.remove(this.floatingPoint);
        this.viewer.entities.remove(this.activeShape);
        this.activeShapePointEntities.forEach(element => {
          this.viewer.entities.remove(element);
        });
        this.floatingPoint = undefined;
        this.activeShape = undefined;
        this.activeShapePointEntities = [];
        this.activeShapePoints = [];
      }
      else {
        this.viewer.dataSources.remove(this.dataSource);
      }
      this.state = 'initial';
    },
    /**
     * Creates and returns a point
     * @param {Object} worldPosition de
     * @return {Object} point point
     */
    createPoint(worldPosition) {
      const point = this.viewer.entities.add({
        position : worldPosition,
        point    : {
          color           : Cesium.Color.DARKSLATEGRAY,
          outlineColor    : Cesium.Color.WHITE,
          outlineWidth    : 4,
          pixelSize       : 15,
          heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
        }
      });
      return point;
    },
    /**
     * Creates and returns a point
     * @param {Object} positionData de
     * @return {Object} shape shape
     */
    drawShape(positionData) {
      const shape = this.viewer.entities.add({
        polygon : {
          hierarchy : positionData,
          height    : 0,
          material  : new Cesium.ColorMaterialProperty(
            Cesium.Color.DARKSLATEGRAY.withAlpha(0.5)
          ),
          outline      : true,
          outlineColor : Cesium.Color.WHITE,
          outlineWidth : 4.0
        }
      });
      return shape;
    },
    /**
     * Ends shape creation on right click
     */
    terminateShape() {
      this.state = 'shapeDone';
      // Stop drawing mode
      this.finishDrawing();
      // Remove moving point
      this.activeShapePoints.pop();
      this.viewer.entities.remove(this.floatingPoint);
      this.viewer.entities.remove(this.activeShape);
      this.activeShape = this.drawShape(this.activeShapePoints);
    },
    /**
     * Confirms shape for analytics
     */
    confirmShape() {
      // Save current cam position for a user's cancel restore
      const cartographic = this.viewer.camera.positionCartographic;
      this.camPos = {
        x : Cesium.Math.toDegrees(cartographic.longitude),
        y : Cesium.Math.toDegrees(cartographic.latitude),
        z : cartographic.height
      };
      if (this.addmode === 'pick') {
        this.activeShape = this.dataSource;
      }
      this.viewer.flyTo(this.activeShape, {
        duration : 2.0
      });
      /* Change to a new state if needed
         this.state = 'confirmed'; */
    },
    /**
     * Converts to latlong
     * @param {Object} pos position
     * @return {Object} position
     */
    latlong(pos) {
      const carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(pos);
      return {
        lon : Cesium.Math.toDegrees(carto.longitude),
        lat : Cesium.Math.toDegrees(carto.latitude)
      };
    }
  }
};
</script>
<style lang="scss">
// Styling library button
@import '../../../atoms/dl-ui-button/mixins/button';

.draw-tool {
  width: 300px;

  &__container {
    display: flex;
    flex-direction: column;
  }

  &__row {
    &--actions {
      display: flex;
      justify-content: space-evenly;
    }
  }

  &__icon-box {
    padding: 30px 0 20px 0;
  }

  &__icon {
    height: 4rem;
    width: 4rem;
    margin: 5px 0;
  }

  &__info-icon {
    height: 2rem;
    width: 2rem;
    margin: 5px 0;
    fill: $color-action-primary-default;
    transform: translate(5px, 9px);
  }

  &__label-big {
    line-height: normal;
    letter-spacing: normal;
    color: $color-action-tertiary-hover;

    @include font-body-medium-bold();
  }

  &__label-medium {
    text-align: center;

    @include font-body-small-regular();

    &--bold {
      @include font-body-small-bold();
    }
  }

  &__label-small {
    color: $color-action-tertiary-hover;

    @include font-body-small-regular();

    &--gray {
      color: $color-action-tertiary-hover;
    }
  }

  $config: (
    'font-size': 12px,
    'border-radius': 4px,
    'height': 32px,
    'color': $color-base-contrast,
    'hover::color': $color-base-contrast,
    'active::color': $color-base-contrast,
    'background': $color-action-primary-default,
    'hover::background': $color-action-tertiary-default,
    'active::background': $color-action-tertiary-default,
    'border': none,
    'hover::border': none,
    'active::border': none,
    'box-shadow': $shadow-medium
  );

  &__button {
    @include button-style-config($config);

    padding: 0 16px;
    width: auto;

    &:active {
      box-shadow: $shadow-medium;
    }

    &--reddish {
      $color-accent-light: #f36;

      background-color: $color-accent-light;

      &:active,
      &:hover {
        /* stylelint-disable-next-line scss/no-global-function-names */
        background-color: transparentize($color-accent-light, 0.25);
      }
    }
  }
}
</style>
