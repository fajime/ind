import DlUiIcon from '../../atoms/dl-ui-icon';

import metadata from './_metadata';

export default {
  name       : 'dl-ui-dropdown',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  emits : ['update:modelValue', 'click', 'change', 'showed', 'hide', 'blur', 'press:enter'],
  props : {
    /**
     * v-model bound value
     */
    modelValue : {
      type    : [Number, String, Array],
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
     * Error style
     */
    error : {
      type    : Boolean,
      default : false,
      desc    : 'Muestra estilos de Error'
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
          'dl-ui-dropdown--clearable' : this.showClear && !this.disabled,
          'dl-ui-dropdown--focus'     : this.focused,
          'dl-ui-dropdown-opened'     : this.overlayVisible
        }
      ];
    },
    /**
     * Check if modelValue is empty value
     * @return {Boolean} value is empty
     */
    empty() {
      return this.modelValue === undefined || this.modelValue === null || this.modelValue === '' || (Array.isArray(this.modelValue) && this.modelValue.length === 0);
    }
  },

  methods : {
    /**
     * Main container click handler
     * @param {Object} event event
     */
    onClick(event) {
      event.stopPropagation();
      if (this.disabled) {
        return;
      }
      if (this.overlayVisible && !this.$refs.overlay.contains(event.target)) {
        this.hide();
      }
      else {
        this.show();
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
    },
    /**
     * On click box
     * @param {Object} event click
     */
    handleClickBox(event) {
      this.$emit('click', event);
    }
  },
  // DEMO META DATA
  ...metadata
};
