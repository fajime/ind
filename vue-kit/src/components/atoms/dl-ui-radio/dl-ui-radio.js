import randomIdMixin from '../../../mixins/randomId';
import metadata from './_metadata';
export default {
  name         : 'dl-ui-radio',
  inheritAttrs : false,
  mixins       : [randomIdMixin],
  emits        : ['update:modelValue', 'focus', 'click', 'change'],
  props        : {
    /**
     * v-model bound value
     */
    initValue : {
      type    : String,
      default : null,
      desc    : 'Valor inicial de referencia para el radio'
    },
    /**
     * model value
     */
    modelValue : {
      type    : String,
      default : null,
      desc    : 'Valor modelo del componente'
    },

    /**
     * Label on left side
     */
    labelOnLeft : {
      type    : Boolean,
      default : false,
      desc    : 'Etiqueta label a la izquierda'
    }
  },
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      focused : false
    };
  },
  methods : {
    /**
     * Click handler - main container
     * @param {Event} event event
     */
    onClick(event) {
      if (!this.$attrs.disabled) {
        this.$emit('click', event);
        this.$emit('update:modelValue', this.initValue);
        this.$refs.input.focus();
        if (!this.checked) {
          this.$emit('change', event);
        }
      }
    },
    /**
     * Focus handler
     * @param {Event} event event
     */
    onFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    }
  },
  computed : {
    /**
     * Checked calculation
     * @returns {Bool} if input must be checked
     */
    checked() {
      return this.modelValue !== null && this.modelValue === this.initValue;
    },
    /**
     * Class calculation
     * @returns {Array} list of classes for main container
     */
    containerClass() {
      return [
        {
          'dl-ui-radio--checked'    : this.checked && !this.focused,
          'dl-ui-radio--disabled'   : this.$attrs.disabled,
          'dl-ui-radio--focused'    : this.checked && this.focused,
          'dl-ui-radio--label-left' : this.labelOnLeft
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
  // DEMO META DATA
  ...metadata
};
