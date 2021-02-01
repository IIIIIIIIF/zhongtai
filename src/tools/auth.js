//已用
import Cookies from 'vue-cookie'
import {AUTHORIZATION, USERINFO_ROLEID} from "../store/type";
export function getToken() {
  return Cookies.get(AUTHORIZATION)
}

export function setToken(token) {
  return Cookies.set(AUTHORIZATION, token)
}

export function removeToken() {
  return Cookies.remove(AUTHORIZATION)
}

export function getRole(){
  return Cookies.get(USERINFO_ROLEID);
}
