// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-textarea',
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
            label : 'resizable',
            type  : 'checkbox',
            value : true
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
            label : 'errortext',
            type  : 'text',
            value : 'Error Description'
          },
          {
            label : 'maxChar',
            type  : 'number',
            value : 100
          },
          {
            label : 'placeholder',
            type  : 'text',
            value : 'Placeholder...'
          },
          {
            label : 'rows',
            type  : 'number',
            value : 5
          },
          {
            label : 'cols',
            type  : 'number',
            value : 30
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
            { name : 'Extra Small', value : 'dl-ui-textarea--extra-small' },
            { name : 'Small', value : 'dl-ui-textarea--small' },
            { name : 'Medium', value : 'dl-ui-textarea--medium' },
            { name : 'Large', value : 'dl-ui-textarea--large' },
            { name : 'Custom', value : 'custom-textarea' }
          ]
        }
      },
      component : theComponent
    };
  }
};
