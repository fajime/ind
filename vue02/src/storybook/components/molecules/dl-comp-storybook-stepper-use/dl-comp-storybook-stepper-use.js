import theComponent from '@/components/molecules/dl-ui-stepper';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-stepper-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiStepper : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-stepper"*/ '@/components/molecules/dl-ui-stepper'))
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
            label       : 'steps',
            type        : 'number',
            value       : '4',
            placeholder : 'Número de pasos...'
          },
          {
            label : 'startPointCompleted',
            type  : 'checkbox',
            value : true
          }
        ],
        value : {
          label       : 'value',
          type        : 'number',
          value       : '1',
          placeholder : 'valor actual...'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-stepper',
          options : [
            { name : 'Default', value : 'dl-ui-stepper' },
            { name : 'Custom', value : 'custom-stepper' }
          ]
        }
      },
      component : theComponent
    };
  }
};
