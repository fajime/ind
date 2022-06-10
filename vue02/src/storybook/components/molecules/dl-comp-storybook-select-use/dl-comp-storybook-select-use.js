import theComponent from '@/components/atoms/dl-ui-select';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-select-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiSelect : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-select"*/ '@/components/atoms/dl-ui-select'))
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
            label : 'options',
            type  : 'hidden',
            value : [
              { name : 'Australia', value : 'AU' },
              { name : 'Brazil', value : 'BR' },
              { name : 'China', value : 'CN', leftIcon : 'dl-ids-icon-user-single-outlined' },
              { name : 'Egypt', value : 'EG' },
              { name : 'France', value : 'FR', rightIcon : 'dl-ids-icon-user-single-outlined' },
              { name : 'Germany', value : 'DE' },
              { name : 'India', value : 'IN', leftIcon : 'dl-ui-icon-eye', rightIcon : 'dl-ids-icon-user-single-outlined' },
              { name : 'Japan', value : 'JP', disabled : true },
              { name : 'Spain', value : 'ES' },
              { name : 'United States', value : 'US' }
            ]
          },
          {
            label : 'placeholder',
            type  : 'text',
            value : 'Select a country'
          },
          {
            label : 'label',
            type  : 'text',
            value : 'Paises'
          },
          {
            label : 'help',
            type  : 'text',
            value : 'texto de ayuda'
          },
          {
            label : 'error',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'showClear',
            type  : 'checkbox',
            value : true
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
          value   : 'dl-ui-select',
          options : [
            { name : 'Default', value : 'dl-ui-select' },
            { name : 'Extra Small', value : 'dl-ui-select--extra-small' },
            { name : 'Small', value : 'dl-ui-select--small' },
            { name : 'Medium', value : 'dl-ui-select--medium' },
            { name : 'Large', value : 'dl-ui-select--large' },
            { name : 'Custom', value : 'custom-select' }
          ]
        }
      },
      component : theComponent
    };
  }
};
