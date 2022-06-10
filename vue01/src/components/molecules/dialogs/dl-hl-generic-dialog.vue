<template>
  <div class="dl-hl-generic-dialog" @click.stop>
    <div class="dl-hl-generic-dialog__header">
      {{ title }}
      <dl-ui-icon id="close" class="dl-hl-generic-dialog__header-icon" @click.native="close" />
    </div>
    <div class="dl-hl-generic-dialog__divider" />
    <div class="dl-hl-generic-dialog__content">
      <slot />
    </div>
    <slot name="extra" />
  </div>
</template>
<script>
export default {
  name  : 'DlHlGenericDialog',
  props : {
    /** Title to show in config container */
    title : {
      type    : String,
      default : ''
    }
  },
  methods : {
    /**
     * Emit close event
     */
    close() {
      this.$emit('close');
    }
  }
};
</script>
<style lang="scss">

.dl-hl-generic-dialog {
  display: flex;
  position: absolute;
  border-radius: 4px;
  border: 1px solid $color-22;
  background-color: $color-2;
  box-shadow: 0 1px 5px 0 rgba(23, 24, 25, 0.6);
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 !important;
  z-index: 4;
  text-align: left;

  &__header {
    font-size: 18px;
    color: $color-0;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 1rem 0.6rem;

    &-icon {
      height: 18px;
      width: 18px;
      cursor: pointer;
      fill: $color-0;
    }
  }

  &__divider {
    width: 90%;
    height: 1px;
    background-color: $color-25;
  }

  &__content {
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    width: 100%;
    color: $color-6;
  }
}
</style>
