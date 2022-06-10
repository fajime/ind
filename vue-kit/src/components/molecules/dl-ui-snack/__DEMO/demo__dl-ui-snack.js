// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-snack',
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
            label : 'show',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'showIcon',
            type  : 'checkbox',
            value : false
          },
          {
            label   : 'text',
            type    : 'select',
            value   : 'This text is passed like string',
            options : [
              { name : 'Html text', value : 'This text is passed like string' },
              { name : 'One line', value : ['This text is passed array with one string item'] },
              { name : 'Two lines', value : ['This text is passed array with two string item', 'I\'m the second string item'] }
            ]
          },
          {
            label   : 'position',
            type    : 'select',
            value   : 'relative',
            options : [
              { name : 'Relative', value : 'relative' },
              { name : 'Absolute', value : 'absolute' },
              { name : 'Fixed', value : 'fixed' }
            ]
          },
          {
            label   : 'type',
            type    : 'select',
            value   : 'default',
            options : [
              { name : 'Success', value : 'ok' },
              { name : 'Error', value : 'error' },
              { name : 'Warning', value : 'warn' },
              { name : 'Default', value : 'default' }
            ]
          },
          {
            label : 'timeout',
            type  : 'number',
            value : 0
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-snack' }
          ]
        }
      },
      component : theComponent
    };
  }
};
