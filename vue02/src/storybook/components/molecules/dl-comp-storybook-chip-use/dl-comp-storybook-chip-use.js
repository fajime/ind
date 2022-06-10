import theComponent from '@/components/atoms/dl-ui-tag';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent, nextTick } from 'vue';

export default {
  name       : 'dl-comp-storybook-chip-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiTag : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-tag"*/ '@/components/atoms/dl-ui-tag'))
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
            label : 'text',
            type  : 'text',
            value : '#value'
          },
          {
            label : 'value',
            type  : 'text',
            value : 'value saved'
          },
          {
            label   : 'icon',
            type    : 'select',
            value   : 'dl-ids-icon-user-single-outlined',
            options : []
          },
          {
            label : 'id',
            type  : 'text',
            value : 'id saved'
          },
          {
            label : 'label',
            type  : 'text',
            value : 'Etiqueta'
          },
          {
            label : 'closeButton',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'selectable',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'stroke',
            type  : 'checkbox',
            value : false
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-chip',
          options : [
            { name : 'Default', value : 'dl-ui-chip' },
            { name : 'Info', value : 'dl-ui-chip--info' },
            { name : 'Success', value : 'dl-ui-chip--success' },
            { name : 'Warning', value : 'dl-ui-chip--warning' },
            { name : 'Danger', value : 'dl-ui-chip--danger' },
            { name : 'Custom', value : 'custom-chip' }
          ]
        }
      },
      component : theComponent
    };
  }
};
