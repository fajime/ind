// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-split-button',
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
      const icons = Array.from(
        document.querySelectorAll('#dl-ui-icons-set symbol')
      ).map(node => node.id);
      icons.forEach(icon => {
        this.playground.props[2].options.push({ name : icon, value : icon });
        this.playground.props[5].options.push({ name : icon, value : icon });
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
        slots : [],
        props : [
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'loading',
            type  : 'checkbox',
            value : false
          },
          {
            label   : 'leftIcon',
            type    : 'select',
            value   : 'dl-ids-icon-user-single-outlined',
            options : []
          },
          {
            label : 'mainText',
            type  : 'text',
            value : 'Desplegar'
          },
          {
            label : 'customSizeButton',
            type  : 'hidden',
            value : 'medium'
          },
          {
            label   : 'dropDownIcon',
            type    : 'select',
            value   : 'dl-ids-icon-arrows-down-single-no_circle-outlined',
            options : []
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Small', value : 'dl-ui-split-button--small' },
            { name : 'Large', value : 'dl-ui-split-button--large' },
            { name : 'Custom', value : 'custom-split-button' }
          ]
        }
      },
      component : theComponent
    };
  }
};
