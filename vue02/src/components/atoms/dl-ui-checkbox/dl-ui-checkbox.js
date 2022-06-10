import randomIdMixin from '../../../mixins/randomId';
import DlUiIcon from '../dl-ui-icon';
import metadata from './_metadata';
/**
 * checkbox to use in forms
 */
export default {
  name       : 'dl-ui-checkbox',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  emits  : ['update:modelValue', 'focus'],
  mixins : [randomIdMixin],
  props  : {
    /**
     * Set init value.
     */
    modelValue : {
      type    : Boolean,
      default : false,
      desc    : 'Propiedad que representa el valor del input checkbox'
    },
    /**
     * name of the checkbox.
     */
    name : {
      type    : String,
      default : '',
      desc    : 'Nombre identificativo del checkbox'
    },
    /**
     * Label on left side
     */
    labelOnLeft : {
      type    : Boolean,
      default : false,
      desc    : 'Label'
    },
    /**
     * Disables checkbox behavior.
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Desactiva el componente para impedir su interacción. Aplica la clase <span class="demo__md--syntax">--disabled</span>'
    },
    /**
     * Apply indeterminate icon when checkbox is checked
     */
    indeterminate : {
      type    : Boolean,
      default : false,
      desc    : 'Cambia visualmente el icono del checkbox a un aspecto tipo "indeterminado"'
    },
    /**
     * Icon visible when checkbox is checked.
     */
    icon : {
      type    : String,
      default : 'dl-ids-icon-ok-no_circle-filled',
      desc    : 'Icono que se visualiza dentro del componente en estado activo'
    },
    /**
     * Icon visible when checkbox has indeterminate status.
     */
    indeterminateIcon : {
      type    : String,
      default : 'dl-ids-icon-check-indet',
      desc    : 'Icono que se visualiza dentro del componente en estado indeterminado'
    },
    /**
     * tabindex
     */
    tabindex : {
      type    : Number,
      default : 0,
      desc    : 'Tab index'
    }
  },
  watch : {
    /**
     * Override
     * @override
     */
    icon(val) {
      if (!this.indet) {
        this.iconShown = val;
      }
    },
    /**
     * Override
     */
    indeterminate() {
      this.setIndeterminateStatus();
    }
  },
  computed : {
    /**
     * Class calculation
     * @returns {Array} list of classes for main container
     */
    containerClass() {
      return [
        {
          'dl-ui-checkbox--checked'    : this.modelValue,
          'dl-ui-checkbox--focus'      : this.focused,
          'dl-ui-checkbox--indet'      : this.indet,
          'dl-ui-checkbox--disabled'   : this.disabled,
          'dl-ui-checkbox--label-left' : this.labelOnLeft
        }
      ];
    },
    /**
     * detects if slot has contain
     * @returns {Boolean} flag
     */
    hasLabelSlot() {
      return this.$slots.default !== undefined;
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      iconShown : this.icon,
      focused   : false,
      indet     : false
    };
  },
  methods : {
    /**
     * Raise event when user changes value
     * @param {Event} event event
     */
    onChangeValue(event) {
      this.$emit('update:modelValue', event.target.checked, event);
    },
    /**
     * focus event handler
     * @param {Event} event event
     */
    onFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    /**
     * blur event handler
     */
    onBlur() {
      this.focused = false;
    },
    /**
     * Set indeterminate status
     *
     */
    setIndeterminateStatus() {
      if (this.indeterminate) {
        this.iconShown = this.indeterminateIcon;
        this.indet = true;
      }
      else {
        this.indet = false;
        setTimeout(() => {
          this.iconShown = this.icon;
        }, 200);
      }
    }
  },
  // DEMO META DATA
  ...metadata
};
