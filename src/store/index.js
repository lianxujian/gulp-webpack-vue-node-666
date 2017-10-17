/**
 * Created by juntingliu2 on 2017/4/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//模块内部的 action、mutation 和 getter 是注册在全局命名空间的
//这样使得多个模块能够对同一 mutation 或 action 作出响应
//如果不用命名空间，在组建内使用this.$store.commit('increment')将调用三个increment函数

let moduleA = {
    namespaced: true,
    state: {
        count: 0,
        user: 'a'
    },
    mutations: {
        increment (state) {
            // 这里的 `state` 对象是模块的局部状态
            console.log('a increment')
            state.count++
        }
    },
    actions: {
        someAction ({ dispatch, commit, getters, rootGetters }) {
            getters.doubleCount // -> 'foo/someGetter'
            rootGetters.doubleCount // -> 'someGetter'

            dispatch('someOtherAction') // -> 'foo/someOtherAction'
            dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

            commit('increment') // -> 'foo/increment'
            commit('increment', null, { root: true }) // -> 'increment'
        },
        someOtherAction ({ dispatch, commit, getters, rootGetters }) {
            console.log('a moudle someOtherAction')
        }
    },
    getters: {
        doubleCount (state) {
            return state.count * 2
        },
        sumWithRootCount (state, getters, rootState, rootGetters) {
            return state.count + rootState.count
        }
    }
}

let moduleB = {
    state: {
        count: 0,
        user: 'b'
    },
    mutations: {
        increment (state) {
            // 这里的 `state` 对象是模块的局部状态
            state.count++
            console.log('b increment')
        }
    },
    actions: {
        incrementIfOddOnRootSum ({ state, commit, rootState }) {
            if ((state.count + rootState.count) % 2 === 1) {
                commit('increment')
            }
        },
        someOtherAction ({ dispatch, commit, getters, rootGetters }) {
            console.log('b moudle someOtherAction')
        }
    },
    getters: {
        doubleCount (state) {
            return state.count * 2
        },
        sumWithRootCount (state, getter, rootState) {
            return state.count + rootState.count
        }
    }
}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    state: {
        count: 0,
        // 账户信息
        user: '',
        isDevFlag: process.env.NODE_ENV === 'development'
    },
    mutations: {
        login (state, param) {
            state.user = param
        },
        increment (state) {
            // 这里的 `state` 对象是模块的局部状态
            state.count++
            console.log('global increment')
        }
    },
    actions:{
        someOtherAction ({ dispatch, commit, getters, rootGetters }) {
            console.log('global moudle someOtherAction')
        }
    },
    getters: {
        doubleCount (state) {
            return state.count
        }

    },
    modules:{
        a: moduleA,
        b: moduleB
    }
})
