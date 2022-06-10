// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-rating',
  components : {
    theComponent,
    DlCompKitDemoTemplate
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        props : [
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'readOnly',
            type  : 'checkbox',
            value : false
          },
          {
            label       : 'stars',
            type        : 'number',
            value       : 5,
            placeholder : ''
          },
          {
            label : 'showCancel',
            type  : 'checkbox',
            value : false
          }
        ],
        value : {
          label : 'value',
          type  : 'number',
          value : 3
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-rating' }
          ]
        }
      },
      component : theComponent
    };
  }
};
