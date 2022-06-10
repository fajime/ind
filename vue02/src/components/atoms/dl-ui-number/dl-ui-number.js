import randomIdMixin from '../../../mixins/randomId';
import DlUiIcon from '../dl-ui-icon';
import DlUiButton from '../dl-ui-button';
import metadata from './_metadata';

export default {
  name       : 'dl-ui-number',
  components : {
    'dl-ui-icon'   : DlUiIcon,
    'dl-ui-button' : DlUiButton
  },
  mixins : [randomIdMixin],
  emits  : ['update:modelValue'],
  props  : {
    /**
     * Value.
     */
    modelValue : {
      type    : Number,
      default : undefined,
      desc    : 'Valor del input'
    },
    /**
     * Min value.
     */
    min : {
      type    : Number,
      default : undefined,
      desc    : 'Valor mínimo de entrada'
    },
    /**
     * Max value.
     */
    max : {
      type    : Number,
      default : undefined,
      desc    : 'Valor máximo de entrada'
    },
    /**
     * Step value.
     */
    step : {
      type    : Number,
      default : undefined,
      desc    : 'Valor del salto'
    },
    /**
     * Disables input behavior.
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo disabled del input.'
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
     * Required input.
     */
    required : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo required del input, en un form.'
    },
    /**
     * Requires input.
     */
    readonly : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo readonly del input, en un form.'
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
      focused       : false,
      minReached    : false,
      maxReached    : false,
      throttleTimer : null,
      timer         : null,
      pressed       : false,
      msInterval    : 100
    };
  },
  computed : {
    /**
     * Value can change or not
     * @returns {Boolean} True if cant change
     */
    quiet() {
      return this.readonly || this.disabled;
    },
    /**
     * Class calculation
     * @returns {Array} list of classes for main container
     */
    containerClass() {
      return [
        {
          'dl-ui-number--readonly' : this.readonly,
          'dl-ui-number--disabled' : this.disabled,
          'dl-ui-number--focus'    : this.focused,
          'dl-ui-number--error'    : this.error
        }
      ];
    },
    /**
     * Class calculation
     * @returns {Object} class value max reached
     */
    controlMaxClass() {
      return [
        {
          'dl-ui-number__controls-button--disabled' : this.maxReached
        }
      ];
    },
    /**
     * Class calculation
     * @returns {Object} class value min reached
     */
    controlMinClass() {
      return [
        {
          'dl-ui-number__controls-button--disabled' : this.minReached
        }
      ];
    }
  },
  methods : {
    /**
     * fff
     * @param {*} direction Indica el boton pulsado, up/down
     * @param {*} evnt Evento
     */
    mouseDown(direction, evnt) {
      // const me = this;
      evnt.preventDefault();
      if (this.quiet) {
        return;
      }
      this.pressed = true;

      this.timer = setInterval(() => {
        if (direction === 'up') {
          !this.quiet && this.stepUp();
        }
        else {
          !this.quiet && this.stepDown();
        }
      }, this.msInterval);
    },

    /**
     * When mouse button up, kill interval that increment value
     */
    mouseUp() {
      if (!this.timer) {
        return;
      }

      this.pressed = false;
      clearInterval(this.timer);
      this.timer = null;
      setTimeout(() => this.$refs.input.focus(), 20);
      // this.$refs.showIcon.$el.blur();
    },
    /**
     * Input handler
     * @param {event} event The native input event.
     */
    onInput(event) {
      // the application can control error
      this.$emit('update:modelValue', Number(event.target.value));
    },
    /**
     * focus handler
     */
    onFocus() {
      this.focused = true;
    },
    /**
     * blur handler
     */
    onBlur() {
      this.focused = false;
    },

    /**
     * stepUp handler
     */
    stepUp() {
      if (this.quiet) {
        return;
      }
      this.$refs.input.stepUp();
      const val = Number(this.$refs.input.value);
      this.$emit('update:modelValue', val);
      this.maxReached = val + this.step > this.max;
      this.minReached = false;
      if (!this.pressed) {
        this.$refs.input.focus();
      }
    },
    /**
     * stepDown handler
     */
    stepDown() {
      if (this.quiet) {
        return;
      }
      this.$refs.input.stepDown();
      const val = Number(this.$refs.input.value);
      this.$emit('update:modelValue', val);
      this.minReached = val - this.step < this.min;
      this.maxReached = false;
      this.$refs.input.focus();
    }
  },
  // DEMO META DATA
  ...metadata
};
