<template>
  <div class="dl-hl-tab-panel">
    <div class="dl-hl-tab-panel__header">
      <div class="dl-hl-tab-panel__header-level1">
        <ul ref="nav" class="dl-hl-tab-panel__nav" role="tablist">
          <li role="presentation"
              v-for="(tab, i) of config"
              :key="tab.id"
              class="dl-hl-tab-panel__tab"
              :class="[{'dl-hl-tab-panel__tab--active': (selectedIndex === i),
                        'dl-hl-tab-panel__tab--disabled': tab.disabled}]"
              @click="onTabClick($event, i)"
              @keydown="onTabKeydown($event, i)"
          >
            <a role="tab"
               class="dl-hl-tab-panel__tab-title"

               :tabindex="tab.disabled ? null : '0'"
               :aria-selected="selectedIndex === i"
            >
              {{ tab.text }}
            </a>
          </li>
        </ul>
        <div class="dl-hl-tab-panel__controls">
          <slot name="controls" />
        </div>
      </div>
      <div class="dl-hl-tab-panel__header-level2">
        <div class="dl-hl-tab-panel__marker" :style="`transform: translateX(${selectedIndex * 6}em)`" />
      </div>
    </div>
    <div class="dl-hl-tab-panel__panels">
      <transition-group :name="animationType" tag="div">
        <div
          v-for="(tab, i) of config"
          :key="tab.id"
          class="dl-hl-tab-panel__panel-content"
          v-show="i === selectedIndex"
          role="tabpanel"
        >
          <slot :name="`tab-content-${i}`" />
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>

export default {
  name  : 'DlHlTabPanel',
  props : {
    /** configration */
    config : {
      type    : Array,
      default : () => []
    },
    /** init tab to show */
    initTab : {
      type    : Number,
      default : 0
    }
  },
  /**
   * override
   * @override
   */
  data() {
    return {
      selectedIndex     : this.initTab,
      animationFordward : true
    };
  },
  computed : {
    /**
     * animation type
     * @return {String} animation name
     */
    animationType() {
      return (this.animationFordward) ? 'page' : 'page-back';
    }
  },
  methods : {
    /**
     * On tab click event
     *@param {Object} event event received
     *@param {Number} i index of item clicked
     */
    onTabClick(event, i) {
      if (!this.config[i].disabled && i !== this.selectedIndex) {
        const prevIndex = this.selectedIndex;
        this.selectedIndex = i;
        this.animationFordward = (prevIndex > i);
        this.$emit('update:activeIndex', this.selectedIndex);
        this.$emit('tab-change', {
          originalEvent : event,
          index         : i
        });
      }
      this.$emit('tab-click', {
        originalEvent : event,
        index         : i
      });
    },
    /**
     * On tab click event
     *@param {Object} event event received
     *@param {Number} i index of item clicked
     */
    onTabKeydown(event, i) {
      // enter key
      if (event.which === 13) {
        this.onTabClick(event, i);
      }
    },
    /**
     * switch to next tab
     *@param {Number} i moving
     */
    nextTab(i) {
      const newPos = this.selectedIndex + i;
      if (newPos < 0) {
        this.selectedIndex = this.config.length - 1;
      }
      else if (newPos >= this.config.length) {
        this.selectedIndex = 0;
      }
      else {
        this.selectedIndex = newPos;
      }
    },
    /**
     * switch to tab pointed by index param
     *@param {Number} index index destiny
     */
    goTab(index) {
      this.selectedIndex = index;
    }
  }
};
</script>
<style lang="scss">
.dl-hl-tab-panel {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;

  &__header {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    border-bottom: 1px solid $color-0;
    height: 2.5em;

    &-level1 {
      display: flex;
      flex: 0 0 auto;
      justify-content: space-between;
      height: 100%;
    }

    &-level2 {
      display: flex;
      flex: 0 0 auto;
    }
  }

  &__nav {
    display: flex;
    flex: 0 0 auto;
  }

  &__tab {
    display: flex;
    flex: 1 1 auto;
    width: 6em;
    transition: all 0.2s linear;
    cursor: pointer;
    position: relative;

    &::after {
      content: " ";
      position: absolute;
      top: 0;
      left: -1px;
      width: 100%;
      height: 100%;
      border-radius: 2px;
      transition: all 0.2s;
    }

    &:not(.dl-hl-tab-panel__tab--active):hover::after {
      border-left: 2px solid $color-8;
    }

    &:not(.dl-hl-tab-panel__tab--active):hover {
      background-color: $color-22;
    }

    &--active {
      cursor: default;
      background-color: $color-1;

      &::after {
        border-left: 2px solid $color-9;
      }
    }

    &--disabled {
      color: $color-6;
    }
  }

  &__tab-title {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    padding-left: 6px;
  }

  &__controls {
    display: flex;
    flex: 1 1 auto;
    justify-content: flex-end;
    align-items: center;
  }

  &__control-tab {
    display: flex;
    flex: 0 0 auto;
    padding: 0 8px;
  }

  &__control-tab-button {
    padding: 6px 6px;
    margin: 5px 2px;
  }

  &__control-tab-icon {
    display: flex;
    flex: 1 1 auto;
  }

  &__marker {
    display: flex;
    flex: 0 0 auto;
    width: 6em;
    height: 2px;
    background-color: $color-0;
    transition: all 0.4s cubic-bezier(0.38, -0.26, 0.29, 0.99);
  }

  &__panels {
    display: flex;
    flex: 1 1 auto;
    position: relative;
  }

  &__panel-content {
    display: flex;
    flex: 1 1 auto;
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

.page-enter {
  opacity: 0;
  transform: translateX(80px);
}

.page-enter-active {
  transition: all 0.6s cubic-bezier(0.26, 0.89, 0.51, 1.01);
}

.page-leave-active {
  transition: all 0.6s cubic-bezier(0.26, 0.89, 0.51, 1.01);
  opacity: 0;
  transform: translateX(-80px);
}

// Backwards transition

.page-back-enter {
  opacity: 0;
  transform: translateX(-80px);
}

.page-back-enter-active {
  transition: all 0.6s cubic-bezier(0.26, 0.89, 0.51, 1.01);
}

.page-back-leave-active {
  transition: all 0.6s cubic-bezier(0.26, 0.89, 0.51, 1.01);
  opacity: 0;
  transform: translateX(80px);
}
</style>
