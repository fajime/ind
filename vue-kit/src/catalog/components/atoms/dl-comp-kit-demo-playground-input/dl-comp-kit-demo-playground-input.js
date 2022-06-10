
import DlUiSwitch from '@/components/atoms/dl-ui-switch';
import DlUiInput from '@/components/atoms/dl-ui-input';
import DlUiNumber from '@/components/atoms/dl-ui-number';
import DlUiSelect from '@/components/atoms/dl-ui-select';

export default {
  name       : 'dl-comp-kit-demo-playground-input',
  components : {
    'dl-ui-switch' : DlUiSwitch,
    'dl-ui-input'  : DlUiInput,
    'dl-ui-number' : DlUiNumber,
    'dl-ui-select' : DlUiSelect
  },
  props : {
    /** configuration of input */
    configuration : {
      type    : Object,
      default : {}
    },
    /** value of input */
    modelValue : undefined
  }
};

