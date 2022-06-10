/**
 * TODO:
 * - closable: para poner el cierre en la esq. sup-der
 * - autoclose: se cierra sola en Xms
 * - tipo: info, success, warn, error
 *
*/
import metadata from './_metadata';
import randomIdMixin from '../../../mixins/randomId';
import DlUiActionButton from '../../atoms/dl-ui-action-button';
import DlUiButton from '../../atoms/dl-ui-button';
export default {
  name   : 'dl-ui-dialog',
  mixins : [randomIdMixin],
  emits  : [
    // 'buttonClicked',
    'update:modelValue'
  ],
  components : {
    'dl-ui-action-button' : DlUiActionButton,
    'dl-ui-button'        : DlUiButton
  },
  props : {
    /**
     * Dialog header title
     */
    title : {
      type    : String,
      default : null,
      desc    : 'Dialog header title'
    },
    /**
     * Dialog visibilty
     */
    modelValue : {
      type    : Boolean,
      default : false,
      desc    : 'Dialog visibility'
    },
    /**
     * Dialog is modal (with backdrop)
     */
    modal : {
      type    : Boolean,
      default : false,
      desc    : 'Dialog is modal'
    },
    /**
     * footer buttons. Max 4 buttons
     *
     */
    buttonList : {
      type    : Array,
      /**
       * Controls weather footer buttons will appear.
       * @return {Array} Buttons
       */
      default : () => [],
      desc    : 'Array compuesto por los botones que se deben mostrar, con un máximo de cuatro'
    },
    /**
     * Dialog is screen centered
     */
    centered : {
      type    : Boolean,
      default : true,
      desc    : 'Dialog is centered on screen'
    },
    /**
     * Dialog width to content size
     */
    fitToContent : {
      type    : Boolean,
      default : false,
      desc    : 'Dialog is fitted to content or full width'
    },
    /**
     * Dialog is closable
     */
    closable : {
      type    : Boolean,
      default : true,
      desc    : 'Dialog is closable'
    }

  },
  computed : {
    /**
     * Modal footer
     * @returns {Boolean} Check if modal has a footer
     */
    hasFooter() {
      return this.buttonList.length > 0;
    }
  },
  methods : {
    /**
     * Trigger event from footer buttons.
     * @param {function} fn function
     * @param {Number} index index of button
     */
    executeButton(fn) {
      // this.$emit('buttonClicked', index);
      if (fn) {
        fn();
      }
    },
    /**
     * Emit even to close dialog
     */
    close() {
      this.$emit('update:modelValue', false);
    }
  },
  /* DEMO META DATA */
  ...metadata
};
