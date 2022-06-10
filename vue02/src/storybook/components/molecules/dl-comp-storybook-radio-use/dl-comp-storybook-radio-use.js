import theComponent from '@/components/atoms/dl-ui-radio';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-radio-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiRadio : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-radio"*/ '@/components/atoms/dl-ui-radio'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      itemsMock : [
        {
          value    : 'Item1',
          label    : 'Item1',
          disabled : false
        },
        {
          value    : 'Item2',
          label    : 'Item2',
          disabled : true
        },
        {
          value    : 'Item3',
          label    : 'Item3',
          disabled : false
        }
      ],
      playground : {
        props : [
          {
            label : 'labelOnLeft',
            type  : 'checkbox',
            value : false
          }
        ],
        value : {
          label       : 'value',
          type        : 'text',
          value       : null,
          placeholder : 'Select...',
          disabled    : 'disabled'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-radio' }
          ]
        }
      },
      component : theComponent
    };
  }
};
