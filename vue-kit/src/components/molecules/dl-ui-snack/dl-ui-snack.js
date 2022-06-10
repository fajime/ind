import DlUiIcon from '../../atoms/dl-ui-icon';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-snack',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  emits : ['closed'],
  props : {
    /** Whether to show or not */
    show : {
      type    : Boolean,
      default : false,
      desc    : 'Whether to show or not'
    },
    /** CSS position value */
    position : {
      type    : String,
      default : 'relative',
      desc    : 'CSS position value. Adjust as desired (fixed, rel, abs...)'
    },
    /** Type of message, for color selection */
    type : {
      type    : String,
      default : 'info',
      /**
       * Property validation
       * @param {String} value value of the property
       * @returns {Boolean} true
       */
      validator(value) {
        const validOptions = ['ok', 'warn', 'error', 'info', 'default'];

        if (!validOptions.includes(value)) {
          throw new Error(
            `The "type" property only accept these values: "${validOptions.join(', ')}"`
          );
        }
        return true;
      },
      desc : 'Type of message, for color selection: ok, warn, error, info'
    },
    /** Time to show */
    timeout : {
      type    : Number,
      default : 0,
      desc    : 'Time to show. 0 is no timeout.'
    },
    /** Lines of text */
    text : {
      type    : [Array, String],
      default : () => ['A line of text', 'An alternative line of text'],
      desc    : 'Lines of text'
    },
    /** Show icon */
    showIcon : {
      type    : Boolean,
      default : true,
      desc    : 'Show icon'
    }
  },
  computed : {
    /**
     * returns a array with text content
     * @returns {Array} Array of text content
     */
    textArray() {
      let value;
      if (Array.isArray(this.text)) {
        value = this.text;
      }
      else {
        value = [this.text];
      }
      return value;
    }
  },
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      visible : this.show,
      tout    : null
    };
  },
  watch : {
    /**
     * Change visibility on prop change
     * @override
     */
    show(value) {
      if (this.visible) {
        this.close();
        clearTimeout(this.tout);
      }
      this.visible = value;
      if (value && this.timeout > 0) {
        this.tout = setTimeout(this.close, this.timeout);
      }
    }
  },
  methods : {
    /**
     * Close snack
     */
    close() {
      this.$emit('closed');
      this.visible = false;
    },
    /**
     * Get icon show
     * @returns {String} id icon set
     */
    getIcon() {
      const icons = {
        'default' : 'dl-ids-icon-info-outlined',
        'info'    : 'dl-ids-icon-info-outlined',
        'ok'      : 'dl-ui-icon-check-outlined',
        'warn'    : 'dl-ids-icon-alerts-circle-outlined',
        'error'   : 'dl-ids-icon-close-circle-outlined'
      };
      return icons[this.type];
    }
  },
  // DEMO META DATA
  ...metadata
};
