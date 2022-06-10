import enGB from '../lang/en-GB';
import esES from '../lang/es-ES';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
export default new VueI18n({
  locale         : window.localStorage.lang || 'en-GB',
  fallbackLocale : 'en-GB',
  messages       : {
    'es-ES' : esES,
    'en-GB' : enGB
  }
});
