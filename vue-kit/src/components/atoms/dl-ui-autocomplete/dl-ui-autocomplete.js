import classObserver from '../../../mixins/classObserver';
import DlUiIcon from '../../atoms/dl-ui-icon';
import DlUiListbox from '../../atoms/dl-ui-listbox';
import DlUiDropdown from '../../atoms/dl-ui-dropdown';

import metadata from './_metadata';
export default {
  name       : 'dl-ui-autocomplete',
  components : {
    'dl-ui-icon'     : DlUiIcon,
    'dl-ui-listbox'  : DlUiListbox,
    'dl-ui-dropdown' : DlUiDropdown
  },
  emits  : ['update:modelValue', 'change', 'complete'],
  mixins : [classObserver],
  props  : {
    /**
     * v-model bound value
     */
    modelValue : {
      type    : [Number, String],
      default : undefined,
      desc    : 'Value del componente'
    },
    /**
     * autocomplete options
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
        { name : 'name 4', value : 'value 4', disabled : true }
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
     * placeholder before autocompleteion is made
     */
    placeholder : {
      type    : String,
      default : 'Autocomplete...',
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
     * disable the autocomplete menu
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Desactiva el componente y aplica la clase <span class="demo__md--syntax">--disabled</span>'
    },
    /**
     * Activate loading status.
     */
    loading : {
      type    : Boolean,
      default : false,
      desc    : 'Activa comportamiento de carga del componente'
    },
    /**
     * allow to clear autocompleted option with an icon
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
      keyword              : '',
      sizeMapped           : {
        options : {
          parentClass : 'dl-ui-autocomplete',
          parentRef   : 'root'
        },
        transform : [
          {
            parent   : 'default',
            children : [
              { name : 'icon', size : 'small' }
            ]
          },
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
  computed : {
    /**
     * Get options filtered
     * @return {Array} options
     */
    optionsFiltered() {
      const originalOptions = this.options;
      let values = [...originalOptions];
      if (this.keyword !== '' && originalOptions) {
        values = originalOptions.filter(e => {
          const keyword = String(this.keyword).toLowerCase();
          const name = String(e.name).toLocaleLowerCase();
          const value = String(e.value).toLocaleLowerCase();

          return name.includes(keyword) || value.includes(keyword);
        });
      }

      return values;
    },
    /**
     * Get dynamic container class
     * @return {Array} classes
     */
    containerClass() {
      return [
        {
          'dl-ui-autocomplete--disabled'  : this.disabled,
          'dl-ui-autocomplete--clearable' : this.showClear && !this.disabled,
          'dl-ui-autocomplete--focus'     : this.focused,
          'dl-ui-autocomplete--error'     : this.error,
          'dl-ui-autocomplete-opened'     : this.overlayVisible
        }
      ];
    },
    /**
     * Get icon left from option selected. Show in box
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
     * Get icon right from option selected. Show in box
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
     * Get dynamic option-label to be shown as placeholder
     * @return {String} label
     */
    optionAutocompleted() {
      const autocompletedOption = this.getAutocompletedOption();
      if (autocompletedOption) {
        return autocompletedOption.name;
      }
      else {
        return this.placeholder;
      }
    }
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
     * Options visible
     */
    showingOpts() {
      this.overlayVisible = true;
    },
    /**
     * Options Hidden
     */
    hidenOpts() {
      this.overlayVisible = false;
    },
    /**
     * Get autocompleted option
     * @return {Object} option
     */
    getAutocompletedOption() {
      let autocompletedOption;
      if (this.modelValue !== null && this.optionsFiltered) {
        for (const option of this.optionsFiltered) {
          if (this.modelValue === option.value) {
            autocompletedOption = option;
            break;
          }
        }
      }
      return autocompletedOption;
    },
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
     * Get autocompleted option
     * @param {Object} event event
     */
    handleInput(event) {

      this.$emit('update:modelValue', event[0]);

      const item = this.options.find(e => e.value === event[0]);
      if (item) {
        this.keyword = item.name;
      };

      clearInterval(this.autoClose);
      this.autoClose = setTimeout(() => {
        this.$refs.dropdown.hide();
        this.$refs.dropdown.focus();
        clearInterval(this.autoClose);
      }, 200);
    },
    /**
     * Clear content, update options¿?
     * @param {Object} event event
     */
    handleClear(event) {
      this.keyword = '';
      this.selected = '';
      this.updateModel(event, null);
      if (this.overlayVisible) {
        this.$emit('complete', this.keyword);
      }
    },

    /**
     * Item blur
     */
    handleBlur() {
      clearInterval(this.autoClose);
      this.autoClose = setTimeout(() => {

        if (this.$refs.dropdown) {
          if (!this.$refs.list?.focused) {
            this.$refs.dropdown.overlayVisible = false;
            clearInterval(this.autoClose);
          }

        }
      }, 200);
    },

    /**
     * Change autocompleteion
     * @param {Number} direction event
     */
    handleChange(direction) {

      this.$refs.dropdown.overlayVisible = true;
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
        this.keyword = this.options[toIndex].name;
      }

    },

    /**
     * Get autocompleted option
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
     * Get autocompleted option index
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
     * Model updating handler
     * @param {Object} event event
     * @param {String} value value
     */
    updateModel(event, value) {
      this.$emit('update:modelValue', value);
      this.$emit('change', { originalEvent : event, value });
    },

    /**
     * Mounted listbox
     */
    listboxMounted() {
      setTimeout(() => {
        if (this.$refs.list) {
          this.$refs.list.scrollSelection();
        }
      }, 100);

    },
    /**
     * input handler
     * @param {Object} event event
     */
    onInput(event) {
      this.updateModel(event, null );
      this.$emit('complete', this.keyword);
      if (this.keyword === '') {
        this.$refs.dropdown.hide();
      }
      else {
        this.$refs.dropdown.show();
      }
    }
  },

  // DEMO META DATA
  ...metadata
};
