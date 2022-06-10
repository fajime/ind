import theComponent from '@/components/atoms/dl-ui-listbox';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-chip-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiListbox : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-listbox"*/ '@/components/atoms/dl-ui-listbox'))
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
              {
                name     : 'China',
                value    : 'CN',
                leftIcon : 'dl-ids-icon-user-single-outlined'
              },
              { name : 'Egypt', value : 'EG' },
              {
                name      : 'France',
                value     : 'FR',
                rightIcon : 'dl-ids-icon-user-single-outlined'
              },
              { name : 'Germany', value : 'DE' },
              {
                name      : 'India',
                value     : 'IN',
                leftIcon  : 'dl-ids-icon-user-single-outlined',
                rightIcon : 'dl-ids-icon-user-single-outlined'
              },
              { name : 'Japan', value : 'JP', disabled : true },
              { name : 'Spain', value : 'ES' },
              { name : 'United States', value : 'US' }
            ]
          },
          {
            label : 'multiple',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'visibleItems',
            type  : 'number',
            value : 5
          }
        ],
        value : {
          label : 'value',
          type  : 'hidden',
          value : ['BR']
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'extra small', value : 'dl-ui-listbox--extra-small' },
            { name : 'small', value : 'dl-ui-listbox--small' },
            { name : 'medium', value : 'dl-ui-listbox--medium' },
            { name : 'large', value : 'dl-ui-listbox--large' },
            { name : 'Custom', value : 'custom-listbox' }
          ]
        }
      },
      component : theComponent
    };
  }
};
