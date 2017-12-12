/**
 * Created by oksite on 2017/7/13.
 */

export default [
  //需求管理
  {
    path: '/demand',
    component: resolve => require(['../pages/demand/demand.vue'], resolve)
  },
  {
    path: '/demand/:id',
    component: resolve => require(['../pages/demand/topic.vue'], resolve)
  },
  //视频管理
  {
    path: '/movie',
    component: resolve => require(['../pages/movie/movie.vue'], resolve)
  },
  {
    path: '/movie/see/:id',
    component: resolve => require(['../pages/movie/see.vue'], resolve)
  },
  {
    path: '/movie/examine/:id',
    component: resolve => require(['../pages/movie/examine.vue'], resolve)
  },
  //问答管理
  {
    path: '/question',
    component: resolve => require(['../pages/question/question.vue'], resolve)
  },
  {
    path: '/question/:id',
    component: resolve => require(['../pages/question/topic.vue'], resolve)
  },
  // 生态推荐
  {
    path: '/ecology',
    component: resolve => require(['../pages/ecology/ecology.vue'], resolve)
  },
  {
    path: '/editecology/:id',
    component: resolve => require(['../pages/ecology/editecology.vue'], resolve)
  },
  {
    path: '/addecology',
    component: resolve => require(['../pages/ecology/addecology.vue'], resolve)
  },
  // 知识管理
  {
    path: '/knowledge',
    component: resolve => require(['../pages/knowledge/knowledge.vue'], resolve)
  },
  {
    path: '/addknowledge',
    component: resolve => require(['../pages/knowledge/knowledge_add.vue'], resolve)
  },
  {
    path: '/editknowledge/:id/:type',
    component: resolve => require(['../pages/knowledge/knowledge_edit.vue'], resolve)
  },
  {
    path: '/detailknowledge/:id/:type',
    component: resolve => require(['../pages/knowledge/knowledge_detail.vue'], resolve)
  },
  //公用栏目管理
  {
    path: '/column',
    component: resolve => require(['../pages/column/column.vue'], resolve)
  },
  {
    path: '/addcolumn',
    component: resolve => require(['../pages/column/addcolumn.vue'], resolve)
  },
  {
    path: '/editcolumn/:id',
    component: resolve => require(['../pages/column/editcolumn.vue'], resolve)
  },

]

