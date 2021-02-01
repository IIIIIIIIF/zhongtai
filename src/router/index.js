import Vue from 'vue'
import Router from 'vue-router'
import {basicRouter,centerRouter,adminRouter} from '../config/router'

Vue.use(Router);
const routers=new Router({
  linkActiveClass:'active',
  scrollBehavior(to,from,savedPosition){
    return {x:0,y:0}
  },
  mode: 'history',
  routes: [
    // {path:'*',redirect:'/'}
  ]
});
routers.addRoutes(basicRouter);
routers.addRoutes(centerRouter);
routers.addRoutes(adminRouter);
export default routers;
