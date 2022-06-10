<template>
  <dl-hl-grid-item :title="title"
                   id="dl-hl-map-2d"
                   icon="map"
                   :layoutConfig="layoutConfig"
                   @action="gridItemAction($event)"
  >
    <div class="dl-hl-map-2d-iframe">
      <transition name="fade">
        <div class="dl-hl-map-2d-iframe__blurLayer" v-if="showBlur" />
      </transition>
      <iframe class="dl-hl-map-2d-iframe__iframe"
              :src="`${iframeUrl}&nocache=${this.randomId}`"
              name="dl-hl-map-2d"
              seamless
              loading="lazy"
              ref="iframe"
      >
        <p>Your browser does not support iframes.</p></iframe>
    </div>
  </dl-hl-grid-item>
</template>
<script>
import GridItemMixin from '../../../mixins/gridItem';
import ResponsiveComponentMixin from '../../../mixins/responsiveComponent';
import mixinId from '@indra-dl/dl-fmwk-vue-comp-kit/src/mixins/randomId';

export default {
  name   : 'DlHlMap2dIframe',
  mixins : [GridItemMixin, ResponsiveComponentMixin, mixinId],
  /**
   * Override
   * @override
   */
  data() {
    return {
      showBlur        : false,
      timeoutShowBlur : undefined,
      iframeUrl       : process.env.VUE_APP_MAP_2D_PHYSIC_URL.replace('%connectionId%', this.$store.getters.getConnectionId)
    };
  },
  computed : {
    /**
     * title of compo
     * @return {String} title of this component
     */
    title() {
      return this.$t('map2D.title');
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    window.addEventListener('message', this.onMapLoaded, false);
    this.callbackResize = () => {
      this.showBlur = true;
      if (this.timeoutShowBlur) {
        clearTimeout(this.timeoutShowBlur);
      }
      this.timeoutShowBlur = setTimeout(() => {
        this.showBlur = false;
      }, 200);
    };
  },
  /**
   * Override
   * @override
   */
  beforeDestroy() {
    window.removeEventListener('message', this.onMapLoaded, false);
  },
  methods : {
    /**
     * on map loaded
     * @param {Object }event Event recived
     */
    onMapLoaded(event) {
      if (event.data.type === 'map2D-loaded') {
        // asd
      }
    }
  }
};
</script>

<style lang="scss">
.dl-hl-map-2d-iframe {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;

  &__blurLayer {
    position: absolute;
    height: 100%;
    width: 100%;
    background: #2c405a63;
  }

  &__iframe {
    height: 100%;
    width: 100%;
  }
}

</style>
