import DlUiIcon from '../../atoms/dl-ui-icon';
import DlUiButton from '../../atoms/dl-ui-button';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-card',
  components : {
    'dl-ui-icon' : DlUiIcon,
    DlUiButton
  },
  emits : ['buttonClicked', 'iconButtonClicked'],
  props : {
    /**
     * Header image
     *
     */
    headerImage : {
      type    : String,
      default : '',
      desc    : 'Imagen que se muestra encima de la cabecera'
    },
    /**
     * Controls if header image will appear.
     *
     */
    hasHeaderImage : {
      type    : Boolean,
      default : false,
      desc    : 'Controla si aparce o no la imagen de cabecera'
    },
    /**
     * Header title
     *
     */
    title : {
      type    : String,
      default : 'Title',
      desc    : 'Título que se muestra en la cabecera del acordeón'
    },
    /**
     * Header alert icon
     *
     */
    titleIcon : {
      type    : String,
      default : '',
      desc    : 'Icono de junto al título.'
    },
    /**
     * Header action icons. Max 4 icons.
     *
     */
    actions : {
      type    : Array,
      default : () => [],
      desc    : 'Configuración que recibe el componente para pintar los iconos de acciones, hasta un maximo de 4.'
    },
    /**
     * footer buttons. Max 4 buttons
     *
     */
    buttonList : {
      type : Array,
      /**
       * Controls if footer buttons will appear.
       * @return {Array} Buttons
       */
      default() {
        return [];
      },
      desc : 'Array compuesto por los botones que se deben mostrar, con un máximo de cuatro'
    },
    /**
     * Controls if footer buttons will appear.
     *
     */
    hasButtons : {
      type    : Boolean,
      default : false,
      desc    : 'Controla si aparcen o no botones en el footer'
    }
  },
  methods : {
    /**
     * Trigger event from footer buttons.
     * @param {function} fn function
     * @param {Number} index index of button
     */
    executeButton(fn, index) {
      this.$emit('buttonClicked', index);
      if (fn) {
        fn();
      }
    },
    /**
     * Trigger event from header icons
     * @param {function} fn function
     * @param {Number} index index of button
     */
    executeIconButton(fn, index) {
      this.$emit('iconButtonClicked', index);
      if (fn) {
        fn();
      }
    }
  },
  // DEMO META DATA
  ...metadata
};
