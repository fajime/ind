import randomIdMixin from '../../../mixins/randomId';
import DlUiIcon from '../dl-ui-icon';
import metadata from './_metadata';

export default {
  name       : 'dl-ui-input',
  components : {
    'dl-ui-icon' : DlUiIcon
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
      desc    : 'Valor del input text'
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
      desc    : 'Muestra estilos de Error'
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
     * readOnly input.
     */
    readonly : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo readonly del input, en un form.'
    },
    /**
     * Max length.
     */
    maxLength : {
      type    : Number,
      default : 1000,
      desc    : 'Longitud máxima del string.'
    },
    /**
     * Icon ID for left icon.
     */
    leftIcon : {
      type    : String,
      default : undefined,
      desc    : 'Icono que se muestra en la parte izquierda del input'
    },
    /**
     * Icon ID for right icon.
     */
    rightIcon : {
      type    : String,
      default : undefined,
      desc    : 'Icono que se muestra en la parte derecha del input'
    },
    /**
     * Label
     */
    label : {
      type    : String,
      default : undefined,
      desc    : 'Etiqueta superior'
    },
    /**
     * Underline help text
     */
    help : {
      type    : String,
      default : undefined,
      desc    : 'Texto de ayuda bajo el campo'
    },
    /**
     * Placeholder
     */
    placeholder : {
      type    : String,
      default : undefined,
      desc    : 'Placeholder'
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      focused : false
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
          /* 'dl-ui-input--left-icon'  : this.leftIcon,
             'dl-ui-input--right-icon' : this.rightIcon, */
          'dl-ui-input--readonly' : this.readonly,
          'dl-ui-input--required' : this.required,
          'dl-ui-input--disabled' : this.disabled,
          'dl-ui-input--focus'    : this.focused,
          'dl-ui-input--error'    : this.error
        }
      ];
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
    }
  },
  // DEMO META DATA
  ...metadata
};
