// A generic import name will ease next developments
import { nextTick } from 'vue';
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-button',
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
      // optional, null
      this.playground.props[3].options.unshift({ name : 'none', value : null });  // leftIcon
      this.playground.props[4].options.unshift({ name : 'none', value : null });  // rightIcon
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
            label   : 'leftIcon',
            type    : 'select',
            value   : 'dl-ids-icon-user-single-outlined',
            options : []
          },
          {
            label   : 'rightIcon',
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
            { name : 'Primary', value : 'dl-ui-button--primary' },
            { name : 'Secondary', value : 'dl-ui-button--secondary' },
            { name : 'Tertiary', value : 'dl-ui-button--tertiary' },
            { name : 'Link', value : 'dl-ui-button--link' },
            {
              name  : 'Primary Extra Small',
              value : 'dl-ui-button--primary-extra-small'
            },
            { name : 'Primary Small', value : 'dl-ui-button--primary-small' },
            { name : 'Primary Medium', value : 'dl-ui-button--primary-medium' },
            { name : 'Primary Large', value : 'dl-ui-button--primary-large' },
            {
              name  : 'Secondary Extra Small',
              value : 'dl-ui-button--secondary-extra-small'
            },
            { name : 'Secondary Small', value : 'dl-ui-button--secondary-small' },
            {
              name  : 'Secondary Medium',
              value : 'dl-ui-button--secondary-medium'
            },
            { name : 'Secondary Large', value : 'dl-ui-button--secondary-large' },
            {
              name  : 'Tertiary Extra Small',
              value : 'dl-ui-button--tertiary-extra-small'
            },
            { name : 'Tertiary Small', value : 'dl-ui-button--tertiary-small' },
            { name : 'Tertiary Medium', value : 'dl-ui-button--tertiary-medium' },
            { name : 'Tertiary Large', value : 'dl-ui-button--tertiary-large' },
            {
              name  : 'Link Extra Small',
              value : 'dl-ui-button--link-extra-small'
            },
            { name : 'Link Small', value : 'dl-ui-button--link-small' },
            { name : 'Link Medium', value : 'dl-ui-button--link-medium' },
            { name : 'Link Large', value : 'dl-ui-button--link-large' },
            { name : 'Custom', value : 'custom-button' }
          ]
        }
      },
      component : theComponent
    };
  }
};
