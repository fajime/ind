import theComponent from '@/components/atoms/dl-ui-tooltip';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-tooltip-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiTooltip : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-tooltip"*/ '@/components/atoms/dl-ui-tooltip')),
    DlUiButton  : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-button"*/ '@/components/atoms/dl-ui-button'))
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
              { name : 'Top', value : 'top' },
              { name : 'Left', value : 'left' },
              { name : 'Right', value : 'right' },
              { name : 'Bottom', value : 'bottom' }
            ]
          }
        ]
      },
      component : theComponent
    };
  }
};
