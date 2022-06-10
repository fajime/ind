// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-accordion',
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
            label : 'show',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'headerClickable',
            type  : 'checkbox',
            value : true
          },
          {
            label   : 'icon',
            type    : 'select',
            value   : 'dl-ids-icon-user-single-outlined',
            options : []
          },
          {
            label : 'title',
            type  : 'text',
            value : 'Título'
          },
          {
            label : 'description',
            type  : 'text',
            value : 'Descripción'
          }
        ],
        slots : [
          {
            label : 'content',
            type  : 'text',
            value :
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
            placeholder : 'Contenido cuerpo...'
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : 'dl-ui-accordion--large' },
            { name : 'Small', value : 'dl-ui-accordion--small' },
            { name : 'Large', value : 'dl-ui-accordion--large' },
            { name : 'Custom', value : 'custom-accordion' }
          ]
        }
      },
      component : theComponent
    };
  }
};
