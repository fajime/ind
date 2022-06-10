import theComponent from '@/components/molecules/dl-ui-rating';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-rating-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiRating : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-rating"*/ '@/components/molecules/dl-ui-rating'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        props :
          [
            {
              label : 'disabled',
              type  : 'checkbox',
              value : false
            },
            {
              label : 'readOnly',
              type  : 'checkbox',
              value : false
            },
            {
              label       : 'stars',
              type        : 'number',
              value       : 5,
              placeholder : ''
            },
            {
              label : 'showCancel',
              type  : 'checkbox',
              value : false
            }
          ],
        value : {
          label : 'value',
          type  : 'number',
          value : 3
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-rating',
          options : [
            { name : 'Default', value : 'dl-ui-rating' },
            { name : 'Custom', value : 'custom-rating' }
          ]
        }
      },
      component : theComponent
    };
  }
};
