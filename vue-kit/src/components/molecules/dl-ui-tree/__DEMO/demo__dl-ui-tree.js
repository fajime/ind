// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-menu-__DEMO-dl-ui-tree',
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
                label  : 'Carpeta 1',
                icon   : 'dl-ids-icon-folder-outlined',
                opened : true,
                fn     : () => {
                  // eslint-disable-next-line no-console
                  console.log('Trace "file 1"');
                },
                children : [
                  {
                    label : 'file 1 - 1',
                    icon  : 'dl-ids-icon-document-default-outlined',
                    fn    : () => {
                    // eslint-disable-next-line no-console
                      console.log('Trace "file 1 - 1"');
                    }
                  },
                  {
                    label : 'file 1 - 2',
                    icon  : 'dl-ids-icon-document-default-outlined',
                    fn    : () => {
                    // eslint-disable-next-line no-console
                      console.log('Trace "file 1 - 2"');
                    }
                  }
                ]
              },
              {
                label    : 'Carpeta 2',
                icon     : 'dl-ids-icon-folder-outlined',
                children : [
                  {
                    label : 'file 2 - 1',
                    icon  : 'dl-ids-icon-document-default-outlined',
                    fn    : () => {
                    // eslint-disable-next-line no-console
                      console.log('Trace "file 2 - 1"');
                    }
                  },
                  {
                    label : 'file 2 - 2',
                    icon  : 'dl-ids-icon-document-default-outlined',
                    fn    : () => {
                    // eslint-disable-next-line no-console
                      console.log('Trace "file 2 - 2"');
                    }
                  },
                  {
                    label : 'file 2 - 3',
                    icon  : 'dl-ids-icon-document-default-outlined',
                    fn    : () => {
                    // eslint-disable-next-line no-console
                      console.log('Trace "file 2 - 3"');
                    }
                  }
                ]
              },
              {
                label : 'file 1',
                icon  : 'dl-ids-icon-document-default-outlined',
                fn    : () => {
                // eslint-disable-next-line no-console
                  console.log('Trace "file 1"');
                }
              },
              {
                label    : 'Carpeta 3',
                icon     : 'dl-ids-icon-folder-outlined',
                children : [
                  {
                    label : 'file 3 - 1',
                    icon  : 'dl-ids-icon-document-default-outlined',
                    fn    : () => {
                    // eslint-disable-next-line no-console
                      console.log('Trace "file 3 - 1"');
                    }
                  },
                  {
                    label    : 'Carpeta 4',
                    icon     : 'dl-ids-icon-folder-outlined',
                    children : [
                      {
                        label : 'file 4 - 1',
                        icon  : 'dl-ids-icon-document-default-outlined',
                        fn    : () => {
                        // eslint-disable-next-line no-console
                          console.log('Trace "file 4 - 1"');
                        }
                      },
                      {
                        label : 'file 4 - 2',
                        icon  : 'dl-ids-icon-document-default-outlined',
                        fn    : () => {
                        // eslint-disable-next-line no-console
                          console.log('Trace "file 4 - 2"');
                        }
                      },
                      {
                        label : 'file 4 - 3',
                        icon  : 'dl-ids-icon-document-default-outlined',
                        fn    : () => {
                        // eslint-disable-next-line no-console
                          console.log('Trace "file 4 - 3"');
                        }
                      }
                    ]
                  },
                  {
                    label : 'file 3 - 2',
                    icon  : 'dl-ids-icon-document-default-outlined',
                    fn    : () => {
                    // eslint-disable-next-line no-console
                      console.log('Trace "file 3 - 2"');
                    }
                  },
                  {
                    label : 'file 3 - 3',
                    icon  : 'dl-ids-icon-document-default-outlined',
                    fn    : () => {
                    // eslint-disable-next-line no-console
                      console.log('Trace "file 3 - 3"');
                    }
                  }
                ]
              }
            ]
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-tree' }
          ]
        },
        slots : []
      },
      component : theComponent
    };
  }
};

