import randomIdMixin from '../../../mixins/randomId';
import DlUiActionButton from '../dl-ui-action-button';

import metadata from './_metadata';
export default {
  name       : 'dl-ui-password',
  components : {
    'dl-ui-action-button' : DlUiActionButton
  },
  mixins : [randomIdMixin],
  emits  : ['update:modelValue', 'focus', 'blur'],
  props  : {
    /**
     * Value.
     */
    modelValue : {
      type    : String,
      default : '',
      desc    : 'Valor del input password'
    },
    /**
     * Disables input behavior.
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo disabled del password.'
    },
    /**
     * Error style
     */
    error : {
      type    : Boolean,
      default : false,
      desc    : 'Show error style'
    },
    /**
     * Requires password.
     */
    required : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo required del password, en un form.'
    },
    /**
     * Show eye icon to unhide pass
     */
    showEye : {
      type    : Boolean,
      default : true,
      desc    : 'Mostrar ojo para poder visualizar la contraseña.'
    },
    /**
     * Label
     */
    label : {
      type    : String,
      default : null,
      desc    : 'Etiqueta superior'
    },
    /**
     * Underline help text
     */
    help : {
      type    : String,
      default : null,
      desc    : 'Texto de ayuda bajo el campo'
    },
    /**
     * Placeholder
     */
    placeholder : {
      type    : String,
      default : null,
      desc    : 'Placeholder'
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      unmasked : false,
      focused  : false
    };
  },
  computed : {
    /**
     * Class calculation
     * @returns {Array} list of classes for main container
     */
    containerClass() {
      return [
        {
          'dl-ui-password--showEye'  : this.showEye,
          'dl-ui-password--disabled' : this.disabled,
          'dl-ui-password--focus'    : this.focused,
          'dl-ui-password--error'    : this.error
        }
      ];
    },
    /**
     * Icon calculation
     * @returns {String} icon id
     */
    icon() {
      return this.unmasked
        ? 'dl-ids-icon-eye-hide-outlined'
        : 'dl-ids-icon-eye-show-outlined';
    },
    /**
     * Switch handler
     * @returns {String} type
     */
    inputType() {
      return this.unmasked ? 'text' : 'password';
    }
  },
  methods : {
    /**
     * Input handler
     * @param {event} event The native input event.
     */
    onInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    /**
     * focus handler
     */
    onFocus() {
      this.focused = true;
      this.$emit('focus');
    },
    /**
     * blur handler
     */
    onBlur() {
      this.focused = false;
      this.$emit('blur');
    },
    /**
     * Switch handler
     */
    switchHidden() {
      if (this.disabled) {
        return;
      }
      this.unmasked = !this.unmasked;
      this.$refs.showIcon.$el.blur();
    }
  },
  // DEMO META DATA
  ...metadata
};
