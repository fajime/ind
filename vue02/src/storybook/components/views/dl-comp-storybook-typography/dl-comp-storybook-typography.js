import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-typography',
  components : {
    DlUiIcon            : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icon" */ '@/components/atoms/dl-ui-icon')),
    DlCompStorybookCard : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-card" */ '@/storybook/components/molecules/dl-comp-storybook-card'))
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      resources : [
        {
          icon : {
            type  : 'dl-ui-icon-figma',
            align : 'right'
          },
          header : 'Librerías de diseño',
          body   : '',
          action : {
            text : 'Descargar',
            link : ''
          }
        }
      ]
    };
  }
};
