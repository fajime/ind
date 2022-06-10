// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';
import DlUiButton from '../../../atoms/dl-ui-button';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-dialog',
  components : {
    theComponent,
    DlCompKitDemoTemplate,
    DlUiButton
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        props : [ {
          label : 'title',
          type  : 'text',
          value : 'Titulo'
        }, {
          label : 'modal',
          type  : 'checkbox',
          value : true
        }, {
          label : 'centered',
          type  : 'checkbox',
          value : true
        }, {
          label : 'fitToContent',
          type  : 'checkbox',
          value : false
        }, {
          label : 'closable',
          type  : 'checkbox',
          value : true
        }, {
          label : 'buttonList',
          type  : 'hidden',
          value : [{
            leftIcon    : '',
            rightIcon   : '',
            customClass : 'dl-ui-button--secondary',
            size        : 'medium',
            slot        : 'Aceptar',
            fn          : () => {
              // eslint-disable-next-line no-console
              console.log('buttonClicked 0');
              this.playground.value.value = false;
            }
          }]
        }],
        value : {
          label : 'value',
          type  : 'hidden',
          value : false
        },
        slots : [
          {
            label : 'contenido',
            type  : 'text',
            value :
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            placeholder : 'Cuerpo del Dialogo'
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-dialog' }
          ]
        }
      },
      component : theComponent
    };
  },
  methods : {
    // eslint-disable-next-line require-jsdoc
    openDialog() {
      this.playground.value.value = true;
    }
  }
};
