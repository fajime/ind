import { createApp } from 'vue';
import BaseApp from './baseApp.vue';
import router from '@/catalog/router';
import store from '@/catalog/store';
import i18n from '@/catalog/lang/i18n';
import highlight from '@/catalog/directives/highlight';

const app = createApp(BaseApp);
app.directive('highlight', highlight);
app.use(store)
  .use(i18n)
  .use(router)
  .mount('#app');
router.app = app;

