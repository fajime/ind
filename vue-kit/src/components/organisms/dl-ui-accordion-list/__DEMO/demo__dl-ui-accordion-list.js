// A generic import name will ease next developments
import theComponent from '../';
import DlUiAccordion from '../../../molecules/dl-ui-accordion';
import DlUiScrollpanel from '../../../atoms/dl-ui-scrollpanel';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-accordion-list',
  components : {
    theComponent,
    DlCompKitDemoTemplate,
    DlUiAccordion,
    DlUiScrollpanel
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      show4      : true,
      playground : {
        props : [
          {
            label : 'onlyOne',
            type  : 'checkbox',
            value : false
          }
        ],
        events : {},
        style  : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-accordion-list' }
          ]
        }
      },
      component : theComponent
    };
  }

};
