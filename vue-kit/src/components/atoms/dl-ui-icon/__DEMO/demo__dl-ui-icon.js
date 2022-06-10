// A generic import name will ease next developments
import { nextTick } from 'vue';
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-icon',
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
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
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
