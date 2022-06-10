import theComponent from '@/components/molecules/dl-ui-card';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent, nextTick } from 'vue';

export default {
  name       : 'dl-comp-storybook-card-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiCard : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-card"*/ '@/components/molecules/dl-ui-card'))
  },
  mixins : [mixinPlayground],
  /**
   * override
   * @override
   */
  mounted() {
    nextTick(() => {
      // load icon set from icon set
      const iconSet = Array.from(document.querySelectorAll('#dl-ui-icons-set symbol')).map(node => node.id);
      this.playground.props[1].options.push({ name : ' Default no icon ', value : '' });
      iconSet.forEach(item => {
        this.playground.props[1].options.push({ name : item, value : item });
      });
    });
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        props :
          [
            {
              label : 'title',
              type  : 'text',
              value : 'Title'
            },
            {
              label   : 'titleIcon',
              type    : 'select',
              value   : '',
              options : []
            },
            {
              label : 'hasHeaderImage',
              type  : 'checkbox',
              value : false
            },
            {
              label : 'headerImage',
              type  : 'hidden',
              value : 'https://fondosmil.com/fondo/29496.jpg'
            },
            {
              label : 'hasButtons',
              type  : 'checkbox',
              value : false
            },
            {
              label : 'actions',
              type  : 'hidden',
              value : [
                {
                  icon : 'dl-ids-icon-user-single-outlined',
                  // eslint-disable-next-line no-console
                  fn   : () => console.log('dl-ids-icon-user-single-outlined')
                },
                {
                  icon : 'dl-ids-icon-search-outlined',
                  // eslint-disable-next-line no-console
                  fn   : () => console.log('dl-ids-icon-search-outlined')

                },
                {
                  icon : 'dl-ids-icon-stars-whole-filled',
                  // eslint-disable-next-line no-console
                  fn   : () => console.log('dl-ids-icon-stars-whole-filled')

                },
                {
                  icon : 'dl-ids-icon-home-outlined',
                  // eslint-disable-next-line no-console
                  fn   : () => console.log('dl-ids-icon-home-outlined')
                }
              ]
            },
            {
              label : 'buttonList',
              type  : 'hidden',
              value : [
                {
                  leftIcon    : '',
                  rightIcon   : '',
                  customClass : 'dl-ui-button--secondary',
                  size        : 'medium',
                  slot        : 'Cancelar',
                  // eslint-disable-next-line no-console
                  fn          : () => console.log('buttonClicked 0')
                },
                {
                  leftIcon    : '',
                  rightIcon   : '',
                  customClass : 'dl-ui-button--primary',
                  size        : 'medium',
                  slot        : 'Aceptar',
                  // eslint-disable-next-line no-console
                  fn          : () => console.log('buttonClicked 1')
                }
              ]
            }
          ],
        slots : [
          {
            label       : 'content',
            type        : 'text',
            value       : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            placeholder : 'Contenido del cuerpo...'
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-card',
          options : [
            { name : 'Default', value : 'dl-ui-card' },
            { name : 'Small', value : 'dl-ui-card--small' },
            { name : 'Large', value : 'dl-ui-card--large' },
            { name : 'Demo (custom-card)', value : 'custom-card' }
          ]
        }
      },
      component : theComponent
    };
  }
};
