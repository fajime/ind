import theComponent from '@/components/molecules/dl-ui-split-panes';
import DlUiSplitPane from '@/components/atoms/dl-ui-split-pane';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-split-panes-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiSplitPane,
    DlUiSplitPanes : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-split-panes"*/ '@/components/molecules/dl-ui-split-panes'))
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
          value   : 'dl-ui-split-panes',
          options : [
            { name : 'Default', value : 'dl-ui-split-panes' },
            { name : 'Custom', value : 'custom-split-panes' }
          ]
        }
      },
      component : theComponent
    };
  }
};
