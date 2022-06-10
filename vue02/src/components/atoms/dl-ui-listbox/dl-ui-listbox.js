import DlUiCheckbox from '../../atoms/dl-ui-checkbox';
import DlUiScrollpanel from '../../atoms/dl-ui-scrollpanel';
import DlUiIcon from '../../atoms/dl-ui-icon';
import metadata from './_metadata';
import ListView from '../../common/ListView.vue';
import RowItem from '../../common/RowItem/';
import classObserver from '../../../mixins/classObserver';

export default {
  name       : 'dl-ui-listbox',
  components : {
    'dl-ui-checkbox'    : DlUiCheckbox,
    'dl-ui-icon'        : DlUiIcon,
    'dl-ui-scrollpanel' : DlUiScrollpanel,
    ListView, RowItem
  },
  emits  : ['update:modelValue', 'mounted', 'focused'],
  mixins : [classObserver],
  props  : {
    /**
     * v-model bound value
     */
    modelValue : {
      type    : Array,
      default : () => [],
      desc    : 'Value of the component'
    },
    /**
     * listbox options
     */
    options : {
      type    : Array,
      default : () => [
        { name : 'name 1', value : 'value 1' },
        {
          name     : 'name 2',
          value    : 'value 2',
          leftIcon : 'dl-ids-icon-user-single-outlined'
        },
        {
          name      : 'name 3',
          value     : 'value 3',
          rightIcon : 'dl-ids-icon-user-single-outlined'
        },
        { name : 'name 4', value : 'value 4', disabled : true },
        { name : 'name 5', value : 'value 5' }
      ],
      desc : 'An array of listbox items to display as the available options.'
    },
    /**
     * tabindex
     */
    tabindex : {
      type    : Number,
      default : 0,
      desc    : 'Tab index'
    },
    /**
     * multiple function
     */
    multiple : {
      type    : Boolean,
      default : false,
      desc    : 'Habilita la multiple selección'
    },
    /**
     * visible items
     */
    visibleItems : {
      type    : Number,
      default : 5,
      desc    : 'Número máximo de elementos que se muestra antes de aparecer scroll'
    }
  },

  watch : {
    /**
     * Watch props modelValue
     */
    modelValue() {

      this.scrollSelection();

    },
    /**
     * visibleItems changed
     */
    visibleItems() {
      this.setHeight();
    }
  },
  methods : {
  /**
   * Get dynamic size class
   * @param {Object} _classAttrValue value
   */
    onClassChange() {
      this.setHeight();
    },
    /**
     * Checks if option selected
     * @param {Object} option option
     * @return {Bool} true if selected
     */
    isSelected(option) {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.some(val => val === option.value);
      }
      return false;
    },
    /**
     * Option click handler
     * @param {Object} option option
     */
    onOptionSelect(option) {
      let valueAux = this.modelValue || [];
      if (this.multiple) {
        const index = valueAux.findIndex(val => val === option.value);
        if (index > -1) {
          valueAux.splice(index, 1);
        }
        else {
          valueAux.push(option.value);
        }
      }
      else {
        valueAux = [];
        valueAux.push(option.value);
      }

      this.$emit('update:modelValue', valueAux);
      this.userChange = true;
      setTimeout(() => {
        this.userChange = false;
      }, 100);
    },

    /**
     * loaded list
     */
    loaded() {
      this.setHeight();
    },
    /**
     * setHeight list
     */
    setHeight() {
      if (this.$refs.listview) {
        const yPosition = this.$refs.listview.getElementPosition( this.visibleItems - 1);
        this.scrollHeight = yPosition === 0 ? 'auto' : `${yPosition}px`;
      }
    },

    /**
     * Set scroll by selection
     */
    scrollSelection() {
      let toIndex = -1;
      if (this.modelValue.length > 0) {
        const firstValue = this.modelValue[0];

        toIndex = this.options.findIndex(e => e.value === firstValue);
        if (!this.userChange && toIndex > -1) {
          this.setScrollByIndex(toIndex);
        }
      }

      if (this.tabindex === -1) {
        this.setFocus(toIndex);
      }

    },
    /**
     * Checks if option autocompleted
     * @param {Number} toIndex option
     */
    setScrollByIndex(toIndex) {
      const list = this.$refs.listview;
      this.scrollTop = list.getElementTopPosition(toIndex);
    },

    /**
     * Set focus
     * @param {Number} toIndex option
     */
    setFocus(toIndex) {
      const list = this.$refs.listview;
      list.setFocus(toIndex);
    },

    /**
     * Focused
     * @param {Object} { focus, index }
     */
    handleFocused({ focus }) {
      this.focused = focus;
      clearInterval(this.autoFocus);
      if (!focus) {
        this.autoFocus = setInterval(() => {
          this.$emit('focused', { focus });
          clearInterval(this.autoFocus);
        }, 100);
      }
    }

  },

  /**
   *  override
   * @override
   */
  data() {
    return {
      autoFocus    : 0,
      isMounted    : false,
      scrollHeight : '150px',
      scrollTop    : 0,
      userChange   : false,
      focused      : false,
      sizeMapped   : {
        options : {
          parentClass : 'dl-ui-listbox',
          parentRef   : 'root'
        },
        transform : []
      }
    };
  },
  /**
   *  override
   * @override
   */
  mounted() {
    this.isMounted = true;
    this.$emit('mounted');
  },
  /**
   *  unmounted component
   */
  unmounted() {
    clearInterval(this.autoFocus);
  },
  // DEMO META DATA
  ...metadata
};
