<template>
  <div class="dl-ui-rowitem dl-ui-rowitem__option">
    <dl-ui-checkbox
      v-if="multiple"
      :tabindex="-1"
      :disabled="option.disabled"
      :modelValue="selected"
      class="dl-ui-checkbox dl-ui-rowitem__option-checkbox"
    />
    <dl-ui-icon v-if="option.leftIcon" :id="option.leftIcon" class="dl-ui-rowitem__option-left-icon" />
    <div class="dl-ui-rowitem__box-text">
      {{ option.name }}
    </div>
    <dl-ui-icon v-if="option.rightIcon" :id="option.rightIcon" class="dl-ui-rowitem__option-right-icon" />
  </div>
</template>
<script>
import DlUiCheckbox from '../../atoms/dl-ui-checkbox';
import DlUiIcon from '../../atoms/dl-ui-icon';

export default {
  components : {
    'dl-ui-checkbox' : DlUiCheckbox,
    'dl-ui-icon'     : DlUiIcon
  },
  emits : ['change'],
  props : {
    /**
     * v-model bound value
     */
    modelValue : {
      type    : Array,
      default : () => [],
      desc    : 'Value of the component'
    },
    /**
     * multiple function
     */
    multiple : {
      type    : Boolean,
      default : false,
      desc    : 'Habilita la multiple selección'
    },
    /**
     * multiple function
     */
    selected : {
      type    : Boolean,
      default : false,
      desc    : 'Item selected'
    },
    /**
     * option item
     */
    option : {
      type    : Object,
      default : () =>
        (
          {
            name     : 'name 2',
            value    : 'value 2',
            leftIcon : 'dl-ids-icon-user-single-outlined'
          }),
      desc : 'Array de items seleccionados a mostrar como variable options'

    }
  }
};
</script>
<style lang="scss">
.dl-ui-rowitem {
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: inherit;

  &__option-checkbox {
    margin-right: 8px;
  }

  &__option-left-icon {
    margin-right: 4px;
    margin-left: -4px;
  }

  &__option {
    width: 100%;
    flex: 1 1 auto;
    align-items: center;
    line-height: 20px;
  }

  &__box-text {
    flex: 1 1 auto;
  }
}
</style>
