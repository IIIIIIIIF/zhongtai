
import {ls as $ls} from "@/config/storage";
import {
  MENUALL,
} from "../type";

const state = {
};

const mutations = {
  SET_MENU(state, data) {
    if(data&&Array.isArray(data)){
      $ls.set(MENUALL,JSON.stringify(data));
    }
  }
};
const actions = {
  setMenu({commit}, data) {
    commit("SET_MENU", data)
  }
};
export default {
  actions,
  mutations,
  state
}
