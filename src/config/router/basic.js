// TODO 基础路由
import {FontLayout} from "../../layout";
import {FontIndex, ShoppingDescribe, ShoppingList} from "../../views";
import Login from '../../views/admin/login';
import Register from '../../views/admin/register';

export default [
  {
    path:'/',
    name:'index',
    component:FontLayout,
    redirect:'/',
    children:[
      {
        path:'',
        name:'indexs',
        component:FontIndex,
        meta:{title:"首页"}
      }
    ]
  },
  {
    path: '/shopping',
    name: 'shopping',
    component: FontLayout,
    redirect: '/shopping/list',
    meta: {title: "数据超市"},
    children: [
      {
        path: 'list',
        name: 'shoppingList',
        component: ShoppingList,
        meta: {title: '数据超市列表页'}
      },
      {
        path: 'describe',
        name: 'shoppingDescribe',
        component: ShoppingDescribe,
        meta: {title: '数据超市详情页'}
      }
    ]
  },
  {
    path:'/test',
    name:'test',
    component:FontLayout,
    meta:{title:"测试工具"},
    redirect:'/test',
    children:[
      {
        path:'',
        name:'testIndex',
        component:()=>import('@/views/test'),
        meta:{title:"测试工具",showFooter:false}
      }
    ]
  },
  {
    path:'/recommend',
    name:'recommend',
    component:FontLayout,
    meta:{title:"检索推荐"},
    redirect:'/recommend',
    children:[
      {
        path:'',
        name:'recommendIndex',
        component:()=>import('@/views/recommend'),
        meta:{title:"检索推荐首页",showFooter:false}
      }
    ]
  },{
    path:'/vector',
    name:'vector',
    component:FontLayout,
    meta:{title:"向量检索"},
    redirect:'/vector',
    children:[
      {
        path:'',
        name:'vectorIndex',
        component:()=>import('@/views/vector'),
        meta:{title:"向量检索首页",showFooter:false}
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
  {
    path:'/generate',
    name:'generate',
    component:()=>import('@/views/generate/index.vue'),
    meta:{title:"自动生成word报告"},
  },
]
