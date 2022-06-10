// A generic import name will ease next developments
import { nextTick } from 'vue';
import theComponent from '..';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-toggle-button',
  components : {
    theComponent,
    DlCompKitDemoTemplate
  },
  mixins : [mixinPlayground],
  /**
   * override
   * @override
   */
  mounted() {
    nextTick(() => {
      // load icon set from icon set
      const icons = Array.from(document.querySelectorAll('#dl-ui-icons-set symbol')).map(node => node.id)
        .filter(nodeId => nodeId.endsWith('outlined'));

      icons.forEach(icon => {
        this.playground.props[0].options.push({ name : icon, value : icon });
        this.playground.props[1].options.push({ name : icon, value : icon });
      });
      // optional, null
      this.playground.props[0].options.unshift({ name : 'none', value : null });
      this.playground.props[1].options.unshift({ name : 'none', value : null });
    });
  },
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
            value       : 'Texto del botón',
            placeholder : 'Texto del botón...'
          }
        ],
        props : [
          {
            label   : 'icon',
            type    : 'select',
            value   : 'dl-ui-icon-uncheck-outlined',
            options : []
          },
          {
            label   : 'iconActive',
            type    : 'select',
            value   : 'dl-ui-icon-check-outlined',
            options : []
          },
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          }
        ],
        value : {
          label : 'value',
          type  : 'checkbox',
          value : false
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-toggle-button' }
          ]
        }
      },
      component : theComponent
    };
  }
};
