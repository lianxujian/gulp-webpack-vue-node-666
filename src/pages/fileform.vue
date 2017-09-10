<template>
    <div class="wrapper">
        <div id="app">
            <form @submit.prevent="submit">
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
    export default {
        data(){
            return{
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
        methods: {
            submit: function() {
                let me = this
                var formData = JSON.stringify(this.user); // 这里才是你的表单数据
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