import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout/Index.vue';
// import process from "process";
// import jwt_decode from "jwt-decode";

Vue.use(Router);

/**
* hidden: true                   如果hidden为true则在左侧菜单栏展示，否则不显示
* name:'router-name'             路由名称，必须填写
* meta : {
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式，样式使用fontawesome图标库
  }
**/

export const asyncRouterMap = [
  //-----------------------------------------这里是菜单面路由------------------------------------------------------
  // {
  //   path: "/errorManage",
  //   name: "errorManage",
  //   component: Layout,
  //   hidden: true,
  //   redirect: "/errorManage",
  //   children: [
  //     {
  //       path: "/errorManage",
  //       name: "errorManage",
  //       meta: { title: "报障管理", icon: "fa fa-exclamation-triangle" },
  //       component: () => import("@/views/ErrorManage/ErrorManage.vue")
  //     }
  //   ]
  // },
  {
    path: '/productionQuery',
    name: 'productionQuery',
    component: Layout,
    hidden: true,
    // redirect: '/productionQuery',
    children: [
      {
        path: '/productionQuery',
        name: 'productionQuery',
        meta: { title: '生产查询', icon: 'icn2', parent: '/productionQuery' },
        component: () => import('@/views/ProductionQuery/ProductionQuery.vue')
      }
    ]
  },
  {
    path: '/logQuery',
    name: 'logQuery',
    component: Layout,
    hidden: true,
    // redirect: '/logQuery',
    children: [
      {
        path: '/logQuery',
        name: 'logQuery',
        meta: { title: '日志查询', icon: 'icn3', parent: '/logQuery' },
        component: () => import('@/views/LogQuery/LogQuery.vue')
      }
    ]
  },
  {
    path: '/productionStatistics',
    name: 'productionStatistics',
    component: Layout,
    hidden: true,
    // redirect: '/productionStatistics',
    children: [
      {
        path: '/productionStatistics',
        name: 'productionStatistics',
        meta: {
          title: '生产统计',
          icon: 'icn4',
          parent: '/productionStatistics'
        },
        component: () =>
          import('@/views/ProductionStatistics/ProductionStatistics.vue')
      }
    ]
  },
  //-----------------------------------------这里是子页面路由------------------------------------------------------
  {
    path: '/productionQuery',
    name: 'productionQuery',
    component: Layout,
    hidden: false,
    meta: {
      title: '生产查询',
      icon: 'fa fa-product-hunt',
      parent: '/productionQuery'
    },
    children: [
      {
        path: '/allDetailRouter',
        name: 'allDetailRouter',
        alias: '/allDetail',
        redirect: '/allDetail',
        meta: {
          title: '生产详情',
          icon: 'fa fa-product-hunt',
          parent: '/productionQuery'
        }, //这里是重复的title，在
        component: () => import('@/views/ProductionQuery/AllDetailRouter.vue'),
        children: [
          {
            path: '/allDetail',
            name: 'allDetail',
            meta: {
              title: '生产详情',
              icon: 'fa fa-product-hunt',
              parent: '/productionQuery'
            },
            component: () => import('@/views/ProductionQuery/AllDetail.vue')
          },
          {
            path: '/logDetails',
            meta: {
              title: '处理详情',
              icon: 'fa fa-product-hunt',
              parent: '/productionQuery'
            },
            component: () => import('@/views/ProductionQuery/LogDetails.vue')
          }
        ]
      }
    ]
  },

  {
    path: '/logQuery',
    name: 'logQuery',
    component: Layout,
    hidden: false,
    meta: {
      title: '日志查询',
      icon: 'fa fa-product-hunt',
      parent: '/logQuery'
    },
    // redirect: '/logQuery',
    // component: () => import('@/views/LogQuery/LogQuery.vue'),
    children: [
      {
        path: '/logDetails1',
        name: 'logDetails1',
        meta: {
          title: '日志详情',
          icon: 'fa fa-product-hunt',
          parent: '/logQuery'
        },
        component: () => import('@/views/ProductionQuery/LogDetails.vue')
      }
    ]
  },
  {
    path: '/errorManage',
    // name: "errorManage",
    component: Layout,
    hidden: false,
    meta: {
      title: '故障管理',
      icon: 'fa fa-product-hunt',
      parent: '/errorManage'
    },
    redirect: {
      name: 'errorManage'
    },
    children: [
      {
        path: '/errorDetail',
        name: 'errorDetail',
        meta: {
          title: '故障信息',
          icon: 'fa fa-exclamation-triangle',
          parent: '/errorManage'
        },
        component: () => import('@/views/ErrorManage/ErrorDetail.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/productionQuery'
  },
  {
    path: '/login',
    name: 'login',
    hidden: false,
    meta: { title: '系统登录' },
    component: () => import('@/views/Login/Login.vue')
  },
  //--------------------------------------------------------------------------------
  {
    path: '/404',
    name: '404',
    hidden: false,
    meta: { title: '404' },
    component: () => import('@/views/404.vue')
  }
  // {
  //   path: '*',
  //   redirect: '/404'
  // },
];

const router: any = new Router({
  mode: 'hash',
  // history
  base: process.env.BASE_URL,
  routes: asyncRouterMap
});

router.beforeEach((to: any, from: any, next: any) => {
  console.log('to----------------', to, from);

  const isLogin = sessionStorage.getItem('tsToken') ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    if (isLogin) {
      // const decoded: any = jwt_decode(localStorage.tsToken);
      // const { key } = decoded;
      // // 权限判断
      // if (hasPermission(key, to)) {
      //   next();
      // } else {
      //   next("/404"); // 没有权限进入
      // }
      // console.log('to', to.path);
      // else if (to.path == '/logDetails') {
      //   next('/logDetails');
      // }
      if (to.path == '/404') {
        next('/productionQuery');
      } else {
        // if (from.path !== to.path) {
        //   next(to.path);
        // } else {
        //   next();
        // }
        next();
      }
    } else {
      next('/login');
    }
  }
});

/**
 * 判断是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 * */
function hasPermission(roles: string, route: any) {
  return true;
  // if (route.meta && route.meta.roles) {
  //   // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
  //   return route.meta.roles.some((role: string) => role.indexOf(roles) >= 0);
  // } else {
  //   // 默认不设置有权限
  //   return true;
  // }
}

export default router;
