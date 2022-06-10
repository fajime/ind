// A generic import name will ease next developments
import { nextTick } from 'vue';
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-tag',
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
        this.playground.props[0].options.push({ name : icon, value : icon });
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
            label   : 'icon',
            type    : 'select',
            value   : 'dl-ids-icon-user-single-outlined',
            options : []
          }, {
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
            label : 'id',
            type  : 'text',
            value : 'id saved'
          },
          {
            label : 'closeButton',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'stroke',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'selectable',
            type  : 'checkbox',
            value : false
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Info', value : 'dl-ui-tag--info' },
            { name : 'Success', value : 'dl-ui-tag--success' },
            { name : 'Warning', value : 'dl-ui-tag--warning' },
            { name : 'Danger', value : 'dl-ui-tag--danger' },
            { name : 'Custom', value : 'custom-tag' }
          ]
        }
      },
      component : theComponent
    };
  }
};
