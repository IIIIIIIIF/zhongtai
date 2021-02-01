import VueCookie from 'vue-cookie';
import {
  APP_SIZE,
  APP_MENU_OPENED
} from '../type'

const state = {
  size:VueCookie.get(APP_SIZE),
  opened:VueCookie.get(APP_MENU_OPENED),//false:210
};

const mutations = {
  SET_APP_SIZE(state,size){
    state['size']=size;
    VueCookie.set(APP_SIZE, size);
  },
  SET_APP_MENU_OPENED(state,data){
    state['opened']=data;
    VueCookie.set(APP_MENU_OPENED,data);
  }
};
const actions = {
  setAppSize({commit}, data) {
    commit('SET_APP_SIZE', data);
  },
  setAppMenuOpened({commit},data){
    commit('SET_APP_MENU_OPENED',data);
  }
};
export default {
  actions,
  mutations,
  state
}
