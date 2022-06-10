// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-datepicker',
  components : {
    theComponent,
    DlCompKitDemoTemplate
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
          },
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
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-datepicker' }
          ]
        }
      },
      component : theComponent
    };
  }
};
