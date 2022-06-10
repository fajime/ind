import theComponent from '@/components/atoms/dl-ui-switch';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-switch-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiSwitch : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-action-button"*/ '@/components/atoms/dl-ui-switch'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        props : [{
          label : 'disabled',
          type  : 'checkbox',
          value : false
        }],
        value : {
          label : 'value',
          type  : 'checkbox',
          value : false
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-switch',
          options : [
            { name : 'Default', value : 'dl-ui-switch' },
            { name : 'Custom', value : 'custom-switch' }
          ]
        }
      },
      component : theComponent
    };
  }
};
