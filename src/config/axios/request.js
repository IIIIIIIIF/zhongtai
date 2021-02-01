import axios from 'axios'
import ElementUI from 'element-ui'
import {VueAxios} from "./axios";
import store from '../../store';
// 创建 axios 实例
const service = axios.create({
  timeout: 60000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    // 'Accept':'text/plain'
  }
});
//   请求拦截器
service.interceptors.request.use(config => {
  //绑定token
  if (store && store.getters && store.getters.getAuthorization) {
    config.headers["Authorization"] = store.getters.getAuthorization;
  }
  // 在发送请求前做些什么
  return config;
}, err => {
  ElementUI.Message({"type": "error", "message": "网络开小差啦~~~"});
  return Promise.reject(err)
});
service.interceptors.response.use(function (response) {
  let res = {code: 3000};//拦截器被拦截
  if (response.status === 200) {
    // TODO token失效
    if (response.data.code === 200005 || response.data.code === 200003 || response.data.code === 200001) {
      require("../../tools/utils").logout();
    }
    res = response.data;
  } else {
    ElementUI.Message({"type": "error", "message": "请求失败"});
  }
  return res;
}, err => {
  if (!(err.response)) {
  } else if (err.response.status === 504 || err.response.status === 404) {
    ElementUI.Message({type: "error", message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status === 403) {
    ElementUI.Message({type: "error", message: '权限不足,请联系管理员!'});
  } else if (err.response.status === 500) {
    ElementUI.Message({type: "error", message: '数据加载失败error:500!'});
  } else {
    ElementUI.Message({type: "error", message: '数据加载失败!'});
  }
  return {code: 3000, message: err};
});
const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
};
export {
  installer as VueAxios,
  service as axios
}

