<template>
  <div :style="`padding-left: ${option.level * 16}px`"
       class="dl-ui-rowitemTree dl-ui-rowitemTree__option"
       @click="$emit('change', option)"
  >
    <dl-ui-checkbox
      v-if="multiple"
      :disabled="option.disabled"
      :modelValue="selected"
      class="dl-ui-checkbox dl-ui-rowitemTree__option-checkbox"
    />
    <dl-ui-icon
      v-if="option.options && !isRoot"
      id="dl-ids-icon-arrows-down-single-no_circle-outlined"
      :class="{'dl-ui-rowitemTree__trigger-icon--open':option.open}"
      class="dl-ui-rowitemTree__trigger-icon"
      @click="clickOpen(option)"
    />
    <dl-ui-icon v-if="option.leftIcon" :id="option.leftIcon" class="dl-ui-rowitemTree__option-left-icon" />
    <div class="dl-ui-rowitemTree__box-text">
      {{ option.name }}
    </div>
    <dl-ui-icon v-if="option.rightIcon" :id="option.rightIcon" class="dl-ui-rowitemTree__option-right-icon" />
    <dl-ui-icon
      v-if="option.options && isRoot"
      id="dl-ids-icon-arrows-down-single-no_circle-outlined"
      :class="{'dl-ui-rowitemTree__trigger-icon--open':option.open}"
      class="dl-ui-rowitemTree__trigger-icon"
      @click="$emit('trigger', option)"
    />
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
  emits : ['change', 'trigger'],
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
    },
    /**
     * is root list
     */
    isRoot : {
      type    : Boolean,
      default : false,
      desc    : 'Is root options'
    }
  },
  methods : {
    /**
     * Open options item
     * @param {Object} option event
     */
    clickOpen(option) {
      if (option.open) {
        option.open = false;
      }
      else {
        option.open = true;
      }
    }
  }
};
</script>
<style lang="scss">
.dl-ui-rowitemTree {
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

  &__option-right-icon {
    margin-left: 8px;
  }

  &__option {
    width: 100%;
    flex: 1 1 auto;
  }

  &__box-text {
    flex: 1 1 auto;
  }

  &__trigger-icon {
    transition: all 0.2s linear;
    transform: rotate(-90deg);
    height: 16px;
    width: 16px;
    padding: 2px;
    margin-right: 4px;

    &--open {
      transform: rotate(0);
    }
  }
}
</style>
