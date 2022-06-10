import theComponent from '@/components/molecules/dl-ui-checkbox-group';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-checkbox-group-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiCheckboxGroup : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-checkbox-group"*/ '@/components/molecules/dl-ui-checkbox-group'))
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
          value   : 'dl-ui-checkbox-group',
          options : [
            { name : 'Default', value : 'dl-ui-checkbox-group' },
            { name : 'Custom', value : 'custom-checkbox-group' }
          ]
        },
        slots : [{
          label       : 'Título',
          type        : 'text',
          value       : 'Contenido del padre',
          placeholder : 'Contenido del padre'
        }]
      },
      component : theComponent
    };
  }
};
