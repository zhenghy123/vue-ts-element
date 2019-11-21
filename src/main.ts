import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './utils/http';
import md5 from 'js-md5';
import enumData from './data/enum';
import _ from 'lodash'

Vue.use(ElementUI, { size: 'small ' });

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;
Vue.prototype._ = _;
Vue.prototype.enum = enumData;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
