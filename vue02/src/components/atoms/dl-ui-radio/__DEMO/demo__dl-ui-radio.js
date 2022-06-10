// A generic import name will ease next developments
import theComponent from '..';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-radio__DEMO',
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
      itemsMock : [
        {
          value    : 'Item1',
          label    : 'Item1',
          disabled : false
        },
        {
          value    : 'Item2',
          label    : 'Item2',
          disabled : true
        },
        {
          value    : 'Item3',
          label    : 'Item3',
          disabled : false
        }
      ],
      playground : {
        props : [
          {
            label : 'labelOnLeft',
            type  : 'checkbox',
            value : false
          }
        ],
        value : {
          label       : 'value',
          type        : 'text',
          value       : null,
          placeholder : 'Select...',
          disabled    : 'disabled'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-radio' }
          ]
        }
      },
      component : theComponent
    };
  }
};
