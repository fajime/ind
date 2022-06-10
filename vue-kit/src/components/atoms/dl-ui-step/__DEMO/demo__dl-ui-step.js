// A generic import name will ease next developments
import theComponent from '../';
import { nextTick } from 'vue';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-step',
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
        this.playground.props[7].options.push({ name : icon, value : icon });
      });
      this.playground.props[7].options.unshift({ name : 'None', value : null });
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
            label : 'index',
            type  : 'number',
            value : 1
          }, {
            label : 'label',
            type  : 'text',
            value : 'Label'
          },
          {
            label   : 'mode',
            type    : 'select',
            value   : 'dot',
            options : [
              { name : 'Dot', value : 'dot' },
              { name : 'Icon', value : 'icon' },
              { name : 'Numeric', value : 'numeric' }
            ]
          }, {
            label   : 'iconPending',
            type    : 'select',
            value   : 'dl-ids-icon-lock-open-outlined',
            options : []
          },
          {
            label       : 'num',
            type        : 'number',
            value       : 1,
            placeholder : 'num...'
          }, {
            label : 'current',
            type  : 'checkbox',
            value : true
          }, {
            label : 'complete',
            type  : 'checkbox',
            value : false
          }, {
            label   : 'iconComplete',
            type    : 'select',
            value   : 'dl-ids-icon-lock-close-filled',
            options : []
          }, {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          }, {
            label : 'clickable',
            type  : 'checkbox',
            value : true
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-step' }
          ]
        }
      },
      component : theComponent
    };
  }
};
