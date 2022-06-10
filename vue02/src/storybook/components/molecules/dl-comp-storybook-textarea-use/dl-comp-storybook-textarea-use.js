import theComponent from '@/components/atoms/dl-ui-textarea';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-textarea-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiTextarea : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-textarea"*/ '@/components/atoms/dl-ui-textarea'))
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
            label : 'resizable',
            type  : 'checkbox',
            value : true
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
          },
          {
            label : 'rows',
            type  : 'number',
            value : 5
          },
          {
            label : 'cols',
            type  : 'number',
            value : 30
          }
        ],
        value : {
          label : 'value',
          type  : 'text',
          value : 'Texto del input'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-textarea',
          options : [
            { name : 'Default', value : 'dl-ui-textarea' },
            { name : 'Extra Small', value : 'dl-ui-textarea--extra-small' },
            { name : 'Small', value : 'dl-ui-textarea--small' },
            { name : 'Medium', value : 'dl-ui-textarea--medium' },
            { name : 'Large', value : 'dl-ui-textarea--large' },
            { name : 'Custom', value : 'custom-textarea' }
          ]
        }
      },
      component : theComponent
    };
  }
};
