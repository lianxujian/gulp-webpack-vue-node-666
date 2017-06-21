import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/', //首页
            component: resolve => require(['../pages/articleList.vue'], resolve)
        },
        {
            path: '/articleList', //首页
            component: resolve => require(['../pages/articleList.vue'], resolve)
        },
        {
            path: '/manAccount', //账户管理
            component: resolve => require(['../pages/manAccount.vue'], resolve),
        },
        {
            path: '*', //其他
            redirect: '/'
        }
    ]
})
