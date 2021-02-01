import VueCookie from 'vue-cookie';
import {ls as $ls} from "@/config/storage";
import {
  USERINFO_ID,
  USERINFO_ROLEID,
  USERINFO_USERNAME,
  AUTHORIZATION,
  MENUALL
} from "../type";

const state = {
  id: VueCookie.get(USERINFO_ID),
  roleId: VueCookie.get(USERINFO_ROLEID),
  username: VueCookie.get(USERINFO_USERNAME),
  authorization: VueCookie.get(AUTHORIZATION),
};

const mutations = {
  SET_USER_INFO(state, {id, roleId, token, username}) {
    if (id) {
      state["id"] = id;
      VueCookie.set(USERINFO_ID, id,{ expires: '1D' });
    }
    if (roleId) {
      state["roleId"] = roleId;
      VueCookie.set(USERINFO_ROLEID, roleId,{ expires: '1D' });
    }
    if (token) {
      state["authorization"] = token;
      VueCookie.set(AUTHORIZATION, token,{ expires: '1D' });
    }
    if (username) {
      state["username"] = username;
      VueCookie.set(USERINFO_USERNAME, username,{ expires: '1D' });
    }
  },
  LOGOOUT(state) {
    state["id"] = undefined;
    state["roleId"] = undefined;
    state["username"] = undefined;
    state["authorization"] = undefined;
    VueCookie.set(AUTHORIZATION,"");
    VueCookie.set(USERINFO_ID,"");
    VueCookie.set(USERINFO_ROLEID,"");
    VueCookie.set(AUTHORIZATION,"");
    VueCookie.set(USERINFO_USERNAME,"");
    $ls.remove(MENUALL);
  }
};
const actions = {
  setStateUserInfo({commit}, data) {
    commit("SET_USER_INFO", data)
  },
  logout({commit}, data,that) {
    commit("LOGOOUT");
  }
};
export default {
  actions,
  mutations,
  state
}
