import dlUiTooltip from '../../../directives/dl-ui-tooltip';
import DlUiIcon from '../dl-ui-icon';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-button',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  directives : { 'dl-ui-tooltip' : dlUiTooltip },
  props      : {
    /**
     * Posición
     */
    position : {
      type    : String,
      default : 'top',
      desc    : 'Posición del tooltiop respecto al elemento sobre al que aparece.'
    },
    /**
     * Texto
     */
    text : {
      type    : String,
      default : '',
      desc    : 'Texto del tooltip.'
    }
  },
  // DEMO META DATA
  ...metadata
};
