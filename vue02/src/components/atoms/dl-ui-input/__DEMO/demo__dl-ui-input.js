// A generic import name will ease next developments
import { nextTick } from 'vue';
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-input',
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
        .filter(nodeId => nodeId.endsWith('outlined')); // dessign system use 'stroke' for icons

      const idxIconLeft = this.playground.props.findIndex(p => p.label === 'leftIcon');
      const idxIconRight = this.playground.props.findIndex(p => p.label === 'rightIcon');

      icons.forEach(icon => {
        this.playground.props[idxIconLeft].options.push({ name : icon, value : icon });
        this.playground.props[idxIconRight].options.push({ name : icon, value : icon });
      });

      // optional, null
      this.playground.props[idxIconLeft].options.unshift({ name : 'none', value : null });  // leftIcon
      this.playground.props[idxIconRight].options.unshift({ name : 'none', value : null });  // rightIcon

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
            label : 'error',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'required',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'readonly',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'maxLength',
            type  : 'number',
            value : 100
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
            label : 'label',
            type  : 'text',
            value : 'Etiqueta'
          },
          {
            label : 'help',
            type  : 'text',
            value : 'Texto de ayuda'
          },
          {
            label : 'placeholder',
            type  : 'text',
            value : 'Placeholder...'
          }
        ],
        value : {
          label : 'value',
          type  : 'text',
          value : 'Texto del input'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Extra Small', value : 'dl-ui-input--extra-small' },
            { name : 'Small', value : 'dl-ui-input--small' },
            { name : 'Medium', value : 'dl-ui-input--medium' },
            { name : 'Large', value : 'dl-ui-input--large' },
            { name : 'Custom', value : 'custom-input' }
          ]
        }
      },
      component : theComponent
    };
  }
};
