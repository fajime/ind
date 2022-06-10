// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-switch',
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
            label : 'label',
            type  : 'text',
            value : 'Label'
          },
          {
            label : 'labelOnRight',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          }
        ],
        value : {
          label : 'value',
          type  : 'checkbox',
          value : false
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-switch' }
          ]
        }
      },
      component : theComponent
    };
  }
};
