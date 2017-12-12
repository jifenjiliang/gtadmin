import Vue from 'vue'

import Router from 'vue-router'

/* 用户模块 */
import User from './user'

/* 支付模块 */
import Pay from './pay'

/* peg管理 */
import Pegmanage from './pegmanage'

/* 内容管理 */
import Content from './content'

/* 会员 */
import Member from './member'

/* 版本 */
import Version from './version'

Vue.use(Router);

export default new Router({
    // mode: 'history',

    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: resolve => require(['../pages/login/login.vue'], resolve, )
        },
        {
            path: '/',
            component: resolve => require(['../components/Home.vue'], resolve),

            children: [

                ...User, ...Pay, ...Pegmanage, ...Content, ...Member, ...Version,

                // 404 pages
                {
                    path: '*',
                    component: resolve => require(['../components/nofind.vue'], resolve)
                }
            ]
        },
    ],
})
