import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';
import DlUiAvatar from '../../../atoms/dl-ui-avatar';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-avatar-group',
  components : {
    theComponent,
    DlCompKitDemoTemplate,
    DlUiAvatar
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
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom1', value : 'custom1-avatar-group' },
            { name : 'Custom2', value : 'custom2-avatar-group' },
            { name : 'Custom3', value : 'custom3-avatar-group' }
          ]
        }
      },
      component : theComponent
    };
  }
};
