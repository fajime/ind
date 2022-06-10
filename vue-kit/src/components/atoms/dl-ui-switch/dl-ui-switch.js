import randomIdMixin from '../../../mixins/randomId';
import metadata from './_metadata';
/**
 * Switch to use in forms
 */
export default {
  name   : 'dl-ui-switch',
  mixins : [randomIdMixin],
  emits  : ['update:modelValue'],
  props  : {
    /**
     * Value.
     */
    modelValue : {
      type    : Boolean,
      default : false,
      desc    : 'Indica si el componente debe estar activo o no al renderizarse inicialmente'
    },
    /**
     * Label
     */
    label : {
      type    : String,
      default : undefined,
      desc    : 'Etiqueta'
    },
    /**
     * Disables switch behavior.
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Desactiva el componente para impedir su interacción. Aplica la clase <span class="demo__md--syntax">--disabled</span>'
    },
    /**
     * Label on right side
     */
    labelOnRight : {
      type    : Boolean,
      default : false,
      desc    : 'Desactiva el componente para impedir su interacción. Aplica la clase <span class="demo__md--syntax">--disabled</span>'
    }
  },
  methods : {
    /**
     * Raise event when user change value
     *
     * @param {Boolean} value Active value
     */
    raiseEvent(value) {
      this.$emit('update:modelValue', value);
    }
  },
  // DEMO META DATA
  ...metadata
};
