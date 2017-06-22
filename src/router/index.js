import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/', //首页
            component: r => require.ensure(
                [],
                () => r(require('../pages/articleList.vue')),
                'articleList'
            )
        },
        {
            path: '/articleList', //首页
            component: r => require.ensure(
                [],
                () => r(require('../pages/articleList.vue')),
                'articleList'
            )
                /*resolve => require(['../pages/articleList.vue'], resolve)*/
        },
        {
            path: '/manAccount', //账户管理
            component: r => require.ensure(
                [],
                () => r(require('../pages/manAccount.vue')),
                'manAccount'
            )
        },
        {
            path: '*', //其他
            redirect: '/'
        }
    ]
})
