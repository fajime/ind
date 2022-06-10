import theComponent from '@/components/atoms/dl-ui-icon';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent, nextTick } from 'vue';

export default {
  name       : 'dl-comp-storybook-icon-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiIcon : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-icon"*/ '@/components/atoms/dl-ui-icon'))
  },
  mixins : [mixinPlayground],
  /**
   * override
   * @override
   */
  mounted() {
    nextTick(() => {
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
        props : [
          {
            label       : 'title',
            type        : 'text',
            value       : '',
            placeholder : 'Título...'
          },
          {
            label       : 'description',
            type        : 'text',
            value       : '',
            placeholder : 'Descripción...'
          },
          {
            label   : 'id',
            type    : 'select',
            value   : 'dl-ids-icon-user-single-outlined',
            options : []
          }
        ], style :
          {
            label   : 'estilo',
            type    : 'select',
            value   : 'dl-ui-icon',
            options : [
              { name : 'Default', value : 'dl-ui-icon' },
              { name : 'Small', value : 'dl-ui-icon--small' },
              { name : 'Medium', value : 'dl-ui-icon--medium' },
              { name : 'Large', value : 'dl-ui-icon--large' },
              { name : 'Custom', value : 'custom-icon' }
            ]
          }
      },
      component : theComponent
    };
  }
};
