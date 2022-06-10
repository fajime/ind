import theComponent from '@/components/atoms/dl-ui-input';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent, nextTick } from 'vue';

export default {
  name       : 'dl-comp-storybook-input-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiInput : defineAsyncComponent(() => import (/* webpackChunkName: "dl-ui-input"*/ '@/components/atoms/dl-ui-input'))
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
        this.playground.props[4].options.push({ name : icon, value : icon });
        this.playground.props[5].options.push({ name : icon, value : icon });
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
            label : 'maxlength',
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
          value   : 'dl-ui-input',
          options : [
            { name : 'Default', value : 'dl-ui-input' },
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
