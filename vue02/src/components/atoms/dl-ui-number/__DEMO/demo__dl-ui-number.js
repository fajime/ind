// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-number',
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
        props : [
          {
            label : 'min',
            type  : 'number',
            value : 1
          },
          {
            label : 'max',
            type  : 'number',
            value : 100
          },
          {
            label : 'step',
            type  : 'number',
            value : 2
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
            label : 'readonly',
            type  : 'checkbox',
            value : false
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
          type  : 'number',
          value : undefined
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Extra Small', value : 'dl-ui-number--extra-small' },
            { name : 'Small', value : 'dl-ui-number--small' },
            { name : 'Medium', value : 'dl-ui-number--medium' },
            { name : 'Large', value : 'dl-ui-number--large' },
            { name : 'Custom', value : 'custom-number' }
          ]
        }
      },
      component : theComponent
    };
  }
};
