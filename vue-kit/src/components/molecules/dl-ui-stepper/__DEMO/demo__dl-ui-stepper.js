// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-stepper',
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
            label   : 'mode',
            type    : 'select',
            value   : 'dot',
            options : [
              { name : 'Dot', value : 'dot' },
              { name : 'Icon', value : 'icon' },
              { name : 'Numeric', value : 'numeric' }
            ]
          },
          {
            label : 'steps',
            type  : 'hidden',
            value : [
              { idx : 0, label : 'STEP 1', iconPending : 'dl-ids-icon-lock-open-outlined', num : 1, complete : false, disabled : false, clickable : true },
              { idx : 1, label : 'STEP 2', iconPending : 'dl-ids-icon-lock-open-outlined', num : 2, complete : false, disabled : false, clickable : true },
              { idx : 2, label : 'STEP 3', iconPending : 'dl-ids-icon-lock-open-outlined', num : 3, complete : false, disabled : false, clickable : true },
              { idx : 3, label : 'STEP 4', iconPending : 'dl-ids-icon-lock-open-outlined', num : 4, complete : false, disabled : true, clickable : true }
            ]
          },
          {
            label : 'timingSyncOffset',
            type  : 'number',
            value : 50
          }
        ],
        value : {
          label       : 'value',
          type        : 'number',
          value       : 0,
          max         : 3,
          min         : 0,
          placeholder : 'valor actual...'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-stepper' }
          ]
        }
      },
      component : theComponent
    };
  }
};
