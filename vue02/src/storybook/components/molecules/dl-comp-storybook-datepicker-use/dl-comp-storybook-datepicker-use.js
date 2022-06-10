import theComponent from '@/components/molecules/dl-ui-datepicker';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-datepicker-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiDatepicker : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-datepicker"*/ '@/components/molecules/dl-ui-datepicker'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        slots : [],
        value : {
          label       : 'value',
          type        : 'text',
          value       : '',
          placeholder : 'Date selected',
          disabled    : 'disabled'
        },
        props : [
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
          }, {
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
            label       : 'label',
            type        : 'text',
            value       : 'Label',
            placeholder : 'Texto de label'
          },
          {
            label       : 'help',
            type        : 'text',
            value       : 'Ayuda',
            placeholder : 'Texto de ayuda'
          },
          {
            label       : 'locale',
            type        : 'text',
            value       : 'es-ES',
            placeholder : 'locale a utilizar'
          },
          {
            label   : 'selectionMode',
            type    : 'select',
            value   : 'single',
            options : [
              { name : 'single', value : 'single' },
              { name : 'multiple', value : 'multiple' },
              { name : 'range', value : 'range' }
            ]
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-datepicker',
          options : [
            { name : 'Default', value : 'dl-ui-datepicker' },
            { name : 'Custom', value : 'custom-datepicker' }
          ]
        }
      },
      component : theComponent
    };
  }
};
