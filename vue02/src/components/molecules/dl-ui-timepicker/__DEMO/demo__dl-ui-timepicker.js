// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-timepicker',
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
          placeholder : 'Time selected',
          disabled    : 'disabled'
        },
        props : [
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          },
          {
            label       : 'locale',
            type        : 'text',
            value       : 'es-ES',
            placeholder : 'locale a utilizar'
          },
          {
            label   : 'timeFormat',
            type    : 'select',
            value   : '24hour',
            options : [
              { name : '24hour', value : '24hour' },
              { name : '12hour', value : '12hour' }
            ]
          },
          {
            label       : 'timeSeparator',
            type        : 'text',
            value       : ':',
            placeholder : `Separador a utilizar`
          },
          {
            label       : 'intervalMinutes',
            type        : 'number',
            value       : 5,
            placeholder : `Incrementar o decramentar los minutos`
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-timepicker' }
          ]
        }
      },
      component : theComponent
    };
  }
};
