<template>
  <!-- Leaflet layer tool -->
  <div class="dl-ui-leaflet-latlngtool">
    Lat {{ lat }} Lng {{ lng }}
  </div>
</template>

<script>
/* istanbul ignore file  */
export default {
  name  : 'DlLeafletWcLatLng',
  props : {
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
      lat : 0,
      lng : 0
    };
  },
  watch : {
    /**
     * Soon as map is ready, start process
     */
    map() {
      this.init();
    }
  },
  // eslint-disable-next-line require-jsdoc
  mounted() {
    this.map && this.init();
  },
  methods : {
    /**
     * Initialization unifier
     */
    init() {
      this.lat = this.map.options.center[0];
      this.lng = this.map.options.center[1];
      this.map.addEventListener('mousemove', ev => {
        this.lat = ev.latlng.lat.toFixed(4);
        this.lng = ev.latlng.lng.toFixed(4);
      });
    }
  }
};
</script>

<style lang="scss">
.dl-ui-leaflet-latlngtool {
  color: $color-base-02;
  line-height: 1.1;
  border-radius: 3px;
  padding: 2px 5px 1px;
  background: rgba(255, 255, 255, 0.5);

  @include font-body-small-regular();
}
</style>
