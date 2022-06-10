import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-button',
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
            label : 'text',
            type  : 'text',
            value : 'Tooltip!'
          },
          {
            label   : 'position',
            type    : 'select',
            value   : 'top',
            options : [
              { name : 'Auto', value : 'auto' },
              { name : 'Top', value : 'top' },
              { name : 'Left', value : 'left' },
              { name : 'Right', value : 'right' },
              { name : 'Bottom', value : 'bottom' },
              { name : 'Top-Left', value : 'top-left' },
              { name : 'Top-Right', value : 'top-right' },
              { name : 'Bottom-Left', value : 'bottom-left' },
              { name : 'Bottom-Right', value : 'bottom-right' }
            ]
          }
        ]
      },
      component : theComponent
    };
  }
};
