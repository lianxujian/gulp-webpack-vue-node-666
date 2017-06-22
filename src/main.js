import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

var ContainerDiv = document.createElement('div');
ContainerDiv.id = 'ContainerDiv';
document.body.appendChild(ContainerDiv);
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
