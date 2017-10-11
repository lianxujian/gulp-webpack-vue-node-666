import Vue from 'vue'
import Router from 'vue-router'
import Canvas from '../pages/canvas.vue'
import FileForm from '../pages/fileform.vue'
const Child = () => import('../pages/child.vue')//懒加载
Vue.use(Router)

const thisRouter = new Router({
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
            component: r => require.ensure(//这种相对import类型，可以实现客户端的按需加载。
                [],
                () => r(require('../pages/webSocket.vue')),
                'websocket'
            )

        },
        {
            path: '/fileForm',//提交带文件的表单
            component: FileForm

        },
        {
            path: '/ES6',//ES6
            component: r => require.ensure(//这种相对import类型，可以实现客户端的按需加载。
                [],
                () => r(require('../pages/ES6.vue')),
                'es6'
            )


        },
        {
            path: '/zhengxin',
            component: r => require.ensure(//这种相对import类型，可以实现客户端的按需加载。
                [],
                () => r(require('../pages/zhengxin.vue')),
                'zhengxin'
            )

        },
        {
            path: '/routerexec:id',
            children: [
                {
                    path: 'child1:childid',
                    components: {
                        default: Child,
                        a: Child,
                        b: Child
                    }
                },
                {
                    path: 'child2:childid',
                    component: Child
                },
                {
                    path: 'child3:childid',
                    component: Child
                }

            ],
            component: r => require.ensure(//这种相对import类型，可以实现客户端的按需加载。
                [],
                () => r(require('../pages/routerexec.vue')),
                'routerexec'
            )


        },
        {
            path: '*', //其他
            redirect: '/'
        }
    ]
})

thisRouter.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    console.log(next)
    next()
})

export {thisRouter as default}