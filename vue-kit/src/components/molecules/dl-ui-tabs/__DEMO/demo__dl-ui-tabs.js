// A generic import name will ease next developments
import theComponent from '../';
import DlUiTab from '../../../atoms/dl-ui-tab';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-tabs',
  components : {
    theComponent,
    DlCompKitDemoTemplate,
    DlUiTab
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
            label   : 'mode',
            type    : 'select',
            value   : 'window',
            options : [
              { name : 'Default', value : '' },
              { name : 'Window', value : 'window' }
            ]
          },
          {
            label : 'closable',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'allowAdd',
            type  : 'checkbox',
            value : true
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Extra Small', value : 'dl-ui-tabs--extra-small' },
            { name : 'Small', value : 'dl-ui-tabs--small' },
            { name : 'Medium', value : 'dl-ui-tabs--medium' },
            { name : 'Large', value : 'dl-ui-tabs--large' },
            { name : 'Custom', value : 'custom-tabs' }
          ]
        }
      },
      component : theComponent,
      alltabs   : []
    };
  },
  methods : {
    /**
   * Override
   * @override
   */
    handleTabRemove(tabEvent) {
      tabEvent.tab.remove();
    },
    /**
   * Override
   * @override
   */
    handleTabAdd(index) {
      const newTab = { title : `Titulo ${index}`, selected : true, index };
      this.alltabs.push(newTab);
    }

  }
};
