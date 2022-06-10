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
            label   : 'color',
            type    : 'select',
            value   : '#9994',
            options : [
              { name : 'Gray', value : '#9994' },
              { name : 'Green', value : '#0904' },
              { name : 'Orange', value : '#f808' },
              { name : 'Purple', value : '#9094' }
            ]
          }
        ]
      },
      component : theComponent
    };
  }
};
