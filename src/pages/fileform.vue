<template>
    <div class="wrapper">
        <div id="app">
            <form @submit.prevent="submit">
                <header>首字母小写，其他大写{{headerText|toLowwer}};首字母大写，其他小写{{headerText|toUpper}}</header>
                <div class="field">
                    姓名：<input type="text" v-model="user1.name">
                </div>

                <div class="field">
                    性別：
                    <label>
                        <input type="radio" value="男" v-model="user1.gender"> 男
                    </label>
                    <label>
                        <input type="radio" value="女" v-model="user1.gender"> 女
                    </label>
                </div>
                <input type="submit" value="提交">
            </form>
            <form>
                <input type="text" value="" v-model="user2.name" placeholder="请输入用户名">
                <input type="text" value="" v-model="user2.age" placeholder="请输入年龄">
                <input type="file" @change="getFile($event)">
                <button @click="submitForm($event)">提交</button>
            </form>
        </div>
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
    import Axios from '../axios/index'
    import Vue from 'vue'
    import {routerMixin} from '../mixins/mixins'
    import {toLowwer, toUpper} from '../filters/filter'
    export default {
        data(){
            return{
                headerText: 'adhggaioJGGJOIJGJGEdfjgegejro',
                user1: {
                    name: '',
                    gender: ''
                },
                user2:{
                    name: '',
                    age: '',
                    file: ''
                }
            }
        },
        mixins: [routerMixin],
        filters: {
            toLowwer: toLowwer,
            toUpper: toUpper
        },
        created: function () {
            console.log('组件钩子被调用')//例如 methods, components 和 directives，将被混合为同一个对象。
        },
        methods: {
            hello: function(){
                console.log('hello ')//两个对象键名冲突时，取组件对象的键值对。
            },
            submit: function() {
                let me = this
                var formData = JSON.stringify(this.user); // www-form
                me.$axios({
                    url: Axios.submitForm,
                    method: 'post',
                    data: formData
                })
                    .then(function (res) {
                        console.log(res)
                    },function (res) {
                        console.log(res)
                    })
                    .catch(function (res) {
                        console.log(res)
                    })
            },
            getFile(event) {
                let me = this
                me.user2.file = event.target.files[0];
                console.log(me.file);
            },
            submitForm(event) {
                let me = this
                event.preventDefault();
                let formData = new FormData();
                formData.append('name', me.user2.name);
                formData.append('age', me.user2.age);
                formData.append('file', me.user2.file);


                me.$axios({
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    url: Axios.submitForm,
                    method: 'post',
                    data: formData
                })
                    .then(function (res) {
                        console.log(res)
                    },function (res) {
                        console.log(res)
                    })
                    .catch(function (res) {
                        console.log(res)
                    })
            }
        }
    }
</script>