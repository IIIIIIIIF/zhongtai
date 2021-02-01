import {ls as $ls} from "@/config/storage";
import {sortMenuAll,sortMenuNav} from "../tools/utils";
import {
  MENUALL,
} from "./type";

export const getters = {
  getAuthorization: state => state.users.authorization,
  getUsersInfo: state => state.users,
  getAppSize: state => state.app.size,
  getAppMenuOpened:state=>state.app.opened,
  // TODO 获取菜单 并进行排序
  getMenuAllSort: state => {
    try {
      return sortMenuAll(JSON.parse($ls.get(MENUALL)));
    } catch (e) {
      return [];
    }
  },
  // TODO 获取菜单 没有经过排序
  getMenuAllNoSort: state => {
    try {
      return JSON.parse($ls.get(MENUALL));
    }catch (e) {
      return [];
    }
  },
  // TODO 获取菜单 经过层级排序
  getSortMenuNav:state=>{
    try {
      return sortMenuNav(JSON.parse($ls.get(MENUALL)));
    }catch (e) {
      return [];
    }
  },
};
