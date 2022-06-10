import theComponent from '@/components/molecules/dl-ui-accordion';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-accordion-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiAccordion : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-accordion"*/ '@/components/molecules/dl-ui-accordion'))
  },
  mixins : [mixinPlayground],
  /**
   * override
   * @override
   */
  mounted() {
    this.$nextTick(() => {
      // load icon set from icon set
      const icons = Array.from(document.querySelectorAll('#dl-ui-icons-set symbol')).map(node => node.id);
      icons.forEach(icon => {
        this.playground.props[2].options.push({ name : icon, value : icon });
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
        props :
          [
            {
              label : 'show',
              type  : 'checkbox',
              value : false
            },
            {
              label : 'headerClickable',
              type  : 'checkbox',
              value : true
            },
            {
              label   : 'icon',
              type    : 'select',
              value   : 'dl-ids-icon-user-single-outlined',
              options : []
            },
            {
              label : 'title',
              type  : 'text',
              value : 'Título'
            },
            {
              label : 'description',
              type  : 'text',
              value : 'Descripción'
            }
          ],
        slots : [
          {
            label       : 'content',
            type        : 'text',
            value       : '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
            placeholder : 'Contenido cuerpo...'
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-accordion',
          options : [
            { name : 'Default', value : 'dl-ui-accordion' },
            { name : 'Custom', value : 'custom-accordion' }
          ]
        }
      },
      component : theComponent
    };
  }
};
