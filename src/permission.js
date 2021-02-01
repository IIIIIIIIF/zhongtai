import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken, getRole} from './tools/auth'
import {adminRouter} from "./config/router";

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});
// NProgress.configure({ }) // NProgress Configuration
const whiteList = ['/login', '/', '/register/:id', '/shopping/list']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  //获取token
  const hasToken = getToken();
  let role = getRole();
  //判断是否已经登录(token存在表示已登录)
  if (hasToken) {
    if (to.path === '/login') {
      if (role === "1") {
        if (router.resolve({name: 'dashboard'}).route.matched.length === 0) {
          router.addRoutes(adminRouter);
        }
        next({path: '/dashboard'});
        NProgress.done()
      } else {
        next({path: '/center'});
        NProgress.done()
      }
    } else {
      // if (router.resolve({name: 'dashboard'}).route.matched.length === 0) {
      //   router.addRoutes(adminRouter);
      // }
      next();
      NProgress.done()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done()
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});
