// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-progress-bar',
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
        slots : [
          {
            label       : 'contenido',
            type        : 'text',
            value       : '',
            placeholder : 'Contenido...'
          }
        ],
        props : [
          {
            label       : 'min',
            type        : 'number',
            value       : 0,
            placeholder : 'Mínimo...'
          },
          {
            label       : 'max',
            type        : 'number',
            value       : 100,
            placeholder : 'Máximo...'
          }
        ],
        value : {
          label       : 'value',
          type        : 'number',
          value       : 60,
          placeholder : 'valor'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-progress-circle' }
          ]
        }
      },
      component : theComponent
    };
  }
};
