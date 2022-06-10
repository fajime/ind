import DlUiIcon from '../dl-ui-icon';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-button',
  components : {
    DlUiIcon
  },
  emits : ['clicked'],
  props : {
    /**
     * Disables button behavior.
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
     * Icon ID for left icon.
     *
     */
    leftIcon : {
      type    : String,
      default : '',
      desc    : 'Icono que se muestra en la parte izquierda del botón'
    },
    /**
     * Icon ID for right icon.
     *
     */
    rightIcon : {
      type    : String,
      default : '',
      desc    : 'Icono que se muestra en la parte derecha del botón'
    },
    /**
     * Determines whether to wait for a time between clicks.
     *
     * If the value is 'true', wait a time between clicks.
     */
    once : {
      type    : Boolean,
      default : false,
      desc    : 'Evita que el botón pueda ser pulsado dos veces seguidas'
    },
    /**
     * Determines the delay time in milliseconds.
     */
    onceTime : {
      type    : [Number, String],
      default : 700,
      desc    : 'Tiempo (ms) que el boton está inactivo cuando la propiedad <span class="demo__md--syntax">once</span> está activa</span>'
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      onceInProcess : false,
      onceTimeoutId : ''
    };
  },
  watch : {
    /**
     * Override
     * @override
     */
    disabled() {
      this.setDisabledClass();
    },
    /**
     * Override
     * @override
     */
    loading() {
      this.setLoadingClass();
    }
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
      this.setDisabledClass();
      this.setLoadingClass();
    },
    /**
     * Set or remove class disabled
     *
     */
    setDisabledClass() {
      if (this.disabled) {
        Array.from(this.$refs.button.classList).forEach(classElement => {
          this.$refs.button.classList.add(`${classElement}--disabled`);
        });
      }
      else {
        const classToRemove = Array.from(this.$refs.button.classList).filter(
          classElement => classElement.includes('--disabled')
        );
        classToRemove.forEach(classElement => {
          this.$refs.button.classList.remove(classElement);
        });
      }
    },
    /**
     * Set or remove class loading
     *
     */
    setLoadingClass() {
      if (this.loading) {
        Array.from(this.$refs.button.classList).forEach(classElement => {
          this.$refs.button.classList.add(`${classElement}--loading`);
        });
      }
      else {
        const classToRemove = Array.from(this.$refs.button.classList).filter(
          classElement => classElement.includes('--loading')
        );
        classToRemove.forEach(classElement => {
          this.$refs.button.classList.remove(classElement);
        });
      }
    },

    /**
     * Capture the `click` event and emit the event itself.
     *
     * @param {event} event The native click event.
     */
    onClick(event) {
      if (this.once) {
        if (this.onceInProcess) {
          clearTimeout(this.onceTimeoutId);
        }
        else {
          this.$emit('clicked', event);
          this.onceInProcess = true;
        }
        this.onceTimeoutId = setTimeout(
          () => (this.onceInProcess = false),
          Number(this.onceTime)
        );
      }
      else {
        this.$emit('clicked', event);
      }
    }
  },
  // DEMO META DATA
  ...metadata
};
