import theComponent from '@/components/atoms/dl-ui-toggle-button';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-toggle-button-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiToggleButton : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-toggle-button"*/ '@/components/atoms/dl-ui-toggle-button'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        slots : [{
          label       : 'contenido',
          type        : 'text',
          value       : 'Texto del botón',
          placeholder : 'Texto del botón...'
        }],
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
          value   : 'dl-ui-toggle-button',
          options : [
            { name : 'Default', value : 'dl-ui-toggle-button' },
            { name : 'Custom', value : 'custom-toggle-button' }
          ]
        }
      },
      component : theComponent
    };
  }
};
