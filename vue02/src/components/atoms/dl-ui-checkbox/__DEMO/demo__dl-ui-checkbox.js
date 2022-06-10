// A generic import name will ease next developments
import { nextTick } from 'vue';
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-checkbox',
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
      const icons = Array.from(
        document.querySelectorAll('#dl-ui-icons-set symbol')
      ).map(node => node.id);
      icons.forEach(icon => {
        this.playground.props[3].options.push({ name : icon, value : icon });
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
        slots : [
          {
            label       : 'Etiqueta',
            type        : 'text',
            value       : 'Label',
            placeholder : 'Etiqueta del checkbox, en slot.'
          }
        ],
        props : [
          {
            label : 'labelOnLeft',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'indeterminate',
            type  : 'checkbox',
            value : false
          },
          {
            label   : 'icon',
            type    : 'select',
            value   : 'dl-ids-icon-ok-no_circle-filled',
            options : []
          },
          {
            label   : 'indeterminateIcon',
            type    : 'select',
            value   : 'dl-ids-icon-check-indet',
            options : []
          }
        ],
        value : {
          label : 'value',
          type  : 'checkbox',
          value : false
        },
        name : {
          label : 'name',
          type  : 'hidden',
          value : 'InputPlayground'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-checkbox' }
          ]
        }
      },
      component : theComponent
    };
  }
};
