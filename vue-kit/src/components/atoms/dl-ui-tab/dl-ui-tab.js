import randomIdMixin from '../../../mixins/randomId';
import metadata from './_metadata';
export default {
  name   : 'dl-ui-tab',
  mixins : [randomIdMixin],
  inject : ['onTabAdd', 'onTabRemove'],
  emits  : ['update:selected'],
  props  : {
    /** text to sho in tab */
    title : {
      type    : String,
      default : 'Title',
      desc    : 'Texto que se muestra dentro de la tab'
    },
    /** icon to show in tab */
    icon : {
      type    : String,
      default : undefined,
      desc    : 'Icono que se muestra dentro de la tab'
    },
    /** flag to indicates if tab is selected */
    selected : {
      type    : Boolean,
      default : false,
      desc    : 'Flag utilizado para indicar si la pestaña está seleccionada y adaptar su visualzación y comportamiento'
    },
    /** flag to indicates if tab is selected */
    closable : {
      type    : Boolean,
      default : false,
      desc    : 'Flag utilizado para indicar si la pestaña se puede cerrar mostrando una X de cierre'
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      isActive : false
    };
  },
  /**
   * override
   * @override
   */
  mounted() {
    this.isActive = this.selected;
    this.onTabAdd(this);
  },
  /**
   * override
   * @override
   */
  beforeDestroy() {
    this.onTabRemove(this);
  },
  /**
   * override
   * @override
   */
  unmounted() {
    this.onTabRemove(this);
  },
  methods : {
    /**
   * override
   * @override
   */
    setSelected() {
      this.isActive = true;
      this.$emit('update:selected', true);
    },

    /**
   * override
   * @override
   */
    setUnselected() {
      this.isActive = false;
      this.$emit('update:selected', false);
    },

    /**
   * override
   * @override
   */
    remove() {
      this.onTabRemove(this);
    }
  },
  // DEMO META DATA
  ...metadata
};
