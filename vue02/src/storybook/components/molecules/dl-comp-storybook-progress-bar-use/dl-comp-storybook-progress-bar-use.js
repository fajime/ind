import theComponent from '@/components/atoms/dl-ui-progress-bar';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-progress-bar-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiProgressBar : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-progress-bar"*/ '@/components/atoms/dl-ui-progress-bar'))
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
            label       : 'min',
            type        : 'number',
            value       : 0,
            placeholder : 'Mínimo...'
          },
          {
            label       : 'max',
            type        : 'number',
            value       : 100,
            placeholder : 'Máximo...'
          }
        ],
        value : {
          label       : 'value',
          type        : 'number',
          value       : 60,
          placeholder : 'valor'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-progress-bar',
          options : [
            { name : 'Default', value : 'dl-ui-progress-bar' },
            { name : 'Custom', value : 'custom-progress-bar' }
          ]
        }
      },
      component : theComponent
    };
  }
};
