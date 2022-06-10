import randomIdMixin from '../../../mixins/randomId';
import metadata from './_metadata';
import DlUiIcon from '../dl-ui-icon';
/**
 * toggle-button
 */
export default {
  name       : 'dl-ui-toggle-button',
  components : {
    DlUiIcon
  },
  mixins : [randomIdMixin],
  emits  : ['update:modelValue'],
  props  : {
    /**
     * Icon not active.
     */
    icon : {
      type    : String,
      default : 'dl-ui-icon-uncheck-outlined',
      desc    : 'Icono del botón en estado normal'
    },
    /**
     * Icon Active.
     */
    iconActive : {
      type    : String,
      default : 'dl-ui-icon-check-outlined',
      desc    : 'Icono del botón en estado activo'
    },
    /**
     * Set init value.
     */
    modelValue : {
      type    : Boolean,
      default : false,
      desc    : 'Indica si el componente debe estar activo o no al renderizarse inicialmente'
    },
    /**
     * Disables switch behavior.
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Desactiva el componente para impedir su interacción. Aplica la clase <span class="demo__md--syntax">--disabled</span>'
    }
  },
  data : () => ({
    emptySlot : false
  }),
  /**
   * Override
   * @override
   */
  mounted() {
    this.emptySlot = (this.$slots.default === undefined);
  },
  methods : {
    /**
     * Raise event when user changes value
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
