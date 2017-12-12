
/**
 * Created by oksite on 2017/5/5.
 */

import Vue from 'vue'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'

/* vue prototype */
import './config/extends.js'

import App from './App'

import router from './router'

import VueResource from 'vue-resource';

import * as filters from './filters/'

import prismplayer from './config/movie'

import store from './store/index'


Vue.use(ElementUI);

Vue.use(VueResource);

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.config.productionTip = false;

Vue.config.silent = false;

Vue.config.devtools = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
