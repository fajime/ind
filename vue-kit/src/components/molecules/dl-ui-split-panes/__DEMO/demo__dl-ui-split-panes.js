// A generic import name will ease next developments
import theComponent from '../';
import DlUiSplitPanes from '../../../molecules/dl-ui-split-panes';
import DlUiSplitPane from '../../../atoms/dl-ui-split-pane';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-split-panes',
  components : {
    theComponent,
    DlCompKitDemoTemplate,
    'dl-ui-split-panes' : DlUiSplitPanes,
    'dl-ui-split-pane'  : DlUiSplitPane
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
            label   : 'displayType',
            type    : 'select',
            value   : 'vertical',
            options : [
              { name : 'vertical', value : 'vertical' },
              { name : 'horizontal', value : 'horizontal' }
            ]
          },
          {
            label : 'dblClickSplitter',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'firstSplitter',
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
            { name : 'Custom', value : 'custom-split-panes' }
          ]
        }
      },
      component : theComponent
    };
  }
};
