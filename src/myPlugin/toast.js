let Toast = {};
Toast.install = function (Vue, options) {
    Vue.myGlobalMethod = function () {  // 1. 添加全局方法或属性，如: vue-custom-element
        // 逻辑...
    }
    Vue.directive('my-directive', {  // 2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
        bind (el, binding, vnode, oldVnode) {
            // 逻辑...
        }
        //...
    })
    Vue.mixin({
        created: function () {  // 3. 通过全局 mixin方法添加一些组件选项，如: vuex
            // 逻辑...
        }
        //...
    })
    Vue.prototype.$myMethod = function (options) {  // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
        // 逻辑...
    }
    Vue.prototype.$toastMsg = 'Hello Vue Plugin';
    // msg内容，type控制样式，option传宽度等选项
    Vue.prototype.$toast = function (msg, option, type) {
        let toastTpl = Vue.extend({
            template: '<div class="vue-toast toast-'+type+'">' + msg + '</div>'
        });
        let {keys, values, entries} = Object;
        let tpl = new toastTpl().$mount().$el;
        for (let [key, value] of entries(option)) {
            tpl.style[key] = value
        }
        document.body.appendChild(tpl);
        setTimeout(function () {        // 4、延迟2.5秒后移除该提示
            document.body.removeChild(tpl);
        }, 2500)
    }

}

export default Toast