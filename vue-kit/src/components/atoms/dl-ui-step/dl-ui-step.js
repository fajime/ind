import randomIdMixin from '../../../mixins/randomId';
import DlUiIcon from '../dl-ui-icon';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-step',
  mixins     : [randomIdMixin],
  emits      : ['clicked'],
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  props : {
    /** text to show below */
    index : {
      type    : Number,
      default : 0,
      desc    : 'Step index'
    },
    /** text to show below */
    label : {
      type    : String,
      default : '',
      desc    : 'Texto que se muestra bajo el step'
    },
    /** step mode */
    mode : {
      type    : String,
      default : 'dot',
      desc    : 'Formato del step',
      // eslint-disable-next-line require-jsdoc
      validator(value) {
        return ['icon', 'numeric', 'dot'].includes(value);
      }
    },
    // eslint-disable-next-line strict-vue/require-jsdoc
    iconPending : {
      type    : String,
      default : '',
      desc    : 'Icon to show in step, for mode:icon'
    },
    // eslint-disable-next-line strict-vue/require-jsdoc
    num : {
      type    : Number,
      default : 0,
      desc    : 'Number to show in step, for mode:nimber'
    },

    /** flag indicates if step is complete or pending */
    complete : {
      type    : Boolean,
      default : false,
      desc    : 'Flag utilizado para indicar si el step esta completado y adaptar su visualzación y comportamiento'
    },
    // eslint-disable-next-line strict-vue/require-jsdoc
    iconComplete : {
      type    : String,
      default : '',
      desc    : 'Icon to show in step when completed step, for mode:icon'
    },
    /** flag indicates if step is disabled */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Flag utilizado para indicar si el step esta inhabilitado y adaptar su visualzación y comportamiento'
    },
    /** flag indicates if step is disabled */
    clickable : {
      type    : Boolean,
      default : true,
      desc    : 'Flag utilizado para indicar si el step es clickable, asi el padre puede operar en consecuencia'
    },
    /** flag indicates this is the current step in stepper */
    current : {
      type    : Boolean,
      default : false,
      desc    : 'Flag utilizado para indicar si el step es actual seleccionado'
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      isActive : false,
      focused  : false
    };
  },
  computed : {
    /**
     * Change icon for stare pending/complete
     * @returns {String} icon id
     */
    icon() {
      return this.complete ? (this.iconComplete ? this.iconComplete : this.iconPending) : this.iconPending;
    },
    /**
     * class state
     * @returns {Array} Clases state pending/complete
     */
    contentClass() {
      return [
        {
          'dl-ui-step__content--pending'  : !this.complete,
          'dl-ui-step__content--complete' : this.complete
        }
      ];
    },
    /**
     * Class calculation
     * @returns {String} mode class
     */
    stateClass() {
      return [{
        'dl-ui-step--clickable' : this.clickable,
        'dl-ui-step--disabled'  : this.disabled,
        'dl-ui-step--current'   : this.current,
        'dl-ui-step--focus'     : this.focused
      }];
    },
    /**
     * Type icon
     * @returns {Boolean} true if tipe 'dot'
     */
    isDotFlavour() {
      return this.mode === 'dot';
    },
    /**
     * Type icon
     * @returns {Boolean} true if tipe 'icon'
     */
    isIconFlavour() {
      return this.mode === 'icon';
    },
    /**
     * Type icon
     * @returns {Boolean} true if tipe 'num'
     */
    isNumericFlavour() {
      return this.mode === 'numeric';
    }
  },
  /**
   * override
   * @override
   */
  mounted() {

  },
  methods : {
    /**
     * focus handler
     */
    onFocus() {
      this.focused = true;
      // this.$emit('focus');
    },
    /**
     * blur handler
     */
    onBlur() {
      this.focused = false;
      // this.$emit('blur');
    },
    /**
     * click handler
     */
    onClick() {
      this.$emit('clicked', this.index);
      this.$refs.btn.blur();
    }
  },
  // DEMO META DATA
  ...metadata
};
