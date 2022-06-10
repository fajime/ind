export default {
  label             : 'layerControl.main',
  selectAllCheckbox : true,
  children          : [
    {
      serverUrl : 'http://server_url/geoserver/wms',
      label     : 'layerControl.drone.label',
      title     : 'layerControl.drone.title',
      namespace : 'server_namespace',
      serverId  : 'layer_id_in_server',
      geometry  : 'layer assoc geometry',
      filter    : 'cql_filter_if_any',
      color     : 'fabb21',
      colorVect : { 'color' : '#fabb21', 'weight' : 1 },
      style     : 'some_server_style',
      visible   : false
    },
    {
      label             : 'layerControl.geofences.label',
      title             : 'layerControl.geofences.title',
      selectAllCheckbox : true,
      collapsed         : false,
      children          : [
        {
          serverUrl : ``,
          label     : 'layerControl.geofences.children.geotesting.label',
          title     : 'layerControl.geofences.children.geotesting.title',
          namespace : 'gis',
          serverId  : 'geofences',
          geometry  : 'geom_buffer',
          color     : 'fabb21',
          colorVect : { 'color' : '#fabb21', 'weight' : 1 },
          style     : '',
          visible   : false
        },
        {
          label             : 'layerControl.geofences.children.ndz.label',
          title             : 'layerControl.geofences.children.ndz.title',
          selectAllCheckbox : true,
          collapsed         : false,
          children          : [
            {
              serverUrl : ``,
              label     : 'layerControl.geofences.children.ndz.children.airport.label',
              title     : 'layerControl.geofences.children.ndz.children.airport.title',
              namespace : '',
              serverId  : '',
              geometry  : '',
              color     : '40717F',
              colorVect : { 'color' : '#40717F', 'weight' : 1 },
              style     : 'Water_Extent,',
              visible   : false
            },
            {
              serverUrl : ``,
              label     : 'layerControl.geofences.children.ndz.children.criin.label',
              title     : 'layerControl.geofences.children.ndz.children.criin.title',
              namespace : '',
              serverId  : '',
              geometry  : '',
              color     : 'EA123A',
              colorVect : { 'color' : '#EA123A', 'weight' : 1 },
              style     : 'Trans_L_Default',
              visible   : true
            }
          ]
        }
      ]
    }
  ]
};
