import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import settings from './modules/settings';
import layoutManager from './modules/layoutManager';
import modal from './modules/modal';
import oauth from './modules/oauth';
import snack from './modules/snack';
import score from './modules/score';

Vue.use(Vuex);

export default new Vuex.Store({
  modules : {
    app,
    settings,
    layoutManager,
    modal,
    snack,
    oauth,
    score
  }
});
