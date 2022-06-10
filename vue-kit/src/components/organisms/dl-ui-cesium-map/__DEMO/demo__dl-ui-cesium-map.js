// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';
const CesiumLib = require('cesium/Source/Cesium');

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-cesium-map',
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
          // Label name must match map's received prop
          {
            label : 'animation',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'timeline',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'baseLayerPicker',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'fullscreenButton',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'infoBox',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'navigationHelpButton',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'projectionPicker',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'sceneModePicker',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'selectionIndicator',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'drawTool',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'layerTool',
            type  : 'checkbox',
            value : true
          },
          {
            label : 'popupConfig',
            type  : 'hidden',
            value : {
              visible : true,
              x       : 200,
              y       : 200
            }
          },
          {
            label : 'layers',
            type  : 'hidden',
            value : [
              {
                name            : 'Grid',
                imageryProvider : new CesiumLib.GridImageryProvider(),
                alpha           : 1.0,
                show            : true
              }
            ]
          },
          {
            label : 'accessToken',
            type  : 'hidden',
            value :
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NmVjOGQxOS05Y2I1LTRmZTktODc5My02M2U3ZmM2OTI4MmQiLCJpZCI6MjgwMjAsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJnYyJdLCJpYXQiOjE1OTA1MTYzMTl9.J22LELApdPe0TgtkBH1CXKm-rOcO5c6Nr8BFx4wjUb0'
          }
        ]
      },
      component : theComponent
    };
  },
  methods : {
    /**
     * Component main event onReady function, gets called when inited
     * @param {Object} cesiumInstance main instance
     */
    ready(cesiumInstance) {
      // This event must be handled because event listener function does not catch ready (executes after it)
      const { Cesium, viewer } = cesiumInstance;
      /* We get Cesium and viewer instances here, then execute the relevant logic code
         Example, US Area:
         this.camera.position.lng = -111.0;
         this.camera.position.lat = 34.00;
         this.camera.position.height = 50000000;
         this.animation = true;

         OR: */
      viewer.entities.add({
        name    : 'Red polygon on surface',
        polygon : {
          hierarchy : Cesium.Cartesian3.fromDegreesArray([
            0.0, 42.0, 0.0, 40.0, -1.0, 41.0, -3.0, 40.0, -3.5, 41.0
          ]),
          material : Cesium.Color.RED.withAlpha(0.3)
        }
      });

      // Rejoin event handling flow
      this.notifyComponentEvent('ready', cesiumInstance);
    }
  }
};
