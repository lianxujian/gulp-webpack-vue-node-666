<template>
    <div class="articleList-container">
        <div v-show="!isCreateFlag">
            <el-button v-on:click="isCreateFlag = !isCreateFlag" v-show="this.$store.state.user!== ''">创建新文章</el-button>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>文章列表</span>
                </div>
                <div v-for="item in articleList" class="text item">
                    <el-button v-on:click="showArt(item)">{{item.name}}</el-button>
                </div>
            </el-card>
            <div v-model="artContent" v-show="artShowFlag">{{artContent.content}}</div>
        </div>

        <div v-show="isCreateFlag">
            <el-form ref="form" :model="form">
                <el-form-item>
                    <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="clickCreate">立即创建</el-button>
                    <el-button @click="clickCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Axios from '../axios/index'
    import Mock from '../mock/mockData'
    import 'element-ui/lib/index'
    import 'element-ui/lib/theme-default/index.css'
    import {Button, Card, Form, FormItem, Input} from 'element-ui'
    Vue.use(Card)
    Vue.use(Button)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    export default {
        data(){
            return {
                articleList: [],
                artContent: [],
                form: {
                    content: ''
                },
                isCreateFlag: false
            }
        },
        computed: {
            artShowFlag: function () {
                if (this.artContent.length === 0) {
                    return false
                }
                return true
            }
        },
        mounted: function () {
            this.showArtList()
        },
        methods: {
            showArtList: function () {
                let me = this
                me.$axios({
                    url: Axios.showArtList,
                    method: 'post',
                    data: {
                        user: ''
                    }
                })
                    .then(function (res) {
                        me.articleList = res.data
                    })
                    .catch(function (res) {
                        console.log(res)
                    })
            },
            showArt: function (item) {
                let me = this
                me.$axios({
                    url: Axios.showArt,
                    method: 'post',
                    data: {
                        path: item.path
                    }
                }).then(function (res) {
                    //显示文件内容
                    console.log(res)
                    me.artContent = res.data
                }).catch(function (res) {
                    console.log(res)
                })
            },
            clickCreate: function () {
                let me = this
                me.$axios({
                    url: Axios.createArt,
                    method: 'post',
                    data:  me.form
                }).then(function (res) {
                    //显示文件内容
                    if(res.data && res.data.flag){
                        alert(res.data && res.data.errMsg)
                    }else{
                        me.isCreateFlag = !me.isCreateFlag
                        me.form =  {
                            content: ''
                        }
                        me.showArtList()
                    }
                }).catch(function (res) {
                    console.log(res)
                })
            },
            clickCancel: function () {
                this.isCreateFlag = !this.isCreateFlag
                this.form =  {
                    content: ''
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass">
    .articleList-container {
        width: 70%;
        float: right;
        .text {
            font-size: 14px;
        }

        .item {
            padding: 18px 0;
        }
        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }
        .clearfix {
            span {
                line-height: 36px;
            }
        }
        .box-card {
            width: 480px;
        }
    }
</style>
