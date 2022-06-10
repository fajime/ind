// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';
import DlUiAvatar from '../../dl-ui-avatar';
import DlUiButton from '../../dl-ui-button';
import DlUiIcon from '../../dl-ui-icon';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-badge',
  components : {
    theComponent,
    DlCompKitDemoTemplate,
    DlUiAvatar,
    DlUiIcon,
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
        props : [
          {
            label : 'text',
            type  : 'text',
            value : '3+'
          },
          {
            label   : 'shape',
            type    : 'select',
            value   : 'square',
            options : [
              { name : 'Default', value : 'square' },
              { name : 'Circle', value : 'circle' },
              { name : 'Point', value : 'point' }
            ]
          }
        ],

        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Small', value : 'dl-ui-badge--info-small' },
            { name : 'Medium', value : 'dl-ui-badge--info-medium' },
            { name : 'Large', value : 'dl-ui-badge--info-large' },
            { name : 'Large-Danger', value : 'dl-ui-badge--danger-large' },
            { name : 'Info', value : 'dl-ui-badge--info' },
            { name : 'Success', value : 'dl-ui-badge--success' },
            { name : 'Warning', value : 'dl-ui-badge--warning' },
            { name : 'Danger', value : 'dl-ui-badge--danger' },
            { name : 'Custom', value : 'custom-badge' }
          ]
        }
      },
      component : theComponent,
      circle    : false
    };
  },
  computed : {

    /**
   * shape
   * @override
   */
    shape() {
      return this.getProp('shape');
    },

    /**
   * size
   * @override
   */
    size() {
      let size = 'small';
      const style1 = this.playground.style.value;
      if (style1.indexOf('medium') > -1) {
        size = 'medium';
      }
      if (style1.indexOf('large') > -1) {
        size = 'large';
      }
      return size;
    },
    /**
   * type
   * @override
   */
    type() {
      let type = 'info';
      const style1 = this.playground.style.value;
      if (style1.indexOf('danger') > -1) {
        type = 'danger';
      }
      if (style1.indexOf('warning') > -1) {
        type = 'warning';
      }
      if (style1.indexOf('success') > -1) {
        type = 'success';
      }
      return type;
    },

    /**
   * position
   * @override
   */
    text() {
      return this.getProp('text');
    }
  },
  methods : {

    /**
   * value props
   * @override
   */
    getProp(label) {
      const index = this.playground.props.findIndex( e => e.label === label);
      if (index > -1) {
        return this.playground.props[index].value;
      }
      return '';
    }
  }
};
