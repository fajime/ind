import { defineAsyncComponent } from 'vue';
import theComponent from '@/components/atoms/dl-ui-breadcrumb';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';

export default {
  name       : 'dl-comp-storybook-breadcrumb-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiBreadcrumb : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-breadcrumb"*/ '@/components/atoms/dl-ui-breadcrumb'))
  },
  mixins : [mixinPlayground],
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
            { name : 'Custom', value : 'custom-breadcrumb' }
          ]
        }
      },
      component : theComponent
    };
  }
};
