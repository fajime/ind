<template>
  <div class="corner_content">
    <div class="layer-tool">
      <table class="layer-tool__list">
        <tbody v-for="(layer, index) in domLayers" :key="index">
          <tr class="layer-tool__row"
              :class="{ 'layer-tool__row--up': upLayer === layer, 'layer-tool__row--down': downLayer === layer, }"
          >
            <td class="layer-tool__field">
              <dl-ui-switch v-model="layer.show" class="dl-ui-switch" />
            </td>
            <td class="layer-tool__field">
              <span class="layer-tool__text"
                    @click="layer.show = !layer.show"
                    v-text="layer.name"
              />
            </td>
            <td class="layer-tool__field">
              <dl-ui-range v-model="layer.alpha"
                           class="dl-ui-range"
                           min="0"
                           max="1"
                           step="0.01"
              />
            </td>
            <td class="layer-tool__field">
              <dl-ui-button v-if="canRaise(index)" class="cesium-button layer-tool__button" @clicked="raise(layer, index)">
                ▲
              </dl-ui-button>
            </td>
            <td class="layer-tool__field">
              <dl-ui-button v-if="canLower(index)" class="cesium-button layer-tool__button" @clicked="lower(layer, index)">
                ▼
              </dl-ui-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
/* istanbul ignore file */
import DlUiRange from '../../../atoms/dl-ui-range';
import DlUiSwitch from '../../../atoms/dl-ui-switch';
import DlUiButton from '../../../atoms/dl-ui-button';

export default {
  name       : 'LayerTool',
  components : {
    'dl-ui-range'  : DlUiRange,
    'dl-ui-switch' : DlUiSwitch,
    'dl-ui-button' : DlUiButton
  },
  props : {
    /**
     * viewer object
     */
    viewer : {
      type    : Object,
      default : () => {}
    },
    /**
     * List of layers
     */
    layers : {
      type    : Array,
      default : () => []
    }
  },
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      upLayer       : null,
      downLayer     : null,
      imageryLayers : null,
      domLayers     : null
    };
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
           If loaded initially, the watcher will execute when viewer in parent is ready, ok
           If loaded by user on runtime, immediate option will do the job */
        if (val.imageryLayers !== undefined) {
          // First add a name to base Layer and keep it for layers watcher:
          this.viewer.imageryLayers.get(0).name = 'Base image layer';
          this.viewerReady();
        }
      }
    },
    /**
     * Watcher
     * @override
     */
    layers : {
      immediate : false,
      // eslint-disable-next-line require-jsdoc
      handler() {
        // Restart layer loading when layers prop change
        this.viewerReady();
      }
    }
  },
  methods : {
    /**
     * Method
     * Initialise stuff only when viewer ready
     */
    viewerReady() {
      this.imageryLayers = this.viewer.imageryLayers;
      // Recreate layers in another array so we don't interfere with watcher (infinite loop)
      this.domLayers = this.layers;
      this.setupLayers();
      this.updateDomLayerList();
    },
    /**
     * Moves a layer up
     * @param {Object} layer layer
     * @param {Number} index index
     */
    raise(layer, index) {
      this.imageryLayers.raise(layer);
      this.upLayer = layer;
      this.downLayer = this.layers[Math.max(0, index - 1)];
      this.updateDomLayerList();
      setTimeout(() => {
        this.upLayer = this.downLayer = null;
      }, 10);
    },
    /**
     * Moves a layer down
     * @param {Object} layer layer
     * @param {Number} index index
     */
    lower(layer, index) {
      this.imageryLayers.lower(layer);
      this.upLayer = this.layers[Math.min(this.layers.length - 1, index + 1)];
      this.downLayer = layer;
      this.updateDomLayerList();
      setTimeout(() => {
        this.upLayer = this.downLayer = null;
      }, 10);
    },
    /**
     * Returns is layer can go up
     * @param {Number} layerIndex layer
     * @return {Boolean} true if so
     */
    canRaise(layerIndex) {
      return layerIndex > 0;
    },
    /**
     * Returns is layer can go down
     * @param {Number} layerIndex layer
     * @return {Boolean} true if so
     */
    canLower(layerIndex) {
      return this.imageryLayers
        ? layerIndex >= 0 && layerIndex < this.imageryLayers.length - 1
        : false;
    },
    /**
     * Introduces inherited layers dinamically
     */
    setupLayers() {
      // first remove user layers, leaving only the basemap
      const layersToRemove = [];
      this.imageryLayers._layers.forEach(layer => {
        if (layer.name !== 'Base image layer') {
          layersToRemove.push(layer);
        }
      });
      layersToRemove.forEach(layer => {
        this.imageryLayers.remove(layer);
      });
      this.domLayers.forEach(layer => {
        if (layer.imageryProvider === undefined) {
          // eslint-disable-next-line no-console
          console.warn(
            `User provided layers must specify field 'imageryProvider'.`
          );
          return;
        }
        const _layer = this.imageryLayers.addImageryProvider(
          layer.imageryProvider
        );
        _layer.name = layer.name || 'unnamed';
        _layer.alpha = layer.alpha || 0.5;
        _layer.show = !!layer.show;
      });
    },
    /**
     * Updates dom layer list with imageryLayers data so it is reflected in DOM
     */
    updateDomLayerList() {
      const numLayers = this.imageryLayers.length;
      this.domLayers = [];
      for (let i = numLayers - 1; i >= 0; --i) {
        this.domLayers.push(this.imageryLayers.get(i));
      }
    },
    /**
     * Listener for event switched
     * @param {Boolean} value Show or not
     * @param {Number} index Index of layer
     */
    switchedEventListener(value, index) {
      this.domLayers[index].show = value;
    }
  }
};
</script>
<style lang="scss">
.layer-tool {
  width: 300px;

  @include font-body-medium-regular();

  &__list {
    width: 100%;
  }

  &__row {
    transform: translateY(0);
    transition: transform 0.4s ease-out;

    &--up {
      transform: translateY(33px);
      transition: none;
    }

    &--down {
      transform: translateY(-33px);
      transition: none;
    }
  }

  &__field {
    padding: 2px 3px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 105px;

    &:nth-child(3) {
      max-width: 70px;
    }
  }

  &__text {
    cursor: pointer;
  }

  &__button {
    width: 30px;
    margin: 0 !important;
    display: flex !important;
    justify-content: center;

    &:hover {
      box-shadow: none !important;
    }

    &:focus {
      border-color: $color-base-02 !important;
    }
  }
}
</style>
