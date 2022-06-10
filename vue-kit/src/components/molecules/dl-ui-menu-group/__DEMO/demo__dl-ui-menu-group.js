// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-menu-__DEMO-dl-ui-menu-group',
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
            label : 'config',
            type  : 'hidden',
            value : [
              {
                label    : 'Write trace Option 1',
                leftIcon : 'dl-ids-icon-calendar-default-filled',
                fn       : () => {
                  // eslint-disable-next-line no-console
                  console.log('Trace "Option 1"');
                }
              },
              {
                label    : 'Other trace Option 1',
                leftIcon : 'dl-ids-icon-user-single-outlined',
                fn       : () => {
                  // eslint-disable-next-line no-console
                  console.log('Other trace "Option 1"');
                }
              },
              { separator : true },
              {
                label    : 'Subitems',
                children : [
                  {
                    label    : 'Sub Item 1', leftIcon : 'dl-ids-icon-user-single-outlined',
                    fn       : () => {
                      // eslint-disable-next-line no-console
                      console.log('Sub Item 1');
                    }
                  },
                  {
                    label    : 'Sub Item 2', leftIcon : 'dl-ids-icon-user-single-outlined',
                    fn       : () => {
                      // eslint-disable-next-line no-console
                      console.log('Sub Item 2');
                    }
                  },
                  {
                    label    : 'Sub Item 3', leftIcon : 'dl-ids-icon-user-single-outlined',
                    fn       : () => {
                      // eslint-disable-next-line no-console
                      console.log('Sub Item 3');
                    }
                  }
                ]
              },
              { separator : true },
              {
                label     : 'Other Option',
                rightIcon : 'dl-ids-icon-user-single-outlined',
                children  : [
                  {
                    label    : 'Other Option 1', leftIcon : 'dl-ids-icon-user-single-outlined',
                    fn       : () => {
                      // eslint-disable-next-line no-console
                      console.log('Other Option 1');
                    }
                  },
                  {
                    label    : 'Other Option 2', leftIcon : 'dl-ids-icon-user-single-outlined',
                    fn       : () => {
                      // eslint-disable-next-line no-console
                      console.log('Other Option 2');
                    }
                  },
                  {
                    label    : 'Other Option 3', leftIcon : 'dl-ids-icon-user-single-outlined',
                    fn       : () => {
                      // eslint-disable-next-line no-console
                      console.log('Other Option 3');
                    }
                  },
                  {
                    label    : 'Sub Items',
                    leftIcon : 'dl-ids-icon-user-single-outlined',
                    fn       : () => {
                      // eslint-disable-next-line no-console
                      console.log('OPen Sub item in "Other Option"');
                    },
                    children : [
                      {
                        label : 'Sub Item Other Option 1',
                        fn    : () => {
                          // eslint-disable-next-line no-console
                          console.log('Sub Item Other Option 1');
                        }
                      },
                      {
                        label : 'Sub Item Other Option 2',
                        fn    : () => {
                          // eslint-disable-next-line no-console
                          console.log('Sub Item Other Option 2');
                        }
                      },
                      {
                        label : 'Sub Item Other Option 3',
                        fn    : () => {
                          // eslint-disable-next-line no-console
                          console.log('Sub Item Other Option 3');
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            label   : 'sense',
            type    : 'select',
            value   : 'topDown',
            options : [
              { name : 'Top-Down', value : 'topDown' },
              { name : 'Down-Top', value : 'downTop' }
            ]
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-menu-group' }
          ]
        },
        slots : []
      },
      component : theComponent
    };
  }
};

