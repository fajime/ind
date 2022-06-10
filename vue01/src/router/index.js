import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Login from '@/views/Login';
import Main from '@/views/Main';
import Viewer from '@/views/Viewer';

Vue.use(VueRouter);

export const routes = [
  {
    path      : '/',
    name      : 'root',
    component : Login
  },
  {
    path      : '/login',
    name      : 'login',
    component : Login
  },
  {
    path      : '/main',
    name      : 'main',
    component : Main,
    children  : [
      { path : 'viewer', name : 'viewer', component : Viewer }
    ]
  }
];

/**
 * Define scroll behavior when router changes
 * @returns {Object} position scroll
 */
const scrollBehavior = () => ({ x : 0, y : 0 });

const router = new VueRouter({
  mode : 'history',
  base : process.env.BASE_URL,
  routes,
  scrollBehavior
});

// store 'store' in a variable to use it inside hooks
const storeInstance = store;

router.beforeEach((to, from, next) => {
  const dtNow = new Date();
  const tokenData = storeInstance.getters.getTokenData;
  const invalidToken = (tokenData === undefined) || (tokenData.token === undefined) || (tokenData.expireDate < dtNow);
  // if "to" is not login and there is no token or it is invalid it is redirected to login
  if (invalidToken && to.name !== 'login') {
    next('/login');
  }
  else {
    next();
  }
});

export default router;
