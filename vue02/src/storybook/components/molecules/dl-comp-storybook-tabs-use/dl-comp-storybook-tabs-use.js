import theComponent from '@/components/molecules/dl-ui-tabs';
import DlUiTab from '@/components/atoms/dl-ui-tab';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-tabs-use',
  components : {
    theComponent,
    DlUiTab,
    DlCompStorybookDemoTemplate,
    DlUiTabs : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tabs"*/ '@/components/molecules/dl-ui-tabs'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        props : [],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-tabs',
          options : [
            { name : 'Default', value : 'dl-ui-tabs' },
            { name : 'Custom', value : 'custom-tabs' }
          ]
        }
      },
      component : theComponent
    };
  }
};
