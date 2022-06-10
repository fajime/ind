// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-dropdown',
  components : {
    theComponent,
    DlCompKitDemoTemplate
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        slots : [],
        props : [
          {
            label : 'error',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Extra Small', value : 'dl-ui-dropdown--extra-small' },
            { name : 'Small', value : 'dl-ui-dropdown--small' },
            { name : 'Medium', value : 'dl-ui-dropdown--medium' },
            { name : 'Large', value : 'dl-ui-dropdown--large' },
            { name : 'Custom', value : 'custom-dropdown' }
          ]
        }
      },
      component : theComponent
    };
  },
  mixins : [mixinPlayground]
};
