<template>
  <div class="dl-ui-leaflet-infobox">
    <DlUiAccordion
      :title="$t(internalInfo.title)"
      :show="open"
      :description="$t(internalInfo.description)"
      class="dl-ui-leaflet-infobox__accordion"
    >
      <!-- Accordion Content -->
      <template #content>
        <!-- Scroller -->
        <div class="scroller dl-ui-scrollbar">
          <!-- to fix translate.... :description="$t(section.description)" -->
          <DlUiAccordion
            v-for="(section, index) in internalInfo.sections"
            :key="index"
            class="dl-ui-leaflet-infobox__accordion dl-ui-leaflet-infobox__accordion--nested"
            :show="section.show"
            :title="$t(section.title)"
            :description="section.description"
            @toggle="toggleChild($event, index)"
          >
            <!-- Sub-Accordion Content -->
            <template #content>
              <span
                v-for="(message, indexNested) in section.messages"
                :key="indexNested"
                class="dl-ui-leaflet-infobox__accordion__line"
              >
                {{ $t(message) }}
              </span>
            </template>
          </DlUiAccordion>
        </div>
      </template>
    </DlUiAccordion>
  </div>
</template>

<script>
/* istanbul ignore file  */
import DlUiAccordion from '../../../molecules/dl-ui-accordion';
export default {
  name       : 'DlUiMapInfoGroup',
  components : {
    DlUiAccordion
  },
  props : {
    /**
     * Info to be shown
     */
    info : {
      type    : Object,
      default : () => {}
    },
    /**
     * Start open
     */
    open : {
      type    : Boolean,
      default : false
    }
  },
  /**
   * Override function
   * @override
   */
  data() {
    return {
      internalInfo : this.info
    };
  },
  methods : {
    /**
     * Toggles child
     * @param {Object} val val
     * @param {Number} index idx
     */
    toggleChild(val, index) {
      if (val.value) {
        this.internalInfo.sections.forEach(element => {
          element.show = false;
        });
      }
      this.internalInfo.sections[index].show = val.value;
    }
  }
};
</script>

<style lang="scss">
@import '../../../molecules/dl-ui-accordion/mixins/accordion';
@import '../mixins/leaflet-map';

$accordion-settings: (
  'border': 2px solid $color-surface-05,
  'header::height': 54px
);
$nested-accordion-settings: (
  'border': none
);

// Info group: Container for accordions
.dl-ui-leaflet-infobox {
  width: 280px;
}

// Scroller
.scroller {
  max-height: 60vh;
  overflow-y: scroll;
}

.dl-ui-leaflet-infobox__accordion {
  @include accordion-style-config($accordion-settings);

  pointer-events: all;
  box-shadow: $lmap-componentBoxShadow;
  border-radius: 4px;

  .dl-ui-accordion__content {
    border-top: 1px solid $color-surface-05;
    padding: 0;
  }

  &__line {
    @include font-body-small-regular();

    &::after {
      content: '';
      display: block;
      margin: 2px 0;
      border-bottom: 1px solid $color-surface-05;
    }

    &:last-of-type {
      &::after {
        border-bottom: none;
      }
    }
  }

  // Nested accordion
  &--nested {
    @include accordion-style-config($nested-accordion-settings);

    .dl-ui-accordion__content {
      padding: 0 12px;
    }

    .dl-ui-accordion__title {
      border-top: 1px solid $color-surface-05;
    }

    &:first-of-type .dl-ui-accordion__title {
      border-top: none;
    }

    box-shadow: none;
  }
}
</style>
