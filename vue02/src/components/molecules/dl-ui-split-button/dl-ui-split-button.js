import DlUiActionButton from '../../atoms/dl-ui-action-button';
import DlUiListBox from '../../atoms/dl-ui-listbox';
import DlUiButton from '../../atoms/dl-ui-button';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-split-button',
  components : {
    'dl-ui-button'        : DlUiButton,
    'dl-ui-action-button' : DlUiActionButton,
    'dl-ui-listbox'       : DlUiListBox
  },
  emits : ['clicked', 'input'],
  /**
   * Override
   * @override
   */
  data() {
    return {
      show : false
    };
  },

  props : {
    /**
     * Disables split-button behavior.
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Desactiva el evento del botón y aplica la clase <span class="demo__md--syntax">--disabled</span>'
    },
    /**
     * Activate loading status.
     */
    loading : {
      type    : Boolean,
      default : false,
      desc    : 'Activa comportamiento de carga del botón'
    },
    /**
     * left button icon ID.
     *
     */
    leftIcon : {
      type    : String,
      default : '',
      desc    : 'Icono que se muestra en la parte izquierda del botón'
    },
    /**
     * Action Button Icon.
     *
     */
    dropDownIcon : {
      type    : String,
      default : 'dl-ids-icon-arrows-down-single-no_circle-outlined',
      desc    : 'Icono que se muestra en la parte izquierda del botón'
    },
    /**
     * Tamaño custom
     *
     */
    customSizeButton : {
      type    : String,
      default : 'medium',
      desc    : 'Tamaño custom del button'
    },
    /**
     * custom class listbox
     *
     */
    customClassListbox : {
      type    : String,
      default : 'dl-ui-listbox',
      desc    : 'Clase custom del listbox'
    },
    /**
     * display list
     */
    showList : {
      type    : Boolean,
      default : false,
      desc    : 'Muestra lista'
    },
    /**
     * max height
     */
    scrollHeight : {
      type    : String,
      default : '200px',
      desc    : 'Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.'
    },
    /**
     * listbox options
     */
    options : {
      type    : Array,
      default : () => [
        { name : 'name 1', value : 'name 1' },
        {
          name     : 'name 2',
          value    : 'name 2',
          leftIcon : 'dl-ids-icon-user-single-outlined'
        },
        {
          name      : 'name 3',
          value     : 'name 3',
          rightIcon : 'dl-ids-icon-user-single-outlined'
        },
        { name : 'name 4', value : 'name 4', disabled : true },
        { name : 'name 5', value : 'name 5' }
      ],
      desc : 'An array of listbox items to display as the available options.'
    },
    /**
     * text displays inside button
     *
     */
    mainText : {
      type    : String,
      default : 'Aceptar',
      desc    : 'Botón que se muestra en la parte izquierda del button'
    }
  },
  watch : {
    /**
     * Override
     * @override
     */
    disabled() {
      this.setDisabledClass();
    }
  },
  methods : {
    /**
     * Override
     *  @param {event} event The native click event.
     */
    displayListBox(event) {
      this.show = !this.show;
      this.$emit('clicked', event);
    },
    /**
     * Override
     *  @param {event} event The native click event.
     */
    optionSelected(event) {
      this.$emit('input', event);
    },
    /**
     * Set or remove class disabled
     *
     */
    setDisabledClass() {
      if (this.disabled) {
        Array.from(this.$refs.split.classList).forEach(classElement => {
          this.$refs.split.classList.add(`${classElement}--disabled`);
        });
      }
      else {
        const classToRemove = Array.from(this.$refs.split.classList).filter(
          classElement => classElement.includes('--disabled')
        );
        classToRemove.forEach(classElement => {
          this.$refs.split.classList.remove(classElement);
        });
      }
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    /*  this.init(); */
  },
  /**
   * Override
   * @override
   */
  computed : {
    /**
     * Get dynamic height depending on css value
     * @return {String} css height
     */
    inputHeight() {
      return `${this.$refs.container.clientHeight + 9}px`;
    }
  },
  // DEMO META DATA
  ...metadata
};
