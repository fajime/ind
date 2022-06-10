import theComponent from '@/components/atoms/dl-ui-password';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-password-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiPassword : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-password"*/ '@/components/atoms/dl-ui-password'))
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
            label : 'showEye',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'label',
            type  : 'text',
            value : 'Contraseña'
          },
          {
            label : 'help',
            type  : 'text',
            value : 'La contraseña no es válida'
          },
          {
            label : 'placeholder',
            type  : 'text',
            value : 'Contraseña...'
          }
        ],
        value : {
          label : 'value',
          type  : 'text',
          value : 'Texto del password'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-password',
          options : [
            { name : 'Default', value : 'dl-ui-password' },
            { name : 'Extra Small', value : 'dl-ui-password--extra-small' },
            { name : 'Small', value : 'dl-ui-password--small' },
            { name : 'Medium', value : 'dl-ui-password--medium' },
            { name : 'Large', value : 'dl-ui-password--large' },
            { name : 'Custom', value : 'custom-password' }
          ]
        }
      },
      component : theComponent
    };
  }
};
