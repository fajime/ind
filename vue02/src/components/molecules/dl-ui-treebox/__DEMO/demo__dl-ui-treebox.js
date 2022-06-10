// A generic import name will ease next developments
import theComponent from '..';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-treebox__DEMO',
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
            value : [
              { name : 'Australia', value : 'AU' },
              {
                name    : 'Brazil', value   : 'BR',
                options : [
                  {
                    name    : 'Sao Paulo', value   : 'SP',
                    options : [
                      { name : 'Maresias', value : 'MA' },
                      { name : 'Ilha Grande', value : 'IG' }
                    ]
                  },
                  { name : 'Río de Janeiro', value : 'RJ' }
                ]
              },
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
                leftIcon  : 'dl-ids-icon-user-single-outlined',
                rightIcon : 'dl-ids-icon-user-single-outlined'
              },
              { name : 'Japan', value : 'JP', disabled : true },
              {
                name    : 'Spain', value   : 'ES',
                options : [
                  {
                    name    : 'Andalucía', value   : 'AN', options : [
                      { name : 'Málaga', value : 'MAL' },
                      { name : 'Sevilla', value : 'SEV' }
                    ]
                  },
                  { name : 'Madrid', value : 'MD' }
                ]
              },
              { name : 'United States', value : 'US' }
            ]
          },
          {
            label : 'visibleItems',
            type  : 'number',
            value : 5
          }
        ],
        value : {
          label : 'value',
          type  : 'hidden',
          value : ['BR']
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'extra small', value : 'dl-ui-treebox--extra-small' },
            { name : 'small', value : 'dl-ui-treebox--small' },
            { name : 'medium', value : 'dl-ui-treebox--medium' },
            { name : 'large', value : 'dl-ui-treebox--large' },
            { name : 'Custom', value : 'custom-treebox' }
          ]
        }
      },
      component : theComponent
    };
  }
};
