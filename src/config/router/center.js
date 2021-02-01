import {Center} from "../../layout";

export default [
  {
    path: '/center',
    name: 'center',
    component: Center,
    redirect: '/center/my/data',
    children: [
      // {
      //   id: '10001',
      //   path: '',
      //   name: "centerHome",
      //   component: () => import('@/views/center/Person'),
      //   meta: {title: "个人中心", icon: 'el-icon-setting'}
      // },
      {
        id: '10001',
        path: 'my',
        name: "centerMy",
        component: () => import('@/components/white'),
        meta: {title: "我的资源", icon: 'el-icon-setting'},
        children: [
          {
            id: '10002',
            path: 'data',
            name: "centerData",
            component: () => import('@/views/center/Data'),
            meta: {title: "数据资源", icon: 'el-icon-setting'}
          }, {
            id: '10003',
            path: 'interface',
            name: "centerInterface",
            component: () => import('@/views/center/Interface'),
            meta: {title: "接口资源", icon: 'el-icon-setting'}
          },
          // {
          //   id: '10010',
          //   path: 'settlement',
          //   name: 'centerSettlement',
          //   component: () => import('@/views/center/Settlement/index.vue'),
          //   meta: {title: "我的入驻"}
          // },
          {
            id: '10005',
            path: 'log',
            name: 'centerLog',
            component: () => import('@/views/center/Log/index.vue'),
            meta: {title: "导入日志"}
          },
        ]
      },
      // {
      //   id: '10005',
      //   path: 'apply',
      //   name: "centerApply",
      //   component: () => import('@/views/center/Apply'),
      //   meta: {title: "数据申请", icon: 'el-icon-setting'}
      // },
      {
        id: '10006',
        path: 'monitor',
        name: "centerMonitor",
        component: () => import('@/views/center/Monitor'),
        meta: {title: "我的监控", icon: 'el-icon-setting'}
      }, {
        id: '10007',
        path: 'security',
        name: "centerSecurity",
        component: () => import('@/views/center/Security'),
        meta: {title: "安全设置", icon: 'el-icon-setting'}
      },
      // {
      //   id: '10008',
      //   path: 'help',
      //   name: "centerHelp",
      //   component: () => import('@/views/center/Help'),
      //   meta: {title: "帮助中心", icon: 'el-icon-setting'}
      // },
      {
        id: '10004',
        path: 'label',
        name: "centerLabel",
        //复用组件 以meta.role做为标志
        component: () => import('@/views/dashboard/Resource/Label'),
        meta: {title: "合并检索", icon: 'el-icon-setting', role: true},//role:true 表示普通用户
      },
    ]
  }
]
