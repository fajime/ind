import randomIdMixin from '../../../mixins/randomId';
import metadata from './_metadata';
/**
 * range to use in forms
 */
export default {
  name   : 'dl-ui-range',
  mixins : [randomIdMixin],
  emits  : ['update:modelValue'],
  watch  : {
    /**
     * watch over value to calc positions
     */
    modelValue() {
      this.calcPosition();
    }
  },
  props : {
    /**
     * Min value represented
     */
    min : {
      type    : [Number, String],
      default : 0,
      desc    : 'Valor mínimo del rango '
    },
    /**
     * Max value represented
     */
    max : {
      type    : [Number, String],
      default : 100,
      desc    : 'Valor máximo del rango'
    },
    /**
     * Step in value changes
     */
    step : {
      type    : [Number, String],
      default : 1,
      desc    : 'Salto mímimo en el que se mueve el rango'
    },
    /**
     * Value
     */
    modelValue : {
      type    : [Number, String],
      default : 0,
      desc    : 'Valor inicial en el que se pinta el componente'
    },
    /**
     * Disables switch behavior.
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Desactiva el componente para impedir su interacción.'
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      position : 0,
      result   : 0
    };
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.init();
  },
  methods : {
    /**
     *  init component
     */
    init() {
      setTimeout(() => {
        this.calcPosition();
      }, 200);
    },
    /**
     *  Calculate relative position of `thumb`
     */
    calcPosition() {
      this.position =
        ((this.modelValue - this.min) / (this.max - this.min)) *
        this.$el.clientWidth;
      this.result = -this.$el.clientWidth + this.position;
    },
    /**
     *  Emits `input` event
     * @param {String} value Value detected
     */
    raiseEvent(value) {
      this.$emit('update:modelValue', Number(value));
    }
  },
  // DEMO META DATA
  ...metadata
};
