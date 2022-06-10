import classObserver from '../../../mixins/classObserver';
import DlUiIcon from '../../atoms/dl-ui-icon';
import DlUiListbox from '../../atoms/dl-ui-listbox';
import DlUiDropdown from '../../atoms/dl-ui-dropdown';

import metadata from './_metadata';
export default {
  name       : 'dl-ui-select',
  components : {
    'dl-ui-icon'     : DlUiIcon,
    'dl-ui-listbox'  : DlUiListbox,
    'dl-ui-dropdown' : DlUiDropdown
  },
  emits  : ['update:modelValue', 'change'],
  mixins : [classObserver],
  props  : {
    /**
     * v-model bound value
     */
    modelValue : {
      type    : [Number, String, Array],
      default : undefined,
      desc    : 'Value del componente'
    },
    /**
     * select options
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
        {
          name     : 'name 4',
          value    : 'value 4',
          disabled : true
        }
      ],
      desc : 'Array de items seleccionados a mostrar como variable options'
    },
    /**
     * max height
     */
    scrollHeight : {
      type    : String,
      default : '200px',
      desc    : 'Altura de la ventana de visualización en pixels, un scrollbar es definido si la altura de la lista excede este valor'
    },
    /**
     * placeholder before selection is made
     */
    placeholder : {
      type    : String,
      default : 'Select...',
      desc    : 'Texto por defecto mostrado cuando no hay una opción seleccionada'
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
     * disable the select menu
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Desactiva el componente y aplica la clase <span class="demo__md--syntax">--disabled</span>'
    },
    /**
     * allow to clear selected option with an icon
     */
    showClear : {
      type    : Boolean,
      default : false,
      desc    : 'Muestra un icono para limpiar los valores seleccionados'
    },
    /**
     * input id
     */
    inputId : {
      type    : String,
      default : undefined,
      desc    : 'Identificador del elemento input subyacente'
    },
    /**
     * tabbing position
     */
    tabindex : {
      type    : Number,
      default : 0,
      desc    : 'Indice de elementos en orden de tabulación'
    },
    /**
     * Requires input.
     */
    required : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo required del input en un form'
    },
    /**
     * Info text over box
     */
    label : {
      type    : String,
      default : undefined,
      desc    : 'Texto que aparece encima de la caja'
    },
    /**
     * help text
     */
    help : {
      type    : String,
      default : undefined,
      desc    : 'Texto de ayuda que aparece debajo de la caja'
    }
  },
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      autoClose            : 0,
      size                 : '',
      focused              : false,
      overlayVisible       : false,
      outsideClickListener : null,
      valued               : [],
      sizeMapped           : {
        options : {
          parentClass : 'dl-ui-select',
          parentRef   : 'root'
        },
        transform : [
          {
            parent   : 'large',
            children : [
              { name : 'listbox', size : 'large' },
              { name : 'dropdown', size : 'large' }
            ]
          },
          {
            parent   : 'small',
            children : [
              { name : 'listbox', size : 'small' },
              { name : 'dropdown', size : 'small' }
            ]
          },
          {
            parent   : 'extra-small',
            children : [
              { name : 'listbox', size : 'extra-small' },
              { name : 'dropdown', size : 'extra-small' }
            ]
          }
        ]
      }
    };
  },
  /**
   * Created component
   *
   */
  created() {
    this.valued = [this.modelValue];
  },
  watch : {
    /**
     * Watch model
     *
     */
    modelValue() {
      this.valued = [this.modelValue];
    }
  },
  methods : {
  /**
   * Get dynamic size class
   * @param {Object} _classAttrValue value
   */
    onClassChange() {
      this.setClasses();
    },
    /**
     * Get dynamic size class
     */
    setClasses() {
      if (this.error) {
        this.classSize.dropdown = `${this.classSize.dropdown} dl-ui-dropdown--error`;
      }

      if (this.disabled) {
        this.classSize.dropdown = `${this.classSize.dropdown} dl-ui-dropdown--disabled`;
      }

    },
    /**
     * Get selected option
     * @param {Object} event event
     */
    handleInput(event) {
      this.$emit('update:modelValue', event[0]);
      clearInterval(this.autoClose);
      this.autoClose = setTimeout(() => {
        this.$refs.dropdown.hide();
        this.$refs.dropdown.focus();
        clearInterval(this.autoClose);
      }, 200);
    },
    /**
     * Clear content
     * @param {Object} event event
     */
    handleClear(event) {

      event.stopPropagation();
      this.$emit('update:modelValue', null);
    },

    /**
     * Item blur
     */
    handleBlur() {
      clearInterval(this.autoClose);
      this.autoClose = setTimeout(() => {
        /* istanbul ignore next */
        if (this.$refs.dropdown) {
          if (this.$refs.list) {
            if (!this.$refs.list.focused) {
              this.$refs.dropdown.overlayVisible = false;
              clearInterval(this.autoClose);
            }
          }
        }
      }, 200);
    },

    /**
     * Change selection
     * @param {Number} direction event
     */
    handleChange(direction) {
      const value = this.modelValue;
      const index = this.options.findIndex(e => e.value === value);
      const count = this.options.length;
      let toIndex = index;

      const nextSelection = ind => {
        if (ind > -1 && ind < count) {
          if (this.options[ind].disabled) {
            nextSelection(ind + direction);
          }
          else {
            toIndex = ind;
          }
        }
      };
      nextSelection(index + direction);

      if ((toIndex > -1) && (toIndex < count)) {
        this.$emit('update:modelValue', this.options[toIndex].value);

      }
    },

    /**
     * Get selected option
     * @return {Object} option
     */
    getSelectedOption() {
      let selectedOption;
      if (this.modelValue !== null && this.options) {
        for (const option of this.options) {
          if (this.modelValue === option.value) {
            selectedOption = option;
            break;
          }
        }
      }
      return selectedOption;
    },
    /**
     * Get selected option index
     * @return {Number} index
     */
    getSelectedOptionIndex() {
      let selectedOptionIndex = -1;
      if (this.modelValue !== null && this.options) {
        for (let i = 0; i < this.options.length; i++) {
          if (this.modelValue === this.options[i].value) {
            selectedOptionIndex = i;
            break;
          }
        }
      }
      return selectedOptionIndex;
    },
    /**
     * Option clearing handler
     * @param {Object} event event
     */
    onClearClick(event) {
      this.updateModel(event, null);
    },
    /**
     * Model updating handler
     * @param {Object} event event
     * @param {String} value value
     */
    updateModel(event, value) {
      this.valued = [value];
      this.$emit('update:modelValue', value);
      this.$emit('change', { originalEvent : event, value });
    },

    /**
     * Mounted listbox
     */
    listboxMounted() {
      setTimeout(() => {
        /* istanbul ignore next */
        if (this.$refs.list) {
          this.$refs.list.scrollSelection();
        }
      }, 100);

    }
  },
  computed : {
    /**
     * Get dynamic container class
     * @return {Array} classes
     */
    containerClass() {
      return [
        {
          'dl-ui-select--disabled'  : this.disabled,
          'dl-ui-select--clearable' : this.showClear && !this.disabled,
          'dl-ui-select--focus'     : this.focused,
          'dl-ui-select--error'     : this.error,
          'dl-ui-select-opened'     : this.overlayVisible
        }
      ];
    },
    /**
     * Get selected option
     * @return {Object} option
     */
    iconLeftSelected() {
      const selectedOption = this.getSelectedOption();
      if (selectedOption && selectedOption.leftIcon) {
        return selectedOption.leftIcon;
      }
      else {
        return null;
      }
    },

    /**
     * Get iconRightSelected option
     * @return {Object} option
     */
    iconRightSelected() {
      const selectedOption = this.getSelectedOption();

      if (selectedOption && selectedOption.rightIcon) {
        return selectedOption.rightIcon;
      }
      else {
        return null;
      }
    },
    /**
     * Get dynamic option-label to be shown
     * @return {String} label
     */
    optionSelected() {
      if (this.modelValue !== undefined && this.modelValue !== null) {
        const values = this.options.filter(e => this.modelValue === (e.value));
        return values.map(e => e.name ).join(', ');
      }
      else {
        return this.placeholder;
      }
    }

  },
  // DEMO META DATA
  ...metadata
};
