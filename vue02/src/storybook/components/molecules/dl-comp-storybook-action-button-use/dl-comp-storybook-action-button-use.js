import { defineAsyncComponent, nextTick } from 'vue';
import theComponent from '@/components/atoms/dl-ui-action-button';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';

export default {
  name       : 'dl-comp-storybook-action-button-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiIcon         : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icon" */ '@/components/atoms/dl-ui-icon')),
    DlUiActionButton : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-action-button"*/ '@/components/atoms/dl-ui-action-button'))
  },
  mixins : [mixinPlayground],
  /**
   * override
   * @override
   */
  mounted() {
    nextTick(() => {
      // load icon set from icon set
      const icons = Array.from(
        document.querySelectorAll('#dl-ui-icons-set symbol')
      ).map(node => node.id);
      icons.forEach(icon => {
        this.playground.props[4].options.push({ name : icon, value : icon });
      });
    });
  },
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
            label : 'once',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'loading',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'showIconFilled',
            type  : 'checkbox',
            value : false
          },
          {
            label   : 'icon',
            type    : 'select',
            value   : 'dl-ids-icon-user-single-outlined',
            options : []
          },
          {
            label       : 'onceTime',
            type        : 'number',
            value       : 1000,
            placeholder : 'ms...'
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Small', value : 'dl-ui-action-button--small' },
            { name : 'Large', value : 'dl-ui-action-button--large' },
            { name : 'Custom', value : 'custom-action-button' }
          ]
        }
      },
      component : theComponent
    };
  }
};
