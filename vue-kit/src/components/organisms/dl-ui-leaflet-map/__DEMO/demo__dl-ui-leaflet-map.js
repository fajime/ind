// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';
// Have layer model apart for readability
import customLayers from './layerSetExample';
import baseLayers from './layerSetBaseExample';
import infoBoxData from './infoBoxDataExample';
import lang from './langExample';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-leaflet-map',
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
      playground :
        {
          props : [
            {
              label : 'attribution',
              type  : 'checkbox',
              value : false
            },
            {
              label : 'showDrawControl',
              type  : 'checkbox',
              value : true
            },
            {
              label : 'showBaseLayerList',
              type  : 'checkbox',
              value : true
            },
            {
              label : 'showCustomLayerList',
              type  : 'checkbox',
              value : true
            },
            {
              label : 'showLatlngControl',
              type  : 'checkbox',
              value : true
            },
            {
              label : 'showInfoBox',
              type  : 'checkbox',
              value : false
            },
            {
              label : 'openInfoBox',
              type  : 'checkbox',
              value : false
            },
            {
              label : 'showInfoPopup',
              type  : 'checkbox',
              value : true
            },
            {
              label : 'getInfoOnClick',
              type  : 'checkbox',
              value : false
            },
            {
              label : 'zoom',
              type  : 'checkbox',
              value : true
            },
            {
              label   : 'zoomControlPos',
              type    : 'select',
              value   : 'bottomright',
              options : [
                { name : 'bottomleft', value : 'bottomleft' },
                { name : 'bottomright', value : 'bottomright' },
                { name : 'topleft', value : 'topleft' },
                { name : 'topright', value : 'topright' }
              ]
            },
            {
              label : 'scale',
              type  : 'checkbox',
              value : true
            },
            {
              label   : 'scaleControlPos',
              type    : 'select',
              value   : 'bottomright',
              options : [
                { name : 'bottomleft', value : 'bottomleft' },
                { name : 'bottomright', value : 'bottomright' },
                { name : 'topleft', value : 'topleft' },
                { name : 'topright', value : 'topright' }
              ]
            },
            {
              label : 'customLayers',
              type  : 'hidden',
              value : customLayers
            },
            {
              label : 'baseLayers',
              type  : 'hidden',
              value : baseLayers
            },
            {
              label : 'infoBoxData',
              type  : 'hidden',
              value : infoBoxData
            },
            {
              label : 'lang',
              type  : 'hidden',
              value : lang
            }
          ]
        },
      component : theComponent
    };
  },
  methods : {
    /**
     * Component main event onReady function, gets called when inited
     * @param {Object} map map object
     */
    ready(map) {
      // eslint-disable-next-line no-console
      console.log('Loading process finished.', map);
    },
    /**
     * Event triggered when shape creating
     * @param {Object} settings settings object
     */
    shapeCreating(settings) {
      // eslint-disable-next-line no-console
      console.log('shape creating', settings);
    },
    /**
     * Event triggered when shape updating
     * @param {Object} settings settings object
     */
    shapeUpdating(settings) {
      // eslint-disable-next-line no-console
      console.log('shape updating', settings);
    },
    /**
     * Event triggered when shape deleting
     * @param {Object} settings settings object
     */
    shapeDeleting(settings) {
      // eslint-disable-next-line no-console
      console.log('shape deleting', settings);
    }
  }
};
