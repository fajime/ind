import theComponent from '@/components/atoms/dl-ui-checkbox';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent, nextTick } from 'vue';

export default {
  name       : 'dl-comp-storybook-switch-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiCheckbox : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-checkbox"*/ '@/components/atoms/dl-ui-checkbox'))
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
        slots : [{
          label       : 'etiqueta',
          type        : 'text',
          value       : 'Label',
          placeholder : 'Etiqueta del label...'
        }],
        props : [{
          label : 'labelOnLeft',
          type  : 'checkbox',
          value : false
        }, {
          label : 'disabled',
          type  : 'checkbox',
          value : false

        }, {
          label : 'indeterminate',
          type  : 'checkbox',
          value : false
        }, {
          label   : 'icon',
          type    : 'select',
          value   : 'dl-ids-icon-check-select',
          options : []
        }, {
          label   : 'indeterminateIcon',
          type    : 'select',
          value   : 'dl-ids-icon-check-indet',
          options : []
        }],
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
          value   : 'dl-ui-checkbox',
          options : [
            { name : 'Default', value : 'dl-ui-checkbox' },
            { name : 'Custom', value : 'custom-checkbox' }
          ]
        }
      },
      component : theComponent
    };
  }
};
