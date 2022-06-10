/* eslint-disable camelcase */
import nominatimRepository from './nominatimRepository';

const resource = '/';
export default {
  name : 'NominatimService',
  // eslint-disable-next-line require-jsdoc
  get() {
    return nominatimRepository.get(`${resource}`);
  },
  // eslint-disable-next-line require-jsdoc
  getLocation(locationTxt) {
    return nominatimRepository.get(`${resource}`, {
      params : {
        format          : 'json',
        limit           : '10',
        polygon_geojson : 1,
        q               : locationTxt
      }
    });
  },
  // eslint-disable-next-line require-jsdoc
  getLocationReverse(latLng) {
    return nominatimRepository.get(`${resource}reverse`, {
      params : {
        format          : 'json',
        lat             : latLng.lat,
        lon             : latLng.lng,
        zoom            : 10,
        polygon_geojson : 1
      }
    });
  }
};
