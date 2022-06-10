<template>
  <div
    ref="dropdown"
    class="dl-ui-dropdown"
    :class="{ overlayVisible }"
    @keydown.space="handleSpace($event)"
    @keydown.up="handleChange($event,-1)"
    @keydown.down="handleChange($event,1)"
    @keydown.enter="$emit('press:enter')"
    @blur="handleBlur"
  >
    <div ref="container" :class="containerClass" class="dl-ui-dropdown__container">
      <div class="dl-ui-dropdown__box" @click="onClick($event)">
        <div ref="trigger" class="dl-ui-dropdown__box-slot">
          <slot />
        </div>
        <button v-if="showClear" class="dl-ui-dropdown__clear-button" @click="handleClear">
          <dl-ui-icon id="dl-ids-icon-close-no-circle-outlined" class="dl-ui-dropdown__clear-icon" />
        </button>
        <div class="dl-ui-dropdown__trigger-button">
          <dl-ui-icon id="dl-ids-icon-arrows-down-single-no_circle-outlined"
                      :class="{'dl-ui-dropdown__trigger-icon--open':overlayVisible}"
                      class="dl-ui-dropdown__trigger-icon"
          />
        </div>
      </div>
      <transition name="dl-ui-transition-fade">
        <div v-if="overlayVisible" ref="overlay" class="dl-ui-dropdown__panel">
          <div ref="itemsWrapper">
            <slot name="wrapper" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import DlUiIcon from '../atoms/dl-ui-icon';

export default {
  name       : 'Dropdown',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  emits : ['update:modelValue', 'clear', 'click', 'change', 'showed', 'hide', 'blur', 'press:enter'],
  props : {
    /**
     * v-model bound value
     */
    modelValue : {
      type    : [Number, String],
      default : undefined,
      desc    : 'Value del componente'
    },

    /**
     * disable the select menu
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Desactiva el componente y aplica la clase <span class="demo__md--syntax">--disabled</span>'
    },
    /**
     * allow to clear selected option with an icon
     */
    showClear : {
      type    : Boolean,
      default : false,
      desc    : 'Muestra un icono para limpiar los valores seleccionados'
    },
    /**
     * input id
     */
    inputId : {
      type    : String,
      default : undefined,
      desc    : 'Identificador del elemento input subyacente'
    }

  },
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      focused              : false,
      overlayVisible       : false,
      outsideClickListener : null,
      valued               : []
    };
  },
  computed : {
    /**
     * Get dynamic container class
     * @return {Array} classes
     */
    containerClass() {
      return [
        {
          'dl-ui-dropdown--disabled'  : this.disabled,
          'dl-ui-dropdown--clearable' : this.showClear && !this.disabled,
          'dl-ui-dropdown--focus'     : this.focused,
          'dl-ui-dropdown-opened'     : this.overlayVisible
        }
      ];
    }
  },
  watch : {
    /**
     * Watch model
     *
     */
    modelValue() {
      this.valued = [this.modelValue];
    }
  },
  methods : {
    /**
     * Main container click handler
     * @param {Object} event event
     */
    handleClear(event) {

      event.stopPropagation();
      this.$emit('clear');
    },
    /**
     * Main container click handler
     * @param {Object} event event
     */
    onClick(event) {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.overlay || !this.$refs.overlay.contains(event.target)) {

        if (this.overlayVisible) {
          this.hide();
        }
        else {
          this.show();
        }
      }

    },
    /**
     * Key press space
     * @param {Object} event event
     */
    handleSpace(event) {
      event.preventDefault();
      this.overlayVisible = true;
    },
    /**
     * Key press space
     * @param {Object} event event
     * @param {Number} direction event
     */
    handleChange(event, direction) {
      event.preventDefault();
      this.$emit('change', direction);
    },
    /**
     * Focus lost
     * @param {Object} _event event
     */
    handleBlur() {
      setTimeout(() => {
        if (this.overlayVisible) {
          this.$emit('blur');
        }
      }, 10);

    },

    /**
     * show list panel
     */
    show() {
      this.overlayVisible = true;
      this.bindOutsideClickListener();
      this.$emit('showed');
    },
    /**
     * hide list panel
     */
    hide() {
      this.overlayVisible = false;
      this.unbindOutsideClickListener();
      this.$emit('hide');
    },
    /**
     * focus dropbox
     */
    focus() {
      this.$refs.dropdown.focus();
    },
    /**
     * Model updating handler
     * @param {Object} event event
     * @param {String} value value
     */
    updateModel(event, value) {
      this.valued = [value];
      this.$emit('update:modelValue', value);
      this.$emit('change', { originalEvent : event, value });
    },
    /**
     * Bind closing panel to outside click
     */
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = event => {
          if (
            this.overlayVisible &&
            this.$refs.overlay &&
            !this.$refs.container.contains(event.target)
          ) {
            this.hide();
          }
        };
        document.addEventListener('click', this.outsideClickListener);
      }
    },
    /**
     * UnBind closing panel to outside click
     */
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    }
  }

};

</script>
<style lang="scss" scoped>
.dl-ui-dropdown {
  display: flex;

  &__panel {
    position: absolute;
    width: 100%;
    z-index: 100000000000000;
  }

  &__container {
    position: relative;
    user-select: none;
    width: 100%;
    background-color: transparent;
  }

  &__box {
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &-slot {
      flex: 1 1 auto;
      display: flex;
      flex-direction: row;
      padding: 0 8px;
      padding-right: 0;
      width: calc(100% - 64px);
    }
  }

  &__clear-button {
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 1000;
  }

  &__trigger-button {
    height: 100%;
    background: transparent;
    display: flex;
    align-items: center;
  }

  &__trigger-icon {
    height: 100%;
    transition: all 0.2s linear;
    fill: $color-action-tertiary-hover;

    &--open {
      transform: rotate(180deg);
    }
  }
}

.dl-ui-dropdown.overlayVisible > .dl-ui-dropdown__container > .dl-ui-dropdown__box,
.dl-ui-dropdown:focus > .dl-ui-dropdown__container > .dl-ui-dropdown__box {
  border: 1px solid $color-action-primary-hover;
}

.dl-ui-dropdown.overlayVisible > .dl-ui-dropdown__container > .dl-ui-dropdown__box > .dl-ui-dropdown__trigger-icon,
.dl-ui-dropdown:focus > .dl-ui-dropdown__container > .dl-ui-dropdown__box > .dl-ui-dropdown__trigger-icon {
  fill: $color-surface-contrast;
}

.dl-ui-dropdown__clear-button:focus > .dl-ui-dropdown__clear-icon {
  fill: $color-surface-contrast;
}
</style>
