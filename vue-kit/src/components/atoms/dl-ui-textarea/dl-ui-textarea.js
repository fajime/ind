import randomIdMixin from '../../../mixins/randomId';
import metadata from './_metadata';
export default {
  name   : 'dl-ui-textarea',
  mixins : [randomIdMixin],
  emits  : ['update:modelValue', 'error'],
  props  : {
    /**
     * Value.
     */
    modelValue : {
      type    : String,
      default : '',
      desc    : 'Valor del textarea'
    },
    /**
     * Disables input behavior.
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo disabled del textarea.'
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
     * Requires input.
     */
    required : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo required del textarea, en un form.'
    },
    /**
     * readOnly textarea.
     */
    readonly : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo readonly del textarea, en un form.'
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
     * maxlength
     */
    maxChar : {
      type    : Number,
      default : 100,
      desc    : 'Max chars on input'
    },
    /**
     * Placeholder
     */
    placeholder : {
      type    : String,
      default : null,
      desc    : 'Placeholder'
    },
    /**
     * Error description
     */
    errortext : {
      type    : String,
      default : null,
      desc    : 'Error Description'
    },
    /**
     * Rows
     */
    rows : {
      type    : Number,
      default : 5,
      desc    : 'Number of rows'
    },
    /**
     * Cols
     */
    cols : {
      type    : Number,
      default : 30,
      desc    : 'Number of cols'
    },
    /**
     * Resizable
     */
    resizable : {
      type    : Boolean,
      default : true,
      desc    : 'Resizable'
    }
  },

  /**
   * override
   * @override
   */
  data() {
    return {
      counter    : 0,
      maxReached : false
    };
  },

  // eslint-disable-next-line require-jsdoc
  mounted() {
    this.counter = this.modelValue.length;
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.borderBoxSize[0]) {
          if (this.$refs.textAreaHelp) {
            const helpEl = this.$refs.textAreaHelp;
            helpEl.style.width = `${entry.borderBoxSize[0].inlineSize}px`;
          }
        }
      }
    });
    const taEl = this.$refs.textArea;
    this.resizeObserver.observe(taEl);
  },

  computed : {
    /**
     * Class calculation
     * @returns {Array} list of classes for main container
     */
    containerClass() {
      return [
        {
          'dl-ui-textarea--readonly' : this.readonly,
          'dl-ui-textarea--required' : this.required,
          'dl-ui-textarea--disabled' : this.disabled,
          'dl-ui-textarea--error'    : this.error
        }
      ];
    },

    /**
     * Textarea char counter
     * @returns {String} text to show
     */
    countertext() {
      let text = '';
      if (this.maxChar === null || this.maxChar === 0) {
        text = this.counter;
      }
      else {
        text = `${this.counter}/${this.maxChar}`;
      }
      return text;
    }
  },

  methods : {
    /**
     * Input handler
     * @param {event} event The native input event.
     */
    onInput(event) {
      this.counter = event.target.value.length;
      this.$emit('update:modelValue', event.target.value);
      if (event.target.value === '') {
        this.counter = 0;
      }
      if (this.counter >= this.maxChar) {
        this.maxReached = true;
        this.$emit('error', event.target.value);
      }
      else {
        this.maxReached = false;
      }
    }
  },

  // DEMO META DATA
  ...metadata
};
