import theComponent from '@/components/atoms/dl-ui-progress-circle';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-switch-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiProgressCircle : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-progress-circle"*/ '@/components/atoms/dl-ui-progress-circle'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        slots : [
          {
            label       : 'contenido',
            type        : 'text',
            value       : '',
            placeholder : 'Contenido...'
          }
        ],
        props : [{
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
        }],
        value : {
          label       : 'value',
          type        : 'number',
          value       : 60,
          placeholder : 'valor'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-progress-circle',
          options : [
            { name : 'Default', value : 'dl-ui-progress-circle' },
            { name : 'Custom', value : 'custom-progress-circle' }
          ]
        }
      },
      component : theComponent
    };
  }
};
