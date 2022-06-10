import DlUiIcon from '../../atoms/dl-ui-icon';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-rating',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  emits : ['update:modelValue'],
  props : {
    /** value selected */
    modelValue : {
      type    : Number,
      default : null,
      desc    : 'Valor representado por el componente'
    },
    /** disable all component */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Desactiva el componente y aplica la clase <span class="demo__md--syntax">--disabled</span>'
    },
    /** read only property */
    readOnly : {
      type    : Boolean,
      default : false,
      desc    : 'Evita que el usuario pueda modificar el valor'
    },
    /** Number of start displayed selected */
    stars : {
      type    : Number,
      default : 5,
      desc    : 'Número de estrellas que muestra el componente>'
    },
    /** show icon to clear value */
    showCancel : {
      type    : Boolean,
      default : true,
      desc    : 'Muestra un icono que permite al usuario borrar la selección'
    }
  },
  watch : {
    /**
     * Override
     * @override
     */
    disabled(disabled) {
      if (disabled) {
        Array.from(this.$refs.rating.classList).forEach(classElement => {
          this.$refs.rating.classList.add(`${classElement}--disabled`);
        });
      }
      else {
        const classToRemove = Array.from(this.$refs.rating.classList).filter(
          classElement => classElement.includes('--disabled')
        );
        classToRemove.forEach(classElement => {
          this.$refs.rating.classList.remove(classElement);
        });
      }
    },
    /**
     * Override
     * @override
     */
    readOnly(readOnly) {
      if (readOnly) {
        Array.from(this.$refs.rating.classList).forEach(classElement => {
          this.$refs.rating.classList.add(`${classElement}--readOnly`);
        });
      }
      else {
        const classToRemove = Array.from(this.$refs.rating.classList).filter(
          classElement => classElement.includes('--readOnly')
        );
        classToRemove.forEach(classElement => {
          this.$refs.rating.classList.remove(classElement);
        });
      }
    }
  },
  methods : {
    /**
     * listener on click event over star icon
     *
     * @param {Object} event Event received
     * @param {Number} value New value selected
     */
    onStarClick(event, value) {
      if (!this.readOnly && !this.disabled) {
        this.updateModel(value, event);
      }
    },
    /**
     * listener on click event over cancel
     *
     * @param {Object} event Event received
     */
    onCancelClick(event) {
      if (!this.readOnly && !this.disabled) {
        this.updateModel(undefined, event);
      }
    },
    /**
     * Update value and raise events
     *
     * @param {Number} value New value selected
     */
    updateModel(value) {
      this.$emit('update:modelValue', value);
    }
  },
  //  DEMO META DATA
  ...metadata
};
