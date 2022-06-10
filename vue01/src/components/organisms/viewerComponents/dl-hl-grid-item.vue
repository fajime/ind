<template>
  <div class="dl-hl-grid-item">
    <div class="dl-hl-grid-item__header">
      <dl-ui-icon class="dl-hl-grid-item__header-icon" :id="icon" />
      {{ title }}
      <div class="dl-hl-grid-item__header-clickable" @click="processDoubleClick" />
      <div class="dl-hl-grid-item__header-controls-group">
        <div class="dl-hl-grid-item__header-control" @click.stop="showMenu=!showMenu">
          <dl-ui-icon id="dots" class="dl-hl-grid-item__header-control-icon" />
        </div>
        <ul class="dl-hl-grid-item__header-control-menu" ref="menuContext" v-if="showMenu">
          <li class="dl-hl-grid-item__header-control-menu-item" @click="action('minimize')" v-if="!isMinimized">
            <dl-ui-icon id="minimize" class="dl-hl-grid-item__header-control-menu-item-icon" />
            <span class="dl-hl-grid-item__header-control-menu-item-text"> {{ $t('layout.gridItem.minimize') }}</span>
          </li>
          <li class="dl-hl-grid-item__header-control-menu-item" @click="action('fullSize')" v-if="!isFullSized">
            <dl-ui-icon id="full-screen" class="dl-hl-grid-item__header-control-menu-item-icon" />
            <span class="dl-hl-grid-item__header-control-menu-item-text"> {{ $t('layout.gridItem.fullSize') }}</span>
          </li>
          <!-- <li class="dl-hl-grid-item__header-control-menu-item" @click="action('close')">
            <dl-ui-icon id="close" class="dl-hl-grid-item__header-control-menu-item-icon" />
            <span class="dl-hl-grid-item__header-control-menu-item-text"> {{ $t('layout.gridItem.close') }}</span>
          </li> -->
        </ul>
      </div>
    </div>
    <div class="dl-hl-grid-item__content">
      <slot />
    </div>
  </div>
</template>
<script>
import doubleClick from '../../../mixins/doubleClick.js';
export default {
  name   : 'DlHlGridItem',
  mixins : [doubleClick],
  props  : {
    /** Title to show in grid item container */
    title : {
      type    : String,
      default : ''
    },
    /** Icon to show in grid item container */
    icon : {
      type    : String,
      default : ''
    },
    /** id of item */
    id : {
      type    : String,
      default : ''
    },
    /** layout Config */
    layoutConfig : {
      type    : Object,
      default : () => {}
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      showMenu : false
    };
  },
  computed : {
    /**
     * Check if item is in full sized
     * @return {Boolean} flag
     */
    isFullSized() {
      return (this.layoutConfig.height === this.layoutConfig.rows &&
      this.layoutConfig.width === this.layoutConfig.columns );
    },
    /**
     * Check if item is in full sized
     * @return {Boolean} flag
     */
    isMinimized() {
      return (this.layoutConfig.height === this.layoutConfig.minHeight &&
      this.layoutConfig.width === this.layoutConfig.minWidth);
    }
  },
  watch : {
    /**
     * whatch over showMenu variable
     * @param {Boolean} newValue New value of the var
     */
    showMenu(newValue) {
      if (newValue) {
        const fnOutsideClick = e => {
          e.stopPropagation();
          if (this.$refs.menuContext && !this.$refs.menuContext.contains(e.target)) {
            this.showMenu = false;
          }
        };
        document.addEventListener('click', fnOutsideClick.bind(this), { once : true });
      }
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.doubleClickCallback = this.toggleSize;
  },
  methods : {
    /**
     * emite event action
     * @param {String} actionType Type of action to emit
     */
    action(actionType) {
      this.showMenu = false;
      this.$emit('action', { type : actionType, id : this.id });
    },
    /**
     * change size
     */
    toggleSize() {
      this.$emit('action', { type : this.isFullSized ? 'minimize' : 'fullSize', id : this.id });
    }
  }
};
</script>
<style lang="scss">
.dl-hl-grid-item {
  display: flex;
  border: solid 1px $color-22;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  box-shadow: 0 1px 5px 0 rgba(23, 24, 25, 0.6);
  flex-direction: column;
  height: 100%;

  &__header {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-color: $color-26;
    font-size: 14px;
    color: $color-6;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    box-shadow: 0 6px 12px 0 rgba(7, 35, 49, 0.15);
    transition: background-color 0.2s linear;
    height: 26px;

    &:hover {
      background-color: $color-2;
    }

    &-icon {
      width: 1.6rem;
      height: 1.6rem;
      fill: $color-6;
      margin-right: 1rem;
    }

    &-clickable {
      flex: 1 1 auto;
      display: flex;
      justify-content: flex-end;
      position: relative;
      align-items: center;
      height: 100%;
    }

    &-controls-group {
      flex: 0 0 auto;
      display: flex;
      justify-content: flex-end;
      position: relative;
      align-items: center;
      height: 100%;
    }

    &-control {
      flex: 0 0 auto;
      display: flex;
      justify-content: center;
      height: 1.8rem;
      width: 1.8rem;
      border-radius: 50%;
      color: $color-6;
      fill: $color-6;
      cursor: pointer;

      &-icon {
        height: 100%;
        width: 100%;
      }

      &-menu {
        position: absolute;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        background-color: $color-2;
        min-width: 120px;
        z-index: 100;
        box-shadow: 0 1px 5px 0 rgba(23, 24, 25, 0.6);
        border: 1px solid $color-22;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        top: 28px;
        right: -10px;

        &-item {
          flex: 0 0 auto;
          display: flex;
          cursor: pointer;
          padding: 0.3rem 1rem;
          align-items: center;
          color: $color-6;
          transition: alss 0.2s linear;
          fill: $color-6;
          border-left: 2px solid transparent;

          &:hover {
            background-color: $color-22;
            border-left: 2px solid $color-8;
          }

          &-icon {
            height: 16px;
            width: 16px;
          }

          &-text {
            margin-left: 1rem;
          }
        }
      }
    }
  }

  &__content {
    flex: 1 1 auto;
    background-color: $color-31;
    height: calc(100% - 28px);
  }
}
</style>
