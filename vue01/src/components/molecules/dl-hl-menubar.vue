<template>
  <nav class="dl-hl-menubar">
    <div class="dl-hl-menubar__options">
      <div class="dl-hl-menubar__item"
           v-for="(button, index) in menuItems"
           :key="index"
           :title="button.alt"
           @click="doActions(button)"
           :class="{'dl-hl-menubar__item--disabled':button.disabled,
                    'dl-hl-menubar__item--actived':itemActive === button }"
      >
        <dl-ui-icon class="dl-hl-menubar__item-icon" :id="button.iconId" />
        <!-- <div class="dl-hl-menubar__title">
          {{ $t(button.text) }}
        </div> -->
      </div>
    </div>
    <div class="dl-hl-menubar__profile">
      <div class="dl-hl-menubar__item dl-hl-menubar__item--disabled">
        <dl-ui-icon id="dl-ui-icon-user" class="dl-hl-menubar__item-icon" />
      </div>
    </div>
  </nav>
</template>
<script>

export default {
  name : 'DlHlMenubar',
  /**
   * Override
   * @override
   */
  data() {
    return {
      menuItems : [ {
        text     : this.$t('menubar.buttons.home'),
        alt      : this.$t('menubar.buttons.home'),
        iconId   : 'home',
        disabled : false
      }, {
        id            : 'viewer',
        path          : undefined,
        sidebarConfig : undefined,
        action        : undefined,
        text          : this.$t('menubar.buttons.viewer'),
        alt           : this.$t('menubar.buttons.viewer'),
        iconId        : 'viewer',
        disabled      : true
      }, {
        id            : 'planner',
        path          : undefined,
        sidebarConfig : undefined,
        action        : undefined,
        text          : this.$t('menubar.buttons.planner'),
        alt           : this.$t('menubar.buttons.planner'),
        iconId        : 'edit',
        disabled      : true
      }],
      itemActive : undefined
    };
  },
  /**
   * override
   * @override
   */
  mounted() {
    this.itemActive = this.menuItems[0];
  },
  methods : {
    /**
     * Performs action on button click
     * @param {String} button Button object
     */
    doActions(button) {
      if (button.disabled) {
        return;
      }
      this.itemActive = button;
      // Navigate first, if button has a path
      if (button.path && (this.$route.path !== button.path)) {
        this.$router.push(button.path);
      }
      // Update sidebar content, if button has sidebarConfig declared. Otherwise, hide sidebar and destroy contents
      if (button.sidebarConfig) {
        this.$store.dispatch('updateSidebarConfig', button.sidebarConfig);
      }
      else {
        this.$store.dispatch('clearSidebar');
      }
      // Execute custom actions, if button has any
      if (button.action) {
        button.action(this);
      }
    }
  }
};
</script>
<style lang="scss">
.dl-hl-menubar {
  flex: 0 0 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 60px;
  background-color: $color-1;
  border-right: 1px solid $color-25;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  user-select: none;

  &__options {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }

  &__item {
    display: flex;
    flex: 0 0 60px;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-bottom: 1px solid $color-3;
    fill: $color-6;
    align-items: center;
    cursor: default;
    transition: all 0.2s linear;
    border-left: 2px solid transparent;
    border-right: 1px solid $color-25;

    &-icon {
      height: 3rem;
      width: 3rem;
    }

    &--actived {
      fill: $color-0;
      border-left: 2px solid $color-9;
      background-color: $color-29;
      border-right: none;
    }

    &--disabled {
      background-color: $color-1;
      fill: $color-25;
    }

    &:not(.dl-hl-menubar__item--actived):not(.dl-hl-menubar__item--disabled):hover {
      border-left: 2px solid $color-8;
      background-color: $color-22;
      cursor: pointer;
    }
  }

  &__img {
    font-size: 30px;
    height: 30px;
    width: 30px;
    margin-bottom: 5px;
  }

  &__title {
    font-size: 1.2rem;
  }

  &__user-photo {
    height: 3.75rem;
    border-radius: 50%;
    border: 1px solid $color-6;
  }

  &__notification {
    font-size: 0.8rem;
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 50%;
    background-color: $color-2;
    color: #fff;
    position: absolute;
    bottom: 1rem;
    right: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__profile-dialog {
    bottom: 2rem;
    left: 80px;
    width: 240px;
  }
}
</style>
