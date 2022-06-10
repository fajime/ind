import dlUiRipple from '../../../directives/dl-ui-ripple';
import DlUiIcon from '../dl-ui-icon';
import DlUiAccordion from '../../molecules/dl-ui-accordion';
import DlUiScrollpanel from '../../atoms/dl-ui-scrollpanel';

import metadata from './_metadata';
export default {
  name       : 'dl-ui-button',
  components : {
    'dl-ui-icon' : DlUiIcon, DlUiAccordion, DlUiScrollpanel
  },
  directives : { 'dl-ui-ripple' : dlUiRipple },
  props      : {
    /**
     * Color
     */
    color : {
      type    : String,
      default : '#E9FCFF',
      desc    : 'Color del Ripple.'
    }
  },
  // DEMO META DATA
  ...metadata
};
