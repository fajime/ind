// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-image-viewer',
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
            label : 'minScale',
            type  : 'number',
            value : 1
          },
          {
            label : 'maxScale',
            type  : 'number',
            value : 5
          },
          {
            label : 'hideControls',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'hideControlsTime',
            type  : 'number',
            value : 1500
          },
          {
            label : 'showPreview',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'backgroundColor',
            type  : 'text',
            value : 'white'
          },
          {
            label   : 'pivot',
            type    : 'select',
            value   : 'cursor',
            options : [
              { name : 'cursor', value : 'cursor' },
              { name : 'center', value : 'center' }
            ]
          },
          {
            label : 'zoomingElastic',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'limitTranslation',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'doubleClickToZoom',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'mouseWheelToZoom',
            type  : 'checkbox',
            value : true
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-image-viewer' }
          ]
        }
      },
      component : theComponent
    };
  }
};
