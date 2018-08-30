import Vue from 'vue';
import Element from 'element-ui';

import App from './App';
import store from './store';
import router from './router';
import ajax from '@/utils/ajax';

import './style/common.css';
import './style/component.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(Element);

Vue.use(ajax);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});