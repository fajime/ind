<template>
  <div class="dl-hl-viewer" ref="viewer">
    <div class="dl-hl-viewer__layout-wrapper-outside">
      <DlHViewerToolbar ref="toolbar" />
      <div class="dl-hl-viewer__layout-wrapper" id="viewerWrapper" ref="viewerWrapper">
        <grid-layout
          :layout.sync="layoutManager.config.value"
          :col-num="columns"
          :row-height="rowHeight"
          :is-draggable="true"
          :is-resizable="true"
          :vertical-compact="true"
          :margin="[itemMargin, itemMargin]"
          :autoSize="false"
          @layout-updated="layoutUpdatedEvent"
          ref="gridLayout"
        >
          <grid-item v-for="item in layoutManager.config.value"
                     :i="item.i"
                     :x="item.x"
                     :y="item.y"
                     :w="item.w"
                     :h="item.h"
                     :key="item.i"
                     :isResizable="item.isResizable"
                     :minW="minWidth"
                     :minH="minHeight"
                     drag-allow-from=".dl-hl-grid-item__header"
                     drag-ignore-from=".dl-hl-grid-item__content"
          >
            <component :is="item.component"
                       :layoutConfig="{height: item.h, width: item.w, columns, rows, minWidth, minHeight}"
                       @action="gridItemAction($event)"
            />
            {{ $store.getTeamScore }}
          </grid-item>
        </grid-layout>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutManager from '../manager/layoutManager';
import VueGridLayout from 'vue-grid-layout';
import DlHlMap2D from '../components/organisms/viewerComponents/dl-hl-map-2d-iframe';
import DlHlRace from '../components/organisms/viewerComponents/dl-hl-race.vue';
import DlHlScoringTable from '../components/organisms/viewerComponents/dl-hl-scoring-table.vue';
import DlHViewerToolbar from '../components/molecules/dl-hl-viewer-toolbar';
import Polling from '../mixins/polling';

export default {
  name       : 'DlHlViewer',
  mixins     : [Polling],
  components : {
    GridLayout            : VueGridLayout.GridLayout,
    GridItem              : VueGridLayout.GridItem,
    'dl-hl-map-2d'        : DlHlMap2D,
    'dl-hl-race'          : DlHlRace,
    'dl-hl-scoring-table' : DlHlScoringTable,
    DlHViewerToolbar
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      polling          : undefined,
      layoutManager    : new LayoutManager(this.$t),
      layoutInitValues : {
        activeMap2D : false
      },
      columns    : 12,
      rows       : 12,
      itemMargin : 5,
      rowHeight  : 110,
      minWidth   : 4,
      minHeight  : 2
    };
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.updateLayoutToolbarValues();
    this.rowHeight =
      Math.floor((this.$refs.viewerWrapper.offsetHeight - ((this.rows - 1) * this.itemMargin)) / this.rows);
    const resizeFn = () => {
      const viewerWrapper = document.querySelector('#viewerWrapper');
      if (viewerWrapper) {
        this.rowHeight = Math.floor((viewerWrapper.offsetHeight - ((this.rows - 1) * this.itemMargin)) / this.rows);
      }
    };
    window.addEventListener('resize', resizeFn.bind(this));
    this.initPolling(() => {
      this.getTeamScore2(this.$store.getters.getCatalogId);
      // this.getStudentScore();
    });
  },
  /**
   * Override
   * @override
   */
  beforeDestroy() {
    this.stopPolling();
  },
  methods : {
    /**
     * update layout init values
     */
    updateLayoutToolbarValues() {
      this.layoutInitValues.activeMap2D = this.layoutManager.flags.map2D;
    },
    /**
     * EventListener of update layout event of grid
     * @param {Array} newLayout layout configuration
     */
    layoutUpdatedEvent(newLayout) {
      this.layoutManager.updateLayoutValues(newLayout);
      this.updateLayoutToolbarValues();
    },
    /**
     * EventListener of acetion event from gridItem
     *  @param {Object} event event object
     */
    gridItemAction(event) {
      switch (event.type) {
        case 'close':
          this.layoutManager.removeItemFromLayout(event.id);
          break;
        case 'fullSize':
          this.layoutManager.fullSizeItem(event.id, this.rows, this.columns);
          this.$refs.gridLayout.layoutUpdate();
          /** Scroll to funtion */ // eslint-disable-next-line no-case-declarations
          const scrollToFn = () => {
            const itemConfig = this.layoutManager.config.value.find(item => (item.i === event.id));
            const postionTop = (itemConfig.y * this.rowHeight) + this.itemMargin;
            this.$refs.viewerWrapper.scrollTo(0, postionTop);
          };
          setTimeout(scrollToFn.bind(this), 100);
          break;
        case 'minimize':
          this.layoutManager.minimizeItem(event.id, this.minHeight, this.minWidth );
          this.$refs.gridLayout.layoutUpdate();
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss">

.dl-hl-viewer {
  flex: 1 1 auto;
  display: flex;
  height: 100%;
  background-color: $color-29;

  &__layout-wrapper-outside {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__layout-wrapper {
    width: 100%;
    overflow-y: auto;
    height: 100%;
  }
}

.vue-grid-item {
  user-select: none;
  touch-action: none;

  &.vue-grid-placeholder {
    background: $color-3 !important;
  }

  &.resizing {
    opacity: 0.75;
  }
}

.vue-resizable {
  touch-action: none;
}

.vue-resizable-handle {
  z-index: 99;
}

.vue-grid-layout {
  background: transparent;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
