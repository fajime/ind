import { nextTick } from 'vue';
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-action-button',
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
      ).map(node => node.id)
        .filter(nodeId => nodeId.endsWith('outlined'));

      icons.forEach(icon => {
        this.playground.props[3].options.push({ name : icon, value : icon });
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

            { name : 'Primary', value : 'dl-ui-action-button--primary' },
            { name : 'Secondary', value : 'dl-ui-action-button--secondary' },
            { name : 'Tertiary', value : 'dl-ui-action-button--tertiary' },
            { name : 'Primary Extra Small', value : 'dl-ui-action-button--primary-extra-small' },
            { name : 'Primary Small', value : 'dl-ui-action-button--primary-small' },
            { name : 'Primary Medium', value : 'dl-ui-action-button--primary-medium' },
            { name : 'Primary Large', value : 'dl-ui-action-button--primary-large' },
            { name : 'Secondary Extra Small', value : 'dl-ui-action-button--secondary-extra-small' },
            { name : 'Secondary Small', value : 'dl-ui-action-button--secondary-small' },
            { name : 'Secondary Medium', value : 'dl-ui-action-button--secondary-medium' },
            { name : 'Secondary Large', value : 'dl-ui-action-button--secondary-large' },
            { name : 'Tertiary Extra Small', value : 'dl-ui-action-button--tertiary-extra-small' },
            { name : 'Tertiary Small', value : 'dl-ui-action-button--tertiary-small' },
            { name : 'Tertiary Medium', value : 'dl-ui-action-button--tertiary-medium' },
            { name : 'Tertiary Large', value : 'dl-ui-action-button--tertiary-large' },

            { name : 'Custom', value : 'custom-action-button' }
          ]
        }
      },
      component : theComponent
    };
  }
};
