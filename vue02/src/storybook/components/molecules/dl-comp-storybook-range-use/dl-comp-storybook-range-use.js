import theComponent from '@/components/atoms/dl-ui-range';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-switch-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiRange : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-range"*/ '@/components/atoms/dl-ui-range'))
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
            label : 'min',
            type  : 'number',
            value : 0
          },
          {
            label : 'max',
            type  : 'number',
            value : 100
          },
          {
            label : 'step',
            type  : 'number',
            value : 1
          },
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          }

        ],
        value : {
          label : 'value',
          type  : 'number',
          value : 60
        },
        style : {
          type    : 'select',
          value   : 'dl-ui-range',
          options : [
            { name : 'Default', value : 'dl-ui-range' },
            { name : 'Custom', value : 'custom-range' }
          ]
        }
      },
      component : theComponent
    };
  }
};
