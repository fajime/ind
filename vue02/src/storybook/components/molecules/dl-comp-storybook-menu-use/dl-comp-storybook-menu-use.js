import theComponent from '@/components/molecules/dl-ui-menu';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-menu-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiMenu : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-menu"*/ '@/components/molecules/dl-ui-menu'))
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
            label : 'menu',
            type  : 'hidden',
            value : {
              label    : 'ROOT',
              children : [
                { label : 'File', leftIcon : 'dl-ids-icon-user-single-outlined' },
                { label : 'Edit', leftIcon : 'dl-ids-icon-user-single-outlined' },
                { label : 'Object', disabled : true },
                {
                  label    : 'Vector', children : [
                    { label : 'Zoom In', leftIcon : 'dl-ids-icon-calendar-default-filled' },
                    { label : 'Zoom to fit', leftIcon : 'dl-ids-icon-user-single-outlined' },
                    { label : '-' },
                    {
                      label    : 'Interface Scale', children : [
                        {
                          label    : 'Fit to page', leftIcon : 'dl-ids-icon-user-single-outlined',
                          fn       : () => {
                            // eslint-disable-next-line no-console
                            console.log('Traza de "Elemento 4"');
                          }
                        },
                        { label : 'Fit to all', leftIcon : 'dl-ids-icon-user-single-outlined' },
                        { label : 'Fit to table', leftIcon : 'dl-ids-icon-user-single-outlined', route : '/welcome' },
                        {
                          label    : 'Indra',
                          leftIcon : 'dl-ids-icon-user-single-outlined',
                          fn       : () => {
                            window.open('https://www.indracompany.com/');
                          }
                        }
                      ]
                    },
                    { label : 'Show tabs in full screen', rightIcon : 'dl-ids-icon-user-single-outlined' }
                  ]
                },
                { label : 'Plugins' }
              ]
            }
          },
          {
            label   : 'direction',
            type    : 'select',
            value   : 'horizontal',
            options : [
              { name : 'Horizontal', value : 'horizontal' },
              { name : 'Vertical', value : 'vertical' }
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
            { name : 'Small', value : 'dl-ui-menu--small' },
            { name : 'Medium', value : 'dl-ui-menu--medium' },
            { name : 'Large', value : 'dl-ui-menu--large' },
            { name : 'Custom', value : 'custom-menu' }
          ]
        },
        slots : []
      },
      component : theComponent
    };
  },
  methods : {
    /**
     * Child has been closed
     */
    closed() {
      this.playground.props[0].value = false;
    }
  }
};
