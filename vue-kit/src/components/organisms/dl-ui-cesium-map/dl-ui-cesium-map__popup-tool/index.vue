<template>
  <div class="popup-tool">
    <div
      id="popupContainer"
      ref="popupContainer"
      class="popup-tool__container"
      :class="{ 'popup-tool__container--disabled': !config.visible }"
      :style="positionCss"
    >
      <div class="popup-tool__wrapper">
        <div ref="popupContent" class="popup-tool__content">
          <slot />
        </div>
      </div>
      <div class="popup-tool__tip-container">
        <div class="popup-tip" />
      </div>
    </div>
  </div>
</template>
<script>
/* istanbul ignore file */
const Cesium = require('cesium/Source/Cesium');
export default {
  name  : 'MapPopupTool',
  props : {
    /**
     *  Prop config: values to set the popup
      */
    config : {
      type    : Object,
      default : () => ({
        visible : false,
        x       : 0,
        y       : 0
      })
    }
  },
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      observer : null,
      newPos   : {
        x : 200,
        y : 200
      }
    };
  },
  computed : {
    /**
     * Map's viewer object
     * @returns {Object} store's viewer
     */
    viewer() {
      return this.$store.getters.viewer;
    },
    /**
     * Generates a css value for the top property
     * @return {String} top css prop
     */
    top() {
      return `${this.config.y - 18}px`;
    },
    /**
     * Generates a css value for the left property
     * @return {String} left css prop
     */
    left() {
      return `${this.config.x + 15}px`;
    },
    /**
     * Generates css content from the previous two
     * @return {String} css
     */
    positionCss() {
      return {
        '--left' : this.left,
        '--top'  : this.top
      };
    }
  },
  watch : {
    /**
     * Viewer gets initialised in parent after this child inherits it empty: child must react then
     * @override
     */
    viewer : {
      // eslint-disable-next-line require-jsdoc
      handler(val) {
        if (val !== null) {
          this.viewerReady();
        }
      }
    }
  },
  // eslint-disable-next-line require-jsdoc
  mounted() {
    this.init();
  },
  // eslint-disable-next-line require-jsdoc
  beforeUnmount() {
    // Clean up
    this.observer.disconnect();
  },
  methods : {
    /**
     * Method
     * Initialise stuff
     */
    init() {
      if (this.config.visible) {
        this.setVisible();
      }

      // Create the slot observer (and what to do on changes...)
      this.observer = new MutationObserver(() => {
        this.setVisible();
      });

      // Setup the observer
      this.observer.observe(this.$refs.popupContent, {
        attributes    : true,
        childList     : true,
        characterData : true,
        subtree       : true
      });

      // Do stuff when transition ends
      this.$refs.popupContainer.addEventListener(
        'transitionend',
        this.transitionendCallBack
      );
    },
    /**
     * Do viewer related inits
     */
    viewerReady() {
      // Listen to click for popup disabling
      const editHandler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.canvas
      );
      editHandler.setInputAction(e => {
        // Save popup position
        this.newPos.x = e.position.x;
        this.newPos.y = e.position.y;
        // If popup will show out, move map
        /* if ((viewer.scene.canvas.width - e.position.x) < 250) {
           const canvas = viewer.scene.canvas;
           const center = new Cesium.Cartesian2(canvas.clientWidth / 2.0, canvas.clientHeight / 2.0);
           center.x += 250;
           const result = viewer.camera.pickEllipsoid(center, viewer.scene.globe.ellipsoid);
           viewer.camera.flyTo({ destination : result });
           } */
        // ????this.config.visible = false;
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    },
    /**
     * Set popup visible
     */
    setVisible() {
      this.$refs.popupContainer.style.visibility = 'visible';
      /* ????this.config.x = this.newPos.x;
         ????this.config.y = this.newPos.y;
         ????this.config.visible = true; */
    },
    /**
     * Callback executed on "transitionend" of popup
     * @param {event} event transitionend native event
     */
    transitionendCallBack() {
      if (!this.config.visible) {
        this.$refs.popupContainer.style.visibility = 'hidden';
      }
    }
  }
};
</script>
<style lang="scss">
.popup-tool {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  cursor: auto;

  &__container {
    position: absolute;
    left: var(--left);
    top: var(--top);
    text-align: center;
    opacity: 1;
    visibility: hidden;
    transition: opacity 0.2s linear;

    &--disabled {
      opacity: 0;
    }
  }

  &__wrapper {
    background: $color-surface-01k;
    color: #333;
    box-shadow: 7px 7px 12px rgba(0, 0, 0, 0.4);
    padding: 1px;
    text-align: left;
    border-radius: 12px;
  }

  &__content {
    width: 200px;
    margin: 13px 13px 13px 25px;
    line-height: 1.4;
  }

  &__tip-container {
    width: 40px;
    height: 20px;
    position: absolute;
    left: -18px;
    top: 20px;
    pointer-events: none;

    .popup-tip {
      background: $color-surface-01k;
      color: $color-action-tertiary-hover;
      width: 17px;
      height: 17px;
      padding: 1px;
      margin: -10px auto 0;
      transform: rotate(45deg);
    }
  }

  &__close-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 6px 0 0;
    border: none;
    text-align: center;
    color: $color-action-tertiary-hover;
    text-decoration: none;
    background: transparent;
    cursor: pointer;

    @include font-body-large-bold();
  }
}
</style>
