import theComponent from '@/components/molecules/dl-ui-header';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-header-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiHeader : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-header"*/ '@/components/molecules/dl-ui-header'))
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
            label : 'leftImgLink',
            type  : 'text',
            value : 'http://vuejs.org'
          },
          {
            label : 'rightImgLink',
            type  : 'text',
            value : 'http://google.com'
          }
        ],
        slots : [
          {
            label       : 'versión',
            type        : 'text',
            value       : '<span style="font-family: Arial;font-weight: bold;font-size: 7px;line-height: 8px;color: #41586E;">v. 2.0.0.des</span>',
            placeholder : 'Contenido...'
          },
          {
            label : 'sesión',
            type  : 'text',
            value : '<span style="font-family: Arial;font-style: normal;font-weight: normal;font-size: 10px;line-height: 12px;">Alberto Rodriguez Álvarez</span>&nbsp;&nbsp;' +
              '<span style="font-family: Arial;font-weight: bold;font-size: 12px;line-height: 14px;">Cerrar sesión</span>',
            placeholder : 'Contenido...'
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-header',
          options : [
            { name : 'Default', value : 'dl-ui-header' },
            { name : 'Custom', value : 'custom-header' }
          ]
        }
      },
      component : theComponent
    };
  }
};
