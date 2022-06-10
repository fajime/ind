// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-context-menu-__DEMO-dl-ui-context-menu',
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
            label : 'global',
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
            { name : 'Small', value : 'dl-ui-context-menu--small' },
            { name : 'Medium', value : 'dl-ui-context-menu--medium' },
            { name : 'Large', value : 'dl-ui-context-menu--large' },
            { name : 'Custom', value : 'custom-context-menu' }
          ]
        },
        slots : []
      },
      component : theComponent
    };
  },
  methods : {
    /** right click listener
     * @param {Object} event click event
     */
    onRightClick(event) {
      this.componentDemoRefs[0].show(event);
    }
  }
};

