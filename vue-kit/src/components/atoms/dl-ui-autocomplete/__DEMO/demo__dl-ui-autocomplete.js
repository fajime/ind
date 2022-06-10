// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-autocomplete__DEMO',
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
            label : 'options',
            type  : 'hidden',
            value : []
          },
          {
            label : 'placeholder',
            type  : 'text',
            value : 'Autocomplete a country'
          },
          {
            label : 'label',
            type  : 'text',
            value : 'Paises'
          },
          {
            label : 'help',
            type  : 'text',
            value : 'texto de ayuda'
          },
          {
            label : 'error',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'disabled',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'showClear',
            type  : 'checkbox',
            value : true
          }
        ],
        value : {
          label       : 'value',
          type        : 'text',
          value       : null,
          placeholder : 'Autocomplete...',
          disabled    : 'disabled'
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Extra Small', value : 'dl-ui-autocomplete--extra-small' },
            { name : 'Small', value : 'dl-ui-autocomplete--small' },
            { name : 'Medium', value : 'dl-ui-autocomplete--medium' },
            { name : 'Large', value : 'dl-ui-autocomplete--large' },
            { name : 'Custom', value : 'custom-autocomplete' }
          ]
        }
      },
      component : theComponent,
      options   : [
        { name : 'Australia', value : 'AU' },
        { name : 'Brazil', value : 'BR' },
        {
          name     : 'China',
          value    : 'CN',
          leftIcon : 'dl-ids-icon-user-single-outlined'
        },
        { name : 'Egypt', value : 'EG' },
        {
          name      : 'France',
          value     : 'FR',
          rightIcon : 'dl-ids-icon-user-single-outlined'
        },
        { name : 'Germany', value : 'DE' },
        {
          name      : 'India',
          value     : 'IN',
          leftIcon  : 'dl-ids-icon-eye-show-outlined',
          rightIcon : 'dl-ids-icon-user-single-outlined'
        },
        { name : 'Japan', value : 'JP', disabled : true },
        { name : 'Spain', value : 'ES' },
        { name : 'United States', value : 'US' }
      ],
      loading : false
    };
  },
  // eslint-disable-next-line require-jsdoc
  mounted() {
    this.playground.props.filter(p => p.label === 'options')[0].value = [ ...this.options ];
  }
};
