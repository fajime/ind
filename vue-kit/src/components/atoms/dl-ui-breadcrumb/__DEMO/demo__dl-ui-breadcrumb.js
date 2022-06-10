// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-breadcrumb',
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
        props : [],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Small', value : 'dl-ui-breadcrumb--small' },
            { name : 'Custom', value : 'custom-breadcrumb' }
          ]
        }
      },
      component : theComponent
    };
  },
  mixins : [mixinPlayground]
};
