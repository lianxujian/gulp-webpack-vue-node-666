import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import {globalMixin} from "./mixins/mixins"

var ContainerDiv = document.createElement('div');
ContainerDiv.id = 'ContainerDiv';
document.body.appendChild(ContainerDiv);

// register global mixins.
Vue.mixin(globalMixin)

/* eslint-disable no-new */
new Vue({
    el: '#ContainerDiv',
    router,
    store,
    template: '<App/>',
    components: {
        App: App
    }
})
