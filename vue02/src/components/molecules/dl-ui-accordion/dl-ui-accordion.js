/**
 * Drop-down accordion
 */
import randomIdMixin from '../../../mixins/randomId';
import DlUiIcon from '../../atoms/dl-ui-icon';
import metadata from './_metadata';
import dlUiRipple from '../../../directives/dl-ui-ripple';

export default {
  name       : 'dl-ui-accordion',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  directives : { 'dl-ui-ripple' : dlUiRipple },
  inject     : {
    onAccordionAdd : {
      from    : 'onAccordionAdd',
      default : undefined
    },

    onAccordionRemove : {
      from    : 'onAccordionRemove',
      default : undefined
    },

    onAccordionActivated : {
      from    : 'onAccordionActivated',
      default : undefined
    }

  },
  emits  : ['toggle', 'update:show'],
  mixins : [randomIdMixin],
  watch  : {
    /**
     * Watch over show value to emit event
     *
     * @param {Boolean} newValue New value of Show
     */
    show(newValue) {
      this.innerShow = newValue;
    },
    /**
     * Watch over show value to emit event
     *
     * @param {Boolean} newValue New value of innerShow
     */
    innerShow(newValue) {

      if (!newValue) {
        this.maxheight = `${this.$refs.box.offsetHeight}px`;
      }
      this.$emit('toggle', { id : this.randomId, value : newValue });
      this.$emit('update:show', newValue);
      if (this.innerShow) {
        if (this.onAccordionActivated) {
          this.onAccordionActivated(this);
        }
      }
    },
    /**
     * header clickable
     * @param {Boolean} newValue new value
     */
    headerClickable(newValue) {
      const inputId = this.$refs.input.id;
      this.$refs.label.setAttribute('for', newValue ? inputId : '');
    }
  },
  props : {
    /**
     * Show or hide content
     */
    show : {
      type    : Boolean,
      default : false,
      desc    : 'Indica si el acordeón debe mostar el cuerpo o no'
    },
    /**
     * Header click opens content
     */
    headerClickable : {
      type    : Boolean,
      default : true,
      desc    : 'Indica si la cabecera del acordeón actua como botón parar mostrar el contenido'
    },
    /**
     * Content text.
     */
    content : {
      type    : String,
      default : 'Lorem ipsum',
      desc    : 'Texto del desplegable'
    },
    /**
     * Icon ID.
     */
    icon : {
      type    : String,
      default : '',
      desc    : 'Icono que se muestra en la parte izquierda del texto de manera opcional'
    },
    /**
     * Header title
     */
    title : {
      type    : String,
      default : 'Título',
      desc    : 'Título que se muestra en la cabecera del acordeón'
    },
    /**
     * Optional Description
     */
    description : {
      type    : String,
      default : 'Descripción',
      desc    : 'Descripción opcional que se muestra debajo del título'
    },
    /**
     * maxHeight
     */
    maxHeight : {
      type    : String,
      default : '800px'
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      innerShow : this.show,
      maxheight : '800px',
      loaded    : 0
    };
  },
  methods : {
  /**
   * Hide
   */
    setHide() {
      this.innerShow = false;
      this.$emit('update:show', false);
    },
    /**
   * Show
   */
    setShow() {
      this.innerShow = true;
      this.$emit('update:show', true);
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    if (this.headerClickable) {
      const inputId = this.$refs.input.id;
      this.$refs.label.setAttribute('for', inputId);
    }
    if (this.onAccordionAdd) {
      this.onAccordionAdd(this);
    }

    setTimeout(() => {
      this.loaded = 1;
      setTimeout(() => {
        this.loaded = 2;
      }, 10);
    }, 10);

    this.maxheight = `${this.$refs.box.offsetHeight}px`;
  },
  computed : {
    /**
       * validator value function
       * @returns {Boolean} result of validation
       */
    varStyle() {
      return {
        '--accordion-max-height' : this.maxheight
      };

    },
    /**
       * validator value function
       * @returns {Boolean} result of validation
       */
    calculateSpeed() {
      const time = 1;
      return `${time}s`;
    }
  },
  /**
   * override
   * @override
   */
  beforeDestroy() {
    if (this.onAccordionRemove) {
      this.onAccordionRemove(this);
    }
  },
  // DEMO META DATA
  ...metadata
};
