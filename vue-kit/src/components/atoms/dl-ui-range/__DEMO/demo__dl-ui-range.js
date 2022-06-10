// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-range',
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
            label : 'min',
            type  : 'number',
            value : 0
          },
          {
            label : 'max',
            type  : 'number',
            value : 100
          },
          {
            label : 'step',
            type  : 'number',
            value : 1
          },
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          }
        ],
        value : {
          label : 'value',
          type  : 'number',
          value : 60
        },
        style : {
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-range' }
          ]
        }
      },
      component : theComponent
    };
  }
};
