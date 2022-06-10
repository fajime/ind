// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';
import DlUiButton from '@/components/atoms/dl-ui-button';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-color-picker',
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
      showPicker  : false,
      buttonOpen  : 'Open',
      buttonClose : 'Close',
      playground  : {
        props : [
          {
            label : 'size',
            type  : 'number',
            value : 300
          },
          {
            label : 'inLine',
            type  : 'checkbox',
            value : false
          },
          {
            label   : 'format',
            type    : 'select',
            value   : 'rgba',
            options : [
              { name : 'rgba', value : 'rgba' },
              { name : 'hsla', value : 'hsla' },
              { name : 'hex', value : 'hex' }
            ]
          }
          /*  {
            label : 'idioma',
            type  : 'select',
            value : {
              'buttonClose'   : 'Close',
              'buttonOpen'    : 'Open',
              'colorSelect'   : 'Select color',
              'colorSelected' : 'Selected color'
            },
            options : [
              {
                name  : 'English', value : {
                  'buttonClose'   : 'Close',
                  'buttonOpen'    : 'Open',
                  'colorSelect'   : 'Select color',
                  'colorSelected' : 'Selected color'
                }
              },
              {
                name  : 'Español', value : {
                  'buttonClose'   : 'Cerrar',
                  'buttonOpen'    : 'Abrir',
                  'colorSelect'   : 'Selecciona color',
                  'colorSelected' : 'Color seleccionado'
                }
              }
            ]
          } */
        ],
        value : {
          label : 'value',
          type  : 'text',
          value : '#ffffffff'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-color-picker' }
          ]
        }
      },
      component : theComponent
    };
  },
  methods : {
    // eslint-disable-next-line require-jsdoc
    showColorPicker() {
      const playgrPropInline = this.playground.props.filter(p => p.label === 'inLine')[0];
      playgrPropInline.value = !playgrPropInline.value;
      this.showPicker = !this.showPicker;
    }
  }
};
