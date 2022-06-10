import theComponent from '@/components/molecules/dl-ui-split-button';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent, nextTick } from 'vue';

export default {
  name       : 'dl-comp-storybook-split-button-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiSplitButton : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-split-button"*/ '@/components/molecules/dl-ui-split-button'))
  },
  mixins : [mixinPlayground],
  /**
   * override
   * @override
   */
  mounted() {
    nextTick(() => {
      // load icon set from icon set
      const icons = Array.from(document.querySelectorAll('#dl-ui-icons-set symbol')).map(node => node.id);
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
        props :
          [
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
              label : 'textoBoton',
              type  : 'text',
              value : 'Desplegar'
            },
            {
              label : 'customSizeButton',
              type  : 'hidden',
              value : 'medium'
            },
            {
              label   : 'actionButtonIcon',
              type    : 'select',
              value   : 'dl-ids-icon-arrows-down-single-no_circle-outlined',
              options : []
            }
          ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-split-button',
          options : [
            { name : 'Default', value : 'dl-ui-split-button' },
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
