import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-avatar',
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
            label   : 'type',
            type    : 'select',
            value   : 'letter',
            options : [
              { name : 'letter', value : 'letter' },
              { name : 'icon', value : 'icon' },
              { name : 'image', value : 'image' }
            ]
          },

          {
            label : 'source',
            type  : 'text',
            value : 'DL'
          },
          {
            label   : 'shape',
            type    : 'select',
            value   : 'square',
            options : [
              { name : 'Default', value : 'square' },
              { name : 'Circle', value : 'circle' }
            ]
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Small', value : 'dl-ui-avatar--small' },
            { name : 'Medium', value : 'dl-ui-avatar--medium' },
            { name : 'Large', value : 'dl-ui-avatar--large' },
            { name : 'Custom', value : 'custom-avatar' }
          ]
        }
      },
      component : theComponent
    };
  },
  methods : {

    /**
   * handleinput
   * @override
   */
    handleInput(event) {
      let value = '';
      if (event === 'icon') {
        value = 'dl-ids-icon-user-single-outlined';
      }

      if (event === 'image') {
        value = 'https://i.pravatar.cc/150?img=32';
      }

      if (event === 'letter') {
        value = 'DL';
      }

      if (value !== '') {
        const index = this.playground.props.findIndex( e => e.label === 'source');
        if (index > -1) {
          this.playground.props[index].value = value;
        }
      }

    }
  }
};
