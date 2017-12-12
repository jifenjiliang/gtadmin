/**
 * Created by okiste on 2017/7/13.
 */


export default [
  //动态头条
  {
    path: '/headlines',
    component: resolve => require(['../pages/pegmanage/headlines/headlines.vue'], resolve)
  },
  {
    path: '/headlines/see/:id',
    component: resolve => require(['../pages/pegmanage/headlines/see.vue'], resolve)
  },
  {
    path: '/headlines/edit/:id',
    component: resolve => require(['../pages/pegmanage/headlines/edit.vue'], resolve)
  },
  {
    path: '/headlines/added',
    component: resolve => require(['../pages/pegmanage/headlines/added.vue'], resolve)
  },
  //金桐精选
  {
    path: '/paulownia',
    component: resolve => require(['../pages/pegmanage/paulownia/paulownia.vue'], resolve)
  },
  {
    path: '/paulownia/see/:id',
    component: resolve => require(['../pages/pegmanage/paulownia/see.vue'], resolve)
  },
  {
    path: '/paulownia/edit/:id',
    component: resolve => require(['../pages/pegmanage/paulownia/edit.vue'], resolve)
  },
  {
    path: '/paulownia/added',
    component: resolve => require(['../pages/pegmanage/paulownia/added.vue'], resolve)
  },

  //热门专家
  {
    path: '/experts',
    component: resolve => require(['../pages/pegmanage/experts/experts.vue'], resolve)
  },
  //站内信
  {
    path: '/mail',
    component: resolve => require(['../pages/pegmanage/mail/mail.vue'], resolve)
  },
  {
    path: '/mail/added',
    component: resolve => require(['../pages/pegmanage/mail/added.vue'], resolve)
  },



]
