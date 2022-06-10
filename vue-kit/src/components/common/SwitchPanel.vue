<template>
  <div :class="{ 'switch-panel--activeB': panelIndex === 1 }" class="switch-panel">
    <div class="switch-panel__panelA">
      <slot name="panelA" />
    </div>
    <div class="switch-panel__panelB">
      <slot name="panelB" />
    </div>
  </div>
</template>
<script>
export default {
  props : {
    /**
     * disable the select menu
     */
    panelIndex : {
      type    : Number,
      default : 0,
      desc    : 'Index panel to show'
    }
  }
};
</script>
<style lang="scss" scoped>
.switch-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  width: 200%;
  height: 100%;

  &__panelA {
    width: 100%;
    height: 100%;
    transition: transform 0.2s linear;
    transform: translateX(0);
  }

  &__panelB {
    width: 100%;
    height: 100%;
    transition: transform 0.2s linear;
    transform: translateX(0);
  }

  &--activeB {
    .switch-panel__panelA {
      transition: transform 0.2s linear;
      transform: translateX(-100%);
    }

    .switch-panel__panelB {
      transition: transform 0.2s linear;
      transform: translateX(-100%);
    }
  }
}
</style>
