<template>
  <!-- Leaflet layer tool -->
  <div v-if="layers && langAvailable"
       class="dl-ui-leaflet-layertool"
  >
    <!-- Checkbox: Trigger -->
    <input
      id="dl-ui-leaflet-layertool-open"
      type="checkbox"
      href="#"
      class="dl-ui-leaflet-layertool-open"
      name="dl-ui-leaflet-layertool-open"
    />

    <!-- Label (Triggered by checkbox) -->
    <label
      class="dl-ui-leaflet-layertool-open-button"
      for="dl-ui-leaflet-layertool-open"
      :class="{ 'isOpen': menuIsOpen }"
      @click="toggleLayersMenu"
    >
      <!-- Layer icon -->
      <span class="layer-icon">
        <dl-ui-icon id="dl-leaflet-layers"
                    class="dl-ui-icon dl-ui-icon--large"
        />
      </span>

      <!-- Close icon -->
      <span class="close-icon">&#10005;</span>
    </label>

    <!-- List -->
    <div class="dl-ui-leaflet-layertool__list">
      <!-- ##### Level 0 #### -->
      <div class="dl-ui-leaflet-layertool__header">
        <dl-ui-checkbox
          v-if="layers.selectAllCheckbox"
          class="dl-leaflet-checkbox"
          :modelValue="layers.visible"
          :indeterminate="layers.ind"
          @update:modelValue="toggleSelectAll($event, layers)"
        />
        <span class="dl-ui-leaflet-layertool__item-name">{{ $t(layers.label) }}</span>
      </div>

      <!-- Scroll area -->
      <div ref="layerToolScroll"
           class="dl-ui-leaflet-layertool__scroll dl-ui-scrollbar"
      >
        <!-- ##### Level 1 #### -->
        <div v-for="(level1item, index1) in layers.children" :key="index1" class="dl-ui-leaflet-layertool__child">
          <div v-if="level1item.children"
               class="dl-ui-leaflet-layertool__group"
          >
            <div class="dl-ui-leaflet-layertool__group-name">
              <dl-ui-checkbox
                v-if="level1item.selectAllCheckbox"
                class="dl-leaflet-checkbox"
                :modelValue="level1item.visible"
                :indeterminate="level1item.ind"
                @update:modelValue="toggleSelectAll($event, level1item)"
              />
              <span class="dl-ui-leaflet-layertool__item-name"
                    :title="$t(level1item.title)"
                    @click="level1item.collapsed = !level1item.collapsed"
              >
                <i v-if="level1item.color" class="dl-ui-leaflet-layertool__item-circle" :style="'color: #' + level1item.color" />
                <i class="dl-ui-leaflet-layertool__item-arrow"
                   :class="{ 'dl-ui-leaflet-layertool__item-arrow--collapsed': level1item.collapsed }"
                />
                <span>{{ $t(level1item.label) }}</span>
              </span>
            </div>

            <!-- ##### Level 2 #### -->
            <div class="dl-ui-leaflet-layertool__group-content"
                 :class="{ 'dl-ui-leaflet-layertool__group-content--collapsed': level1item.collapsed }"
            >
              <div v-for="(level2item, index2) in level1item.children" :key="index2" class="dl-ui-leaflet-layertool__child">
                <div v-if="level2item.children" class="dl-ui-leaflet-layertool__group">
                  <div class="dl-ui-leaflet-layertool__group-name">
                    <dl-ui-checkbox
                      v-if="level2item.selectAllCheckbox"
                      class="dl-leaflet-checkbox"
                      :modelValue="level2item.visible"
                      :indeterminate="level2item.ind"
                      @update:modelValue="toggleSelectAll($event, level2item)"
                    />
                    <span class="dl-ui-leaflet-layertool__item-name"
                          :title="$t(level2item.title)"
                          @click="level2item.collapsed = !level2item.collapsed"
                    >
                      <i v-if="level2item.color"
                         class="dl-ui-leaflet-layertool__item-circle"
                         :style="'color: #' + level2item.color"
                      />
                      <i class="dl-ui-leaflet-layertool__item-arrow"
                         :class="{ 'dl-ui-leaflet-layertool__item-arrow--collapsed': level2item.collapsed }"
                      />
                      <span>{{ $t(level2item.label) }}</span>
                    </span>
                  </div>

                  <!-- ##### Level 3 #### -->
                  <div class="dl-ui-leaflet-layertool__group-content"
                       :class="{ 'dl-ui-leaflet-layertool__group-content--collapsed': level2item.collapsed }"
                  >
                    <div
                      v-for="(level3item, index3) in level2item.children"
                      :key="index3"
                      class="dl-ui-leaflet-layertool__child"
                    >
                      <div class="dl-ui-leaflet-layertool__item">
                        <dl-ui-checkbox
                          :modelValue="level3item.visible"
                          class="dl-leaflet-checkbox"
                          @update:modelValue="switchLayer(level3item)"
                        />
                        <span :title="$t(level3item.title)"
                              class="dl-ui-leaflet-layertool__item-name"
                              @click="switchLayer(level3item)"
                        >
                          <i
                            v-if="level3item.color"
                            class="dl-ui-leaflet-layertool__item-circle"
                            :style="'color: #' + level3item.color"
                          />
                          {{ $t(level3item.label) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="dl-ui-leaflet-layertool__item">
                  <dl-ui-checkbox
                    class="dl-leaflet-checkbox"
                    :modelValue="level2item.visible"
                    @update:modelValue="switchLayer(level2item)"
                  />
                  <span :title="$t(level2item.title)"
                        class="dl-ui-leaflet-layertool__item-name"
                        @click="switchLayer(level2item)"
                  >
                    <i
                      v-if="level2item.color"
                      class="dl-ui-leaflet-layertool__item-circle"
                      :style="'color: #' + level2item.color"
                    />
                    {{ $t(level2item.label) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-else
               class="dl-ui-leaflet-layertool__item"
          >
            <dl-ui-checkbox
              class="dl-leaflet-checkbox"
              :modelValue="level1item.visible"
              @update:modelValue="switchLayer(level1item)"
            />
            <span :title="$t(level1item.title)"
                  class="dl-ui-leaflet-layertool__item-name"
                  @click="switchLayer(level1item)"
            >
              <i
                v-if="level1item.color"
                class="dl-ui-leaflet-layertool__item-circle"
                :style="'color: #' + level1item.color"
              />
              {{ $t(level1item.label) }}
            </span>
          </div>
        </div>
      </div><!-- end Scroll area -->
    </div>
  </div>
</template>

<script>
/* istanbul ignore file  */
import * as L from 'leaflet';
import service from '../js/extService';
import DlUiIcon from '../../../atoms/dl-ui-icon';
import DlUiCheckbox from '../../../atoms/dl-ui-checkbox';

export default {
  name       : 'DlLeafletWcLayers',
  components : {
    DlUiIcon,
    DlUiCheckbox
  },
  props : {
    /**
     * wfs flag
     */
    wfs : {
      type    : Boolean,
      default : false
    },
    /**
     * custom layers
     */
    layers : {
      type    : Object,
      default : () => null
    },
    /**
     * parent's leaflet map object
     */
    map : {
      type    : Object,
      default : () => null
    }
  },
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      menuIsOpen           : false,
      customLayersChildren : [],
      layersLoaded         : [],
      totalActivated       : 0
    };
  },
  computed : {
    /**
     * Only display this compo if language translations are available
     * @returns {Bool} true if main entry available
     */
    langAvailable() {
      return this.$i18n.messages[this.$i18n.locale].layerControl &&
             this.$i18n.messages[this.$i18n.locale].layerControl.main !== undefined;
    }
  },
  watch : {
    /**
     * Soon as map is ready, start process
     */
    map() {
      this.init();
    },
    /**
     * If layers change, start again (WC mode!)
     */
    layers() {
      // WC mode triggers this in ffox before, having no map yet!
      this.map && this.init();
    }
  },
  // eslint-disable-next-line require-jsdoc
  unmounted() {
    window.removeEventListener('resize', this.resizeList);
  },
  methods : {
    /**
     * Initialization unifier
     */
    init() {
      this.recalculateParentStates();
      this.processCustomLayers();
      window.addEventListener('resize', this.resizeList);
      // This is needed for WC to wait for dom before resizing the list on layers watch
      this.$nextTick(() => {
        this.resizeList();
      });
    },
    /**
     * Adjust height of list, due to css absolute position impossibility
     */
    resizeList() {
      const mapHeight = this.$parent.$refs.mapContainer.clientHeight;
      if (this.$refs.layerToolScroll) {
        this.$refs.layerToolScroll.style.maxHeight = `${mapHeight - 225}px`;
      }
    },
    /**
     * Generate custom layers
     */
    processCustomLayers() {
      if (this.layers) {
        if (this.layers.label && this.layers.children && this.layers.children.length) {
          this.$parent.progressBarStepValue = 1;
          this.customLayersChildren = [];
          this.removeAllLayers();
          this.layersLoaded = [];
          /* this.map.eachLayer(function (layer) {
              if (!(layer instanceof L.TileLayer) -- not the tiles!
             this.map.removeLayer(layer);
             }); */

          this.extractFinalChildren(this.layers.children);
          // Update main compo maxStep value adding the visible layers:
          this.$parent.progressBarMaxStep += this.customLayersChildren.filter(layer => layer.visible).length;
          (this.wfs ? this.loadLayersWFS() : this.loadLayersWMS())
            .then(() => {
              this.$parent.updateProgress();
            })
            .catch(error => {
              this.$parent.triggerSnack('error', error);
              // eslint-disable-next-line no-console
              console.error(error);
            });
        }
        else {
          this.$parent.triggerSnack('error', this.$t('layerControl.wrongmodel'));
        }
      }
      else {
        // Only complete progress process:
        this.$parent.updateProgress();
      }
    },
    /**
     * Parse customLayers and extract all last children nodes (tree last level children)
     * @param {Object} node actual node
     */
    extractFinalChildren(node) {
      for (let i = 0; i < node.length; i++) {
        if (node[i].children) {
          this.extractFinalChildren(node[i].children);
        }
        else {
          this.customLayersChildren.push(node[i]);
        }
      }
    },
    /**
     * Returns all layers
     * @param {Bool} external if external layers or internal
     * @returns {Array} layers
     */
    getAllLayers(external) {
      if (external) {
        return this.layersLoaded;
      }
      else {
        const layers = [];
        this.map.eachLayer(layer => {
          if (!(layer instanceof L.TileLayer)) { // and not instance of wms ?
            layers.push(layer);
          }
        });
        return layers;
      }
    },
    /**
     * Raster layers creation by layer config
     * @returns {Promise} Promise of execution
     */
    loadLayersWMS() {
      return new Promise((resolve, reject) => {
        try {
          this.customLayersChildren.forEach(layer => {
            this.addWMSLayer(layer);
          });
          resolve();
        }
        catch (error) {
          reject(error);
        }
      });
    },
    /**
     * Create a WMSLayer
     * @param {Object} layer layer
     * @returns {Object | String} layer added, or error
     */
    addWMSLayer(layer) {
      if (layer === undefined) {
        throw new Error('No layer supplied');
      }
      return new Promise((resolve, reject) => {
        const layerNamespace = layer.namespace ? `${layer.namespace}:` : '';
        const options = {
          tiled       : false,
          transparent : layer.transparent !== false,
          format      : layer.format || 'image/png',
          styles      : layer.style || '',
          layers      : `${layerNamespace}${layer.serverId}`
        };
        if (layer.filter) {
        // eslint-disable-next-line camelcase
          options.cql_filter = layer.filter;
        }
        try {
          const addedLayer = L.tileLayer.wms(layer.serverUrl, options);
          /* istanbul ignore else  */
          if (addedLayer) {
            layer.layer = addedLayer;
            addedLayer.on('load', event => {
              this.map.fireEvent('dataload', event);
              this.$parent.updateProgress();
            });
            if (layer.visible) {
              this.map.addLayer(addedLayer);
              this.layersLoaded.push(layer);
            }
            resolve(addedLayer);
          }
        }
        catch (error) {
          reject(error);
        }
      });
    },
    /**
     * Vectorial layers creation
     * @returns {Promise} Promise of execution
     */
    loadLayersWFS() {
    // Promises array to wait until all are executed
      const promises = [];
      this.customLayersChildren.forEach(layer => {
        promises.push(
          this.addWFSLayer(layer)
            .then(() => layer));
      });
      /* wait until all layers are ready to avoid control errors assign */
      return Promise.all(promises);
    },
    /**
     * Request to Geoserver for layer info and create a WFSLayer
     * @param {Object} layer layer
     * @returns {Promise} Promise of execution with layer inside
     */
    addWFSLayer(layer) {
      if (layer === undefined) {
        throw new Error('No layer supplied');
      }
      return new Promise((resolve, reject) => {
        const layerNamespace = layer.namespace ? `${layer.namespace}:` : '';
        const queryParams = {
          service      : 'WFS',
          version      : '2.0.0',
          request      : 'GetFeature',
          typename     : `${layerNamespace}${layer.serverId}`,
          maxFeatures  : 10,
          outputFormat : 'application/json',
          srsName      : 'EPSG:4326'
        };

        service.getRequest(layer.serverUrl, queryParams)
          .then(data => {
            const geoJson = L.geoJson(data, { style : layer.colorVect });
            layer.layer = geoJson;
            geoJson.on('load', event => {
              this.map.fireEvent('dataload', event);
              this.$parent.updateProgress();
            });
            if (layer.visible) {
              this.map.addLayer(geoJson);
              this.layersLoaded.push(layer);
            }
            // return layer loaded
            resolve(geoJson);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     * Remove layer with server id from map, not object
     * @param {String} serverId layer id
     * @param {String} filter layer filter: optional, sometimes we use same serverid with filters
     * @return {String} ok or error
     */
    removeLayer(serverId, filter) {
      const layerToRemove = this.layersLoaded.find(layer => {
        if (filter === undefined) {
          return layer.serverId === serverId;
        }
        else {
          return layer.serverId === serverId && layer.filter === filter;
        }
      });
      if (!layerToRemove) {
        return 'Layer not found';
      }
      this.map.removeLayer(layerToRemove.layer);
      layerToRemove.visible = false;
      const index = this.layersLoaded.indexOf(layerToRemove);
      this.layersLoaded.splice(index, 1);
      this.recalculateParentStates();
      return 'ok';
    },
    /**
     * Remove all custom layers from map, not object
     */
    removeAllLayers() {
      this.layersLoaded.forEach(loadedLayer => {
        this.map.removeLayer(loadedLayer.layer);
        loadedLayer.visible = false;
      });
      this.layersLoaded = [];
      this.recalculateParentStates();
    },
    /**
     * Manual layer switching
     * @param {Object} layer layer
     * @param {Bool} what yesorno
     */
    switchLayer(layer, what) {
      // const checkbox = event.target; if checkbox.checked If native checkbox used
      // eslint-disable-next-line no-negated-condition
      const activate = what !== undefined ? what : !layer.visible;
      if (activate) {
        !layer.visible && (this.totalActivated += 1);
        this.map.addLayer(layer.layer);
        // Ad only if not there yet!
        if (this.layersLoaded.indexOf(layer) === -1) {
          this.layersLoaded.push(layer);
        }
      }
      else {
        this.map.removeLayer(layer.layer);
        const index = this.layersLoaded.indexOf(layer);
        this.layersLoaded.splice(index, 1);
      }
      layer.visible = activate;
      // Avoid extra calls to recalc
      what === undefined && this.recalculateParentStates();
    },
    /**
     * Switch group content and activates progress bar
     * @param {Bool} show show
     * @param {Object} parent parent
     */
    toggleSelectAll(show, parent) {
      this.totalActivated = 0;
      this.toggleGroup(show, parent);
      if (show) {
        this.$parent.progressBarMaxStep = this.totalActivated;
        this.$parent.progressBarStepValue = -1;
        this.$parent.updateProgress();
      }
      else {
        this.$parent.progressBarMaxStep = 1;
        this.$parent.progressBarStepValue = 0;
        this.$parent.updateProgress();
      }
      this.recalculateParentStates();
    },
    /**
     * Switch group content
     * @param {Bool} show show
     * @param {Object} parent parent
     */
    toggleGroup(show, parent) {
      parent.visible = show;
      parent.children.forEach(child => {
        if (child.children) {
          this.toggleGroup(show, child);
        }
        else {
          this.switchLayer(child, show);
        }
      });
    },
    /**
     * Calculates state for a parent depending on children
     * @param {Object} parent parent
     * @returns {Bool} if current node is checked
     */
    recalculateParentStates(parent) {
      let selectedAll = true;
      let selectedNone = true;
      const node = parent || this.layers;
      if (node) {
        if (node.children) {
          node.children.forEach(child => {
          // May need to pass extra param to keep track of parents state
            if (child.children && this.recalculateParentStates(child)) {
              selectedNone = false;
            }
            else if (child.visible) {
              selectedNone = false;
            }
            else {
              selectedAll = false;
            }
          });
        }
        if (selectedAll) {
          node.ind = false;
          node.visible = true;
        }
        else if (selectedNone) {
          node.ind = false;
          node.visible = false;
        }
        else {
          node.ind = true;
          node.visible = false;
        }
        return node.visible;
      }
      return false;
    },
    /**
     * Toggle layers menu
     */
    toggleLayersMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    }
  }
};
</script>

<style lang="scss">
@import '../../../atoms/dl-ui-checkbox/mixins/checkbox';
@import '../mixins/leaflet-map';

// Checkbox config
$config-checkbox: (
  'size': 14px
);

// Apply Checkbox config
.dl-leaflet-checkbox {
  @include checkbox-style-config($config-checkbox);

  margin-right: 4px;

  > svg {
    height: 65%;
    width: 65%;
    margin: auto;
  }

  &--active {
    > svg {
      height: 65%;
      width: 65%;
      margin: auto;
      fill: $color-action-primary-focus;
    }
  }

  > [indeterminate] {
    + svg {
      height: 14px;
      width: 14px;
      margin: auto;
      fill: $color-action-primary-focus;
    }
  }
}

// Layers menu
.dl-ui-leaflet-layertool {
  box-sizing: border-box;
  text-align: right;
  pointer-events: all;

  @include font-body-large-regular();

  // Checkbox: Trigger open/close
  &-open {
    display: none;
  }

  // Checkbox Label
  &-open-button {
    @extend %buttonShape;

    z-index: 2;
    overflow: hidden;
    color: $color-action-primary-default;
    background: $color-surface-01k;
    border: 2px solid $color-base-02;
    box-shadow: $lmap-componentBoxShadow;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-duration: 400ms;
    cursor: pointer;
    box-sizing: content-box;

    // Span: Layer icon
    .layer-icon {
      z-index: 2;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;

      .dl-ui-icon {
        vertical-align: middle;
      }
    }

    // Span: Close icon
    .close-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }

    // State: Layers Open
    &.isOpen {
      .layer-icon {
        visibility: hidden;
      }
    }
  }

  &-open:checked + &-open-button {
    transition-timing-function: linear;
    transition-duration: 200ms;

    // Close icon
    .close-icon {
      opacity: 1;
      transition: opacity;
      transition-duration: 200ms;
    }
  }

  &__list {
    display: none;
    position: absolute;
    right: 0;
    box-sizing: border-box;
    width: 232px; //TODO: Temp style, to be finalised later (same width as tools parent div)
    margin-top: 64px; // height of basemap button (54px) + 10px spacing between tools
    border-radius: 5px;
    border: 2px solid $color-base-02;
    background-color: $color-surface-01k;
    box-shadow: $lmap-componentBoxShadow;
    transition-duration: 180ms;

    @include font-body-small-regular();
  }

  &__header {
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: $color-emphasis-02;

    .dl-leaflet-checkbox {
      margin-right: 6px;
    }
  }

  &__scroll {
    overflow-y: scroll;
  }

  &__child {
    padding: 14px 16px;
  }

  &__item {
    display: flex;
    align-items: center;

    &-name {
      cursor: pointer;
    }

    &-arrow {
      color: #686868;
      margin-right: 4px;
      margin-left: 2px;

      &::before {
        content: '\25bc';
        display: inline-block;
        transition: transform 0.2s linear;
      }

      &--collapsed {
        &::before {
          transform: rotate(-90deg);
          transition: transform 0.2s linear;
        }
      }
    }

    &-circle {
      margin-left: 2px;
      margin-right: 2px;

      &::before {
        content: '\25CF';
      }
    }
  }

  &__group {
    &-name {
      display: flex;
      align-items: center;
    }

    &-content {
      max-height: 500px;
      opacity: 1;
      transition: all 0.2s linear;

      .dl-ui-leaflet-layertool__child {
        padding: 10px 0 10px 20px;

        &:first-child {
          padding: 14px 0 10px 20px;
        }
      }

      &--collapsed {
        max-height: 0;
        opacity: 0;
        transition: all 0.2s linear;
        overflow: hidden;
      }
    }
  }

  // Menu open > List
  &-open:checked ~ &__list {
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    transition-duration: 90ms;
    transform: translate3d(0, 5px, 0);
    display: block;
  }
}
</style>
