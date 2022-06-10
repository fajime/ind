import DlUiCheckbox from '../../atoms/dl-ui-checkbox';
import DlUiScrollpanel from '../../atoms/dl-ui-scrollpanel';
import DlUiIcon from '../../atoms/dl-ui-icon';
import metadata from './_metadata';
import TreeView from '../../common/ListView';
import SwitchPanel from '../../common/SwitchPanel';
import RowItemTree from '../../common/RowItem/RowItemTree';
import classObserver from '../../../mixins/classObserver';

export default {
  name       : 'dl-ui-treebox',
  components : {
    'dl-ui-checkbox'    : DlUiCheckbox,
    'dl-ui-icon'        : DlUiIcon,
    'dl-ui-scrollpanel' : DlUiScrollpanel,
    TreeView, RowItemTree, SwitchPanel
  },
  emits  : ['update:modelValue'],
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
     * treebox options
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
      desc : 'An array of treebox items to display as the available options.'
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
     * Watch props modelValue
     * @param {Object} v1 new options
     */
    options(v1) {
      this.alloptions = v1.slice();

    },
    /**
     * visibleItems changed
     */
    visibleItems() {
      this.setHeight();
    }
  },
  /**
   * created component
   */
  created() {
    this.alloptions = this.options.slice();
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
    onOptionSelect0(option) {
      let valueAux = this.modelValue || [];
      if (this.multiple) {
        if (valueAux.some(val => val === option.value)) {
          valueAux.splice(valueAux.indexOf(option.value), 1);
        }
        else {
          valueAux.push(option.value);
        }
      }
      else {
        valueAux = [];
        valueAux.push(option.value);
      }

      this.optionSelected = option;
      this.$emit('update:modelValue', valueAux);

      this.setTreeOptions();
      this.userChange = true;
      setTimeout(() => {
        this.userChange = false;
      }, 100);
    },
    /**
     * Option click handler
     * @param {Object} option option
     */
    onOptionSelect1(option) {

      this.userChange = true;
      setTimeout(() => {
        this.userChange = false;
      }, 100);

      let valueAux = this.modelValue || [];
      if (this.multiple) {
        if (valueAux.some(val => val === option.value)) {
          valueAux.splice(valueAux.indexOf(option.value), 1);
        }
        else {
          valueAux.push(option.value);
        }
      }
      else {
        valueAux = [];
        valueAux.push(option.value);
      }

      this.optionSelected = option;

      this.$emit('update:modelValue', valueAux);

      if (option.level === 0) {

        const toIndex = this.alloptions.findIndex(o => o.value === option.value);
        this.optionSelected = this.alloptions[toIndex];

        this.panelIndex = 0;
        setTimeout(() => {
          this.$refs.listview0.setFocus(toIndex);
        }, 100);
      }

    },
    /**
     * Options selected
     */
    setTreeOptions() {
      const options = [];

      this.panelIndex = 0;

      if (this.optionSelected) {

        if (this.optionSelected.options) {
          const selected = Object.assign({}, this.optionSelected);
          selected.open = true;
          selected.subitem = true;

          options.push(selected);
          this.panelIndex = 1;

          setTimeout(() => {
            if ( this.userChange) {
              this.$refs.listview1.setFocus(0);
            }
          }, 100);
        }

      }
      this.treeOptions = options;
    },
    /**
     * Option click handler
     * @param {Object} option option
     */
    handleTrigger(option) {

      if (option.level === 0) {
        setTimeout(() => {
          this.panelIndex = 0;

        }, 100);

      }

    },
    /**
     * Option click handler
     * @param {Object} option option
     */
    handleTrigger1({ event, option }) {

      if (event.code === 'ArrowRight') {
        option.open = true;
      }

      if (event.code === 'ArrowLeft') {
        option.open = false;
      }

      if (option.level === 0) {
        setTimeout(() => {
          this.panelIndex = 1;

        }, 100);

      }

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
      if (this.$refs.listview0) {
        const yPosition = this.$refs.listview0.getElementPosition( this.visibleItems - 1);
        this.scrollHeight = yPosition === 0 ? 'auto' : `${yPosition}px`;
      }
    },

    /**
     * Set scroll by selection
     */
    scrollSelection() {

      if (this.modelValue.length > 0) {
        const firstValue = this.modelValue[0];

        if (!this.userChange) {
          const finded = this.findOption(firstValue);

          if (finded.selected) {
            this.optionSelected = finded.opened;
            if (finded.opened) {
              finded.opened.open = false;
            }
            this.scrollTop = 0;
            if (finded.selected.level > 0) {
              this.panelIndex = 1;
              this.setTreeOptions();

              setTimeout(() => {
                const options1 = this.$refs.listview1.treeOptions;
                const toIndex = options1.findIndex(e => e.value === firstValue);
                this.scrollTop = this.$refs.listview1.getElementTopPosition(toIndex);
                // this.$refs.listview1.setFocus(toIndex);
              }, 100);
            }
            else {
              this.panelIndex = 0;

              setTimeout(() => {
                const options1 = this.alloptions;
                const toIndex = options1.findIndex(e => e.value === firstValue);
                this.scrollTop = this.$refs.listview0.getElementTopPosition(toIndex);
                // this.$refs.listview0.setFocus(toIndex);
              }, 100);
            }

          }
        }

      }

    },
    /**
     * Build tree to plain options
     * @param {String|Number} value option
     * @return {Array} top position
     */
    findOption(value) {
      const root = {};
      const treeToPlain = (parent, options, level) => {

        options.forEach(element => {

          element.open = false;
          element.level = level;
          if (value === element.value) {
            parent.open = true;
            root.selected = element;
          }

          if (element.options) {
            treeToPlain(element, element.options, level + 1);
          }

          if (element.open) {
            parent.open = true;
            root.opened = element;
          }
        });
      };

      treeToPlain(root, this.alloptions.slice(), 0);

      return root;
    },
    /**
     * Checks if option autocompleted
     * @param {Number} toIndex option
     * @param {Object} list listview
     */
    setScrollByIndex(toIndex, list) {
      this.scrollTop = list.getElementTopPosition(toIndex);
    },

    /**
     * Set focus
     * @param {Number} toIndex option
     */
    setFocus(toIndex) {
      if (this.panelIndex === 0) {
        const list = this.$refs.listview0;
        list.setFocus(toIndex);
      }
      else {
        const list = this.$refs.listview1;
        list.setFocus(toIndex);
      }

    },

    /**
     * Focused
     * @param {Object} { focus, index }
     */
    handleFocused({ focus }) {
      this.focused = focus;
    }

  },
  computed : {
    /**
     * Build tree to plain options
     * @return {Array} top position
     */
    rootOptions() {
      let options = this.alloptions.slice();
      options = options.map(o => {
        const o2 = Object.assign({}, o);
        o2.open = false;
        return o2;
      });
      return options;
    }
  },
  /**
   *  override
   * @override
   */
  data() {
    return {
      isMounted      : false,
      scrollHeight   : '150px',
      scrollTop      : 0,
      userChange     : false,
      optionSelected : null,
      panelIndex     : 0,
      treeOptions    : [],
      focused        : false,
      alloptions     : [],
      sizeMapped     : {
        options : {
          parentClass : 'dl-ui-treebox',
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
    this.scrollSelection();
    this.isMounted = true;
  },
  // DEMO META DATA
  ...metadata
};
