/**
 * Created by juntingliu2 on 2017/4/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let moduleA = {
    state: {
        // 账户信息
        user: '',
        isDevFlag: process.env.NODE_ENV === 'development'
    },
    mutations: {
        login (state, param) {
            state.user = param
        }
    },
    actions:{

    },
    getters: {

    }
}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    state: {
        // 账户信息
        user: '',
        isDevFlag: process.env.NODE_ENV === 'development'
    },
    mutations: {
        login (state, param) {
            state.user = param
        }
    },
    actions:{

    },
    getters: {

    },
    modules:{
        a: moduleA
    }
})
