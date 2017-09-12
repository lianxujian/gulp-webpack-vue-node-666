import Vue from 'vue'
import Router from 'vue-router'
import Canvas from '../pages/canvas.vue'
import FileForm from '../pages/fileform.vue'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/', //首页
            component: r => require.ensure(//这种相对import类型，可以实现客户端的按需加载。
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
            path: '/canvas',//canvas练习页面
            component: Canvas

        },
        {
            path: '/websocket',//聊天室
            component: resolve => require(['../pages/webSocket.vue'], resolve)

        },
        {
            path: '/fileForm',//提交带文件的表单
            component: FileForm

        },
        {
            path: '*', //其他
            redirect: '/'
        }
    ]
})
