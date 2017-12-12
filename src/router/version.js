/*
* @Author: ljp
* @Date:   2017-08-22 14:43:24
* @Last Modified by:   E73
* @Last Modified time: 2017-08-22 17:41:42
*/
export default [
//版本管理
  {
    path: '/version',
    component: resolve => require(['../pages/version/version.vue'], resolve)
  },
  {
    path: '/addversion',
    component: resolve => require(['../pages/version/version_add.vue'], resolve)
  },
  {
    path: '/editversion/:id',
    component: resolve => require(['../pages/version/version_edit.vue'], resolve)
  },
  {
    path: '/detailversion/:id',
    component: resolve => require(['../pages/version/version_detail.vue'], resolve)
  },
]