// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import cookie from 'vue-cookie';
import { VueAxios }  from './config/axios/request'
import store from './store';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import {ls,ss} from '@/config/storage'
import vueParticles from 'vue-particles'
import Vcomp from "./components";
import './permission'
//将localStorage挂载到全局
Vue.prototype.$ls=ls;
//将sessionStorage挂载再全局
Vue.prototype.$ss=ss;

Vue.prototype.$cookie=cookie;
//-----引入element-ui-开始---------
Vue.use(ElementUI,{
  size: 'medium',
});
//-----引入element-ui-结束---------
Vue.use(VueAxios, router);
Vue.config.productionTip = false;
//-----引用粒子插件  登录/注册页面使用
Vue.use(vueParticles);

//---注册全局组件----
Vue.use(Vcomp);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
