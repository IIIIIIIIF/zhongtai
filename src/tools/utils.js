import store from "../store";
import {getters} from '@/store/getters';
import router from '../router'

/**
 * 打开新页面
 * @param obj [object] 参数
 * @param obj.path [string] *需要打开的url
 * @param obj.news [boolean] *是否需要打开新页面 true:本页面打开 false|undefined:新页面打开
 * @param obj.query [string] 参数
 * @param obj.params [string] 参数
 */
export function openWindow(obj) {
  if (obj.news) {
    this.$router.push(obj);
  } else {
    const news = this.$router.resolve(obj);
    window.open(news.href, '_blank')
  }
}

/**
 * 获取url参数
 * @param paramName 参数名称
 */
export function getParam(paramName) {
  let paramValue = "", isFound = !1;
  if (location.search.indexOf("?") === 0 && location.search.indexOf("=") > 1) {
    let arrSource = unescape(location.search).substring(1, location.search.length).split("&"), i = 0;
    while (i < arrSource.length && !isFound)
      arrSource[i].indexOf("=") > 0 &&
      arrSource[i].split("=")[0].toLowerCase() ===
      paramName.toLowerCase() &&
      (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
  }
  return paramValue === "" && (paramValue = null) , paramValue
}

/**
 * 冒泡排序
 * @param arr 需要排序的数组
 * @param a 需要进行按照哪个字段进行排序
 * @retrun arr 排序后的数组
 */
export function bubbleSortNumberId(arr, a) {
  if (!Array.isArray(arr)) {
    return [];
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i][a] > arr[j][a]) {
        let obj = arr[j];
        arr[j] = arr[i];
        arr[i] = obj;
      }
    }
  }
  return arr;
}

export function sortMenuAll(result) {
  if (!Array.isArray(result)) {
    return [];
  }
  let menu = [];
  let one = [];
  let o = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i].parentId === 0) {
      one.push(result[i]);
      let two = [];
      let p = 0;
      for (let j = 0; j < result.length; j++) {
        if (result[i].id === result[j].parentId) {
          two.push(result[j]);
          let three = [];
          for (let k = 0; k < result.length; k++) {
            if (result[j].id === result[k].parentId) {
              three.push(result[k]);
            }
          }
          two[p++].child = bubbleSortNumberId(three, "numberId");
        }
      }
      one[o++].child = bubbleSortNumberId(two, "numberId");
    }
  }
  result = bubbleSortNumberId(one, "numberId");
  for (let i = 0; i < result.length; i++) {
    let one = result[i];
    menu.push(one);
    for (let j = 0; j < one.child.length; j++) {
      let two = one.child[j];
      menu.push(two);
      for (let k = 0; k < two.child.length; k++) {
        let three = two.child[k];
        menu.push(three);
      }
    }
  }
  let index = 1;
  menu.forEach(item => {
    item.index = index++;
  });
  return menu;
}

// TODO 排序 将导航列表进行排序
export const sortMenuNav = (arr) => {
  let parent = [];
  let child = [];
  Array.isArray(arr) && arr.forEach(item => {
    if (item.parentId === 0) {
      parent.push({
        ...item,
        child: []
      });
    } else {
      child.push({
        ...item,
        child: []
      })
    }
  });
  let navList = [];
  parent.forEach(item => {
    child.forEach(it => {
      if (item.id === it.parentId) {
        item.child.push(it);
      }
    });
    navList.push(item);
  });
  parent = bubbleSortNumberId(parent, "numberId");
  parent.forEach(item => {
    if (item.child.length > 0) {
      item.child = bubbleSortNumberId(item.child, "numberId");
    }
  });
  return parent;
};

export function sortMenuShopping(result) {
  let menu = [];
  let one = [];
  let o = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i].pid === 0) {
      one.push(result[i]);
      let two = [];
      let p = 0;
      for (let j = 0; j < result.length; j++) {
        if (result[i].id === result[j].pid) {
          two.push(result[j]);
          let three = [];
          for (var k = 0; k < result.length; k++) {
            if (result[j].id === result[k].pid) {
              three.push(result[k]);
            }
          }
          three = bubbleSortNumberId(three, "orderid");
          two[p++].child = three;
        }
      }
      two = bubbleSortNumberId(two, "orderid");
      one[o++].child = two;
    }
  }
  result = bubbleSortNumberId(one, "orderid");
  for (let i = 0; i < result.length; i++) {
    let one = result[i];
    menu.push(one);
    for (let j = 0; j < one.child.length; j++) {
      let two = one.child[j];
      menu.push(two);
      for (let k = 0; k < two.child.length; k++) {
        let three = two.child[k];
        menu.push(three);
      }
    }
  }
  let index = 1;
  menu.forEach(item => {
    item.index = index++;
  });
  return menu;
}

// TODO 登录
export function logout(that) {
  const store = require('../store');
  store.default._actions.logout[0]();
  router.push('/login')
}

// TODO 获取是否显示按钮  增 删 改 授权
export const getShowBtn = id => {
  let obj = {add: false, update: false, delete: false, authority: false, password: false};
  if (id) {
    let menu = getters.getMenuAllSort();
    menu = menu[menu.findIndex(item => {
      return parseInt(item.id) === parseInt(id)
    })];
    menu && menu.child && menu.child.forEach(item => {
      if (item.url === 'add') {
        obj.add = true;
      } else if (item.url === "update") {
        obj.update = true;
      } else if (item.url === "delete") {
        obj.delete = true;
      } else if (item.url === "authority") {
        obj.authority = true;
      } else if (item.url === "password") {
        obj.password = true;
      }
    });
  }
  return obj;
};
// TODO 时间格式化
export const formatterDate = (rule) => {
  const date = new Date();
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(rule)) rule = rule.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(rule)) {
      rule = rule.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return rule;
};
// TODO 向上取整数 v:当前数值 step:每次向上增加的数值
export const upTo=(v,step=100)=>{
  let n=1;//循环次数
  do{
    if(step*n++>v){
      return step*(n-1);
    }
  }while (true);
};
