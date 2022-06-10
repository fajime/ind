// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-card',
  components : {
    theComponent,
    DlCompKitDemoTemplate
  },
  mixins : [mixinPlayground],
  /**
   * override
   * @override
   */
  mounted() {
    this.$nextTick(() => {
      // load icon set from icon set
      const iconSet = Array.from(
        document.querySelectorAll('#dl-ui-icons-set symbol')
      ).map(node => node.id);
      this.playground.props[1].options.push({
        name  : ' Default no icon ',
        value : ''
      });
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
        props : [
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
            label : 'content',
            type  : 'text',
            value :
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            placeholder : 'Contenido del cuerpo...'
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
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
