<template>
    <div class="wrapper">
        总人数<div>{{userCount}}</div>

    </div>
</template>

<style>

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

</style>

<script>
    import Vue from 'vue'
    import VueSocketio from 'vue-socket.io';
    import Toast from '../myPlugin/toast';
    import '../myPlugin/toast.css'
    Vue.use(Toast);
    Vue.use(VueSocketio, 'http://localhost:3000');

    export default {
        data() {
            return {
                userCount: 0
            }

        },
        methods: {},
        mounted: function () {
            let me = this
            console.log(me.$toastMsg);
            let toastStyle = {
                'width': '800px',
                'border-radius': '0px'
            }
            me.$toast('hello vue plugin', toastStyle, 'bottom')
            me.$socket.emit('connect', 'me'); //在这里触发connect事件

        },
        sockets:{
            connect: function(){

            },
            users: function(data){
                console.log('Got update from the server');
                console.log('There are ' + data.number + 'users');
                me.userCount = data.number
            }
        }
    }
</script>