import theComponent from '@/components/atoms/dl-ui-multiselect';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name  : 'dl-comp-storybook-select-use',
  props : {
    /**
     * Override
     * @override
     */
    value : {
      type    : Array,
      default : () => []
    },
    /**
     * Override
     * @override
     */
    options : {
      type    : Array,
      default : () => [
        { name : 'Australia', value : 'AU' },
        { name : 'Brazil', value : 'BR' },
        { name : 'China', value : 'CN', leftIcon : 'dl-ids-icon-user-single-outlined' },
        { name : 'Egypt', value : 'EG' },
        { name : 'France', value : 'FR', rightIcon : 'dl-ids-icon-user-single-outlined' },
        { name : 'Germany', value : 'DE' },
        { name : 'India', value : 'IN', leftIcon : 'dl-ids-icon-user-single-outlined', rightIcon : 'dl-ids-icon-user-single-outlined' },
        { name : 'Japan', value : 'JP', disabled : true },
        { name : 'Spain', value : 'ES' },
        { name : 'United States', value : 'US' }
      ]
    }
  },
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiMultiselect : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-multiselect"*/ '@/components/atoms/dl-ui-multiselect'))
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
              { name : 'India', value : 'IN', leftIcon : 'dl-ids-icon-user-single-outlined', rightIcon : 'dl-ids-icon-user-single-outlined' },
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
            value : 'Texto de ayuda'
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
          value       : [],
          placeholder : 'Select...',
          disabled    : 'disabled'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-multiselect',
          options : [
            { name : 'Default', value : 'dl-ui-multiselect' },
            { name : 'Extra Small', value : 'dl-ui-multiselect--extra-small' },
            { name : 'Small', value : 'dl-ui-multiselect--small' },
            { name : 'Medium', value : 'dl-ui-multiselect--medium' },
            { name : 'Large', value : 'dl-ui-multiselect--large' },
            { name : 'Custom', value : 'custom-multiselect' }
          ]
        }
      },
      component : theComponent
    };
  }
};
