import theComponent from '@/components/molecules/dl-ui-snack';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-snack-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiSnack : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-snack"*/ '@/components/molecules/dl-ui-snack'))
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
            label : 'show',
            type  : 'checkbox',
            value : true
          },
          {
            label   : 'position',
            type    : 'select',
            value   : 'relative',
            options : [
              { name : 'Relative', value : 'relative' },
              { name : 'Absolute', value : 'absolute' },
              { name : 'Fixed', value : 'fixed' }
            ]
          },
          {
            label   : 'type',
            type    : 'select',
            value   : 'default',
            options : [
              { name : 'Success', value : 'ok' },
              { name : 'Error', value : 'error' },
              { name : 'Warning', value : 'warn' },
              { name : 'Default', value : 'default' }
            ]
          },
          {
            label : 'timeout',
            type  : 'number',
            value : 0
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-snack',
          options : [
            { name : 'Default', value : 'dl-ui-snack' },
            { name : 'Custom', value : 'custom-snack' }
          ]
        }
      },
      component : theComponent
    };
  },
  methods : {
    /**
     * Child has been closed
     */
    closed() {
      this.playground.props[0].value = false;
    }
  }
};
