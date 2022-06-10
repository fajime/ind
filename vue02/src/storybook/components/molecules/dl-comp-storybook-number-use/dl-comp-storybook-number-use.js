import theComponent from '@/components/atoms/dl-ui-number';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-number-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiNumber : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-number"*/ '@/components/atoms/dl-ui-number'))
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
            value : 1
          },
          {
            label : 'max',
            type  : 'number',
            value : 100
          },
          {
            label : 'step',
            type  : 'number',
            value : 2
          },
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'error',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'required',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'label',
            type  : 'text',
            value : 'Etiqueta'
          },
          {
            label : 'help',
            type  : 'text',
            value : 'Texto de ayuda'
          },
          {
            label : 'placeholder',
            type  : 'text',
            value : 'Placeholder...'
          }
        ],
        value : {
          label : 'value',
          type  : 'number',
          value : undefined
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-number',
          options : [
            { name : 'Default', value : 'dl-ui-number' },
            { name : 'Extra Small', value : 'dl-ui-number--extra-small' },
            { name : 'Small', value : 'dl-ui-number--small' },
            { name : 'Medium', value : 'dl-ui-number--medium' },
            { name : 'Large', value : 'dl-ui-number--large' },
            { name : 'Custom', value : 'custom-number' }
          ]
        }
      },
      component : theComponent
    };
  }
};
