// A generic import name will ease next developments
import theComponent from '..';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-checkbox-group',
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
            label : 'checkboxes',
            type  : 'hidden',
            value : [
              {
                name  : 'Checkbox1',
                value : true,
                slot  : 'Checkbox 1'
              },
              {
                name  : 'Checkbox2',
                value : true,
                slot  : 'Checkbox 2'
              },
              {
                name  : 'Checkbox3',
                value : true,
                slot  : 'Checkbox 3'
              }
            ]
          },
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'collapsible',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'collapsed',
            type  : 'checkbox',
            value : false
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-checkbox-group' }
          ]
        },
        slots : [
          {
            label       : 'Título',
            type        : 'text',
            value       : 'Contenido del padre',
            placeholder : 'Contenido del padre'
          }
        ]
      },
      component : theComponent
    };
  }
};
