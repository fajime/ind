import theComponent from '@/components/molecules/dl-ui-footer';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-footer-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiFooter : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-footer"*/ '@/components/molecules/dl-ui-footer'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        slots : [
          {
            label       : 'contenido',
            type        : 'text',
            value       : '',
            placeholder : 'Contenido...'
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-footer',
          options : [
            { name : 'Default', value : 'dl-ui-footer' },
            { name : 'Custom', value : 'custom-footer' }
          ]
        }
      },
      component : theComponent
    };
  }
};
