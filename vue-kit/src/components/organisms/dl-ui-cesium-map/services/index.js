import NominatimService from './nominatim/nominatimService';

const services = {
  NominatimService
};

export default {
  use : name => services[name]
};
