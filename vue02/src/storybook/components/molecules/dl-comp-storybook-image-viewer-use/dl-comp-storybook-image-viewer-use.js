import theComponent from '@/components/molecules/dl-ui-image-viewer';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-image-viewer-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiImageViewer : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-image-viewer"*/ '@/components/molecules/dl-ui-image-viewer'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        props : [ {
          label : 'minScale',
          type  : 'number',
          value : 1
        }, {
          label : 'maxScale',
          type  : 'number',
          value : 5
        }, {
          label : 'hideControls',
          type  : 'checkbox',
          value : true
        }, {
          label : 'hideControlsTime',
          type  : 'number',
          value : 1500
        }, {
          label : 'showPreview',
          type  : 'checkbox',
          value : true
        }, {
          label : 'backgroundColor',
          type  : 'text',
          value : 'white'
        }, {
          label   : 'pivot',
          type    : 'select',
          value   : 'cursor',
          options : [
            { name : 'cursor', value : 'cursor' },
            { name : 'center', value : 'center' }
          ]
        }, {
          label : 'zoomingElastic',
          type  : 'checkbox',
          value : true
        }, {
          label : 'limitTranslation',
          type  : 'checkbox',
          value : true
        }, {
          label : 'doubleClickToZoom',
          type  : 'checkbox',
          value : true
        }, {
          label : 'mouseWheelToZoom',
          type  : 'checkbox',
          value : true
        }],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-image-viewer',
          options : [
            { name : 'Default', value : 'dl-ui-image-viewer' },
            { name : 'Custom', value : 'custom-image-viewer' }
          ]
        }
      },
      component : theComponent
    };
  }
};
