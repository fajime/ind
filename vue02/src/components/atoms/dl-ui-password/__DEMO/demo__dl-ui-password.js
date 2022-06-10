// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-password',
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
            label : 'showEye',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'label',
            type  : 'text',
            value : 'Contraseña'
          },
          {
            label : 'help',
            type  : 'text',
            value : 'La contraseña no es válida'
          },
          {
            label : 'placeholder',
            type  : 'text',
            value : 'Contraseña...'
          }
        ],
        value : {
          label : 'value',
          type  : 'text',
          value : 'Texto del password'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Extra Small', value : 'dl-ui-password--extra-small' },
            { name : 'Small', value : 'dl-ui-password--small' },
            { name : 'Medium', value : 'dl-ui-password--medium' },
            { name : 'Large', value : 'dl-ui-password--large' },
            { name : 'Custom', value : 'custom-password' }
          ]
        }
      },
      component : theComponent
    };
  }
};
