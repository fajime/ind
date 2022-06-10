<template>
  <div v-if="baseMapOptions.length > 1"
       class="dl-ui-leaflet-basemaptool"
  >
    <nav class="base-map">
      <!-- Checkbox: Trigger -->
      <input
        id="base-map-open"
        type="checkbox"
        href="#"
        class="base-map-open"
        name="base-map-open"
      />

      <!-- Label: Trigger -->
      <label
        class="base-map-open-button"
        for="base-map-open"
        :class="{ 'isOpen': menuIsOpen }"
        @click="toggleBaseMapMenu"
      >
        <span class="base-map-gradient" />
        <img
          class="base-map-image"
          :src="currentBaseMap.b64img"
          :alt="currentBaseMap.name"
          :title="currentBaseMap.name"
        />
        <span class="close-icon">&#10005;</span>
        <span class="base-map-optionText">{{ $t(currentBaseMap.label) }}</span>
      </label>

      <!-- Base map -->
      <div
        v-for="(option, index) in baseMapOptions"
        :key="index"
        class="base-map__mode"
        :class="{'base-map__mode--current': option === currentBaseMap}"
        @click="changeBaseMap(option)"
      >
        <span class="base-map-gradient" />
        <img
          class="base-map-image"
          :src="option.b64img"
          :alt="option.name"
          :title="option.name"
        />
        <span class="base-map-optionText">{{ $t(option.label) }}</span>
      </div>
    </nav>
  </div>
</template>
<script>
/* istanbul ignore file  */
import * as L from 'leaflet';
export default {
  name  : 'DlLeafletWcBasemap',
  props : {
    /**
     * basemap layers
     */
    baseMapOptions : {
      type    : Array,
      default : () => []
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
      currentBaseMap : this.baseMapOptions.find(layer => layer.default),
      menuIsOpen     : false
    };
  },
  watch : {
    /**
     * Soon as map is ready, load default layer
     */
    map() {
      this.loadLayer();
    },
    /**
     * If base layers change, load new default (WC mode!)
     * @param {Array} val newval
     */
    baseMapOptions(val) {
      // WC mode triggers this in ffox before, having no map yet!
      this.map && this.changeBaseMap(val.find(layer => layer.default));
    }
  },
  methods : {
    /**
     * Loads default map
     * @param {Object} layer new ll tile
     */
    loadLayer() {
      this.currentBaseMap.layer = L.tileLayer(this.currentBaseMap.url, this.currentBaseMap.options);
      this.currentBaseMap.layer.once('load', () => {
        this.$parent.updateProgress();
      });
      this.map.addLayer(this.currentBaseMap.layer);
      this.currentBaseMap.layer.bringToBack();
    },
    /**
     * Changes basemap
     * @param {String} newBasemap basemap
     */
    changeBaseMap(newBasemap) {
      if (this.currentBaseMap !== newBasemap) {
        // Remove always previous tile for performance
        if (this.currentBaseMap.layer) {
          this.map.removeLayer(this.currentBaseMap.layer);
        }
        this.currentBaseMap = newBasemap;
        this.loadLayer();
      }
    },
    /**
     * Toggle basemap trigger
     */
    toggleBaseMapMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    }
  }
};
</script>

<style lang="scss">
@import '../mixins/leaflet-map';

// Base map button config
$menu-items: 6; // !Important: This is the actual limit of items, nothing beyond 6 will appear

.base-map {
  pointer-events: all;

  @include font-body-large-regular();

  // Checkbox is hidden
  &-open {
    display: none;
  }

  // Menu items > Maps
  &-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &-gradient {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $basemapGradient;
  }

  &-optionText {
    @extend %baseMapSmallText;

    top: 25%;
    z-index: 2;
  }

  &__mode,
  &-open-button {
    @extend %buttonShape;

    box-sizing: content-box;
    cursor: pointer;
  }

  // Checkbox Label
  &-open-button {
    z-index: 2;
    border: 2px solid $color-surface-05;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-duration: 400ms;
    box-shadow: $lmap-componentBoxShadow;

    // Close icon
    .close-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }

    // State: Open
    &.isOpen {
      .base-map-image,
      .base-map-optionText {
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

  // Menu open > items
  &-open:checked ~ &__mode {
    box-shadow: $lmap-componentBoxShadow;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);

    &--current {
      border-color: $color-action-primary-active;
    }

    @for $i from 1 through $menu-items {
      &:nth-child(#{$i + 2}) {
        transition-duration: 90ms + (100ms * $i);
        transform: translate3d(-65px * $i, 0, 0);
      }
    }
  }
}
</style>
