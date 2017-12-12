/**
 * Created by oksite on 2017/7/13.
 */

export default [

  // 用户管理
  {
    path: '/',
    component: resolve => require(['../pages/user/customer.vue'], resolve)
  },
  {
    path: '/customer',
    component: resolve => require(['../pages/user/customer.vue'], resolve)
  },
  {
    path: '/customer/:id',
    component: resolve => require(['../pages/user/topic.vue'], resolve)
  },
  //个人用户管理
  {
    path: '/personal',
    component: resolve => require(['../pages/personal/personal.vue'], resolve)
  },
  {
    path: '/personal/:id',
    component: resolve => require(['../pages/personal/detail.vue'], resolve)
  },
  //人脉管理
  {
    path: '/connection',
    component: resolve => require(['../pages/connection/connection.vue'], resolve)
  },
  {
    path: '/connection/:id',
    component: resolve => require(['../pages/connection/detail.vue'], resolve)
  },
  //组织用户管理
  {
    path: '/organum',
    component: resolve => require(['../pages/organizational/organizational.vue'], resolve)
  },
  {
    path: '/organum/:id',
    component: resolve => require(['../pages/organizational/topic.vue'], resolve)
  },
  {
    path: '/organumadd',
    component: resolve => require(['../pages/organizational/add.vue'], resolve)
  },
  //活动管理
  {
    path: '/activity',
    component: resolve => require(['../pages/activity/activity.vue'], resolve)
  },
  {
    path: '/activity/:id',
    component: resolve => require(['../pages/activity/topic.vue'], resolve)
  },
  /*关联组建*/
  {
    path: '/relation',
    component: resolve => require(['../components/relation.vue'], resolve)
  },





]

