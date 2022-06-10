import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@babel/polyfill';
import i18n from '@/lang/i18n';
import DlUiIcon from '@/../node_modules/@indra-dl/dl-fmwk-vue-comp-kit/src/components/atoms/dl-ui-icon';
import DlUiIconsSet from '@indra-dl/dl-fmwk-vue-comp-kit/src/components/atoms/dl-ui-icons-set';
import DlHyLabsIconsSet from '@/components/atoms/dl-hl-icons-set';
import DlUiButton from '@/../node_modules/@indra-dl/dl-fmwk-vue-comp-kit/src/components/atoms/dl-ui-button';
import Checkbox from '@/../node_modules/@indra-dl/dl-fmwk-vue-comp-kit/src/components/atoms/dl-ui-checkbox';
import ClickOutside from '@/directives/ClickOutside';
import EventBus from './plugins/eventBus';

Vue.config.productionTip = false;

Vue.component('dl-ui-icon', DlUiIcon);
Vue.component('dl-ui-icons-set', DlUiIconsSet);
Vue.component('dl-hl-icons-set', DlHyLabsIconsSet);
Vue.component('dl-ui-button', DlUiButton);
Vue.component('dl-ui-checkbox', Checkbox);

Vue.directive('click-outside', ClickOutside);

Vue.prototype.isProd = process.env.VUE_APP_IS_PROD;
Vue.prototype.apiHostCyber = process.env.VUE_APP_CYBERRANGE_BASE_URL;
Vue.prototype.apiHostDT = process.env.VUE_APP_GRAVITEE_BASE_URL;

Vue.use(EventBus);

new Vue({
  router,
  store,
  i18n,
  render : h => h(App)
}).$mount('#app');
