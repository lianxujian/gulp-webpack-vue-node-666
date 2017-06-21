//页登录
<template>
    <div class="login">
        <div class="login-container">
            <el-form :model="loginForm" class="login-form" ref="login" :rules="loginRule">
                <el-form-item label="用户名" prop="user"
                              :rules="[{required: true, message: '用户名不能为空' }]">
                    <el-autocomplete class="user-input" v-model="loginForm.user" placeholder="请输入用户名"
                                     v-on:select="handleSelect" :fetch-suggestions="querySearch">
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="密码" prop="password"
                              :rules="[{required: true, message: '密码不能为空', trigger: 'blur' }]">
                    <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="inputCode"><br/>
                    <el-input v-model="loginForm.inputCode" placeholder="请输入验证码" class="code-input"></el-input>
                    <el-input v-model="loginForm.code" class="code-image" type="button"></el-input>
                    <el-button class="code-tip" v-on:click="createCode">换一换</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="remember">记住密码</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-button" v-on:click="submitLogInfo('login', 'login')">登录</el-button>
                    <el-button type="primary" class="login-button" v-on:click="submitLogInfo('login', 'update')">账户修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import 'element-ui/lib/index'
    import 'element-ui/lib/theme-default/index.css'
    import Input from 'element-ui/lib/input'
    import AutoComplete from 'element-ui/lib/autocomplete'
    import ScrollBar from 'element-ui/lib/scrollbar'
    import Button from 'element-ui/lib/button'
    import Form from 'element-ui/lib/form'
    import FormItem from 'element-ui/lib/form-item'
    import Checkbox from 'element-ui/lib/checkbox'
    import Vue from 'vue'
    import Axios from '../axios/index'
    Vue.use(AutoComplete)
    Vue.use(Checkbox)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(ScrollBar)
    export default {
        data(){
            let me = this
            let validateCode = function (rule, value, callback) {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                } else if (value.toUpperCase() !== me.loginForm.code.toUpperCase()) {
                    return callback(new Error('验证码输入有误'));
                } else {
                    return callback()
                }
            }
            return {
                loginForm: {// 登录表单信息
                    // 当前输入用户信息
                    user: '',
                    password: '',
                    code: '',// 验证码
                    inputCode: ''// 输入的验证码
                },
                remember: false, //是否在本地存储登录信息
                loginRule: {// 登录表单验证规则
                    inputCode: [{validator: validateCode, trigger: 'blur'}]
                },
                localInfo: []
            }
        },
        mounted: function () {
            this.createCode()
        },
        methods: {
            querySearch: function (queryString, cb) {
                this.localInfo = JSON.parse(localStorage.getItem('MyBlog'))
                let results = []
                if (this.localInfo) {
                    for (let i = 0; i < this.localInfo.length; i++) {
                        results[i] = {value: this.localInfo[i].user}
                    }
                }
                cb(results);
            },
            handleSelect: function () {
                // 将密码映射进密码框
                for (let i = 0; i < this.localInfo.length; i++) {
                    if (this.localInfo[i].user === this.loginForm.user) {
                        this.loginForm.password = this.localInfo[i].password
                    }
                }
            },
            createCode: function () {
                this.loginForm.code = ''
                let codeLength = 4;
                let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D',
                    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数
                for (var i = 0; i < codeLength; i++) {//循环操作
                    var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）
                    this.loginForm.code += random[index];//根据索引取得随机数加到code上
                }
            },
            submitLogInfo: function (formName, operate) {
                let me = this
                let param = {
                    user: me.loginForm.user,
                    ope: operate,
                    password: me.loginForm.password
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 发送请求判断跳转
                        me.$axios({
                            url: '/operateMongo',
                            method: 'post',
                            data: param
                        })
                            .then(res => {
                                    if (res.data.flag === 0) {
                                        // 将登录信息写入store以及Session
                                        me.$store.commit('login', me.loginForm.user)
                                        sessionStorage.setItem('user', me.loginForm.user)
                                        if (me.remember) {
                                            // 记住密码时写入localStorage
                                            if (!localStorage.getItem('MyBlog')) {
                                                localStorage.setItem('MyBlog', JSON.stringify([]))
                                            }
                                            let localData = JSON.parse(localStorage.getItem('MyBlog'))
                                            localData.push(param)
                                            localStorage.setItem('MyBlog', JSON.stringify(localData))
                                        }
                                        me.$router.replace({path: '/articleList'})
                                    } else {
                                        alert(res.data.errMsg)
                                    }
                                },
                                res => {
                                    console.log('error')
                                })
                            .then(function () {
                                me.createCode()
                            })
                            .catch(function (res) {
                                console.log(res)
                            })
                    } else {
                        return false;
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass">
    .login {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: -ms-linear-gradient(top, #b8c4cb, #f6f6f8); /* IE 10 */
        background: -moz-linear-gradient(top, #b8c4cb, #f6f6f8); /*火狐*/
        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#b8c4cb), to(#f6f6f8)); /*谷歌*/
        .login-container {
            -webkit-border-radius: 5px;
            border-radius: 5px;
            -moz-border-radius: 5px;
            background-clip: padding-box;
            margin: 80px auto;
            width: 350px;
            padding: 35px 35px 15px 35px;
            background: #fff;
            border: 1px solid #eaeaea;
            box-shadow: 0 0 25px #cac6c6;
            text-align: center;
            .login-form {
                width: 100%;
                .user-input {
                    width: 100%;

                }
                .title {
                    margin: 0px auto 40px auto;
                    text-align: center;
                    color: #505458;
                }
                .login-button {
                    width: 100%;
                }
                .code-input {
                    width: 55%;
                }
                .code-image {
                    width: 20%;
                    margin-left: 20px;
                }
                .code-tip {
                    width: 15%;
                    border: 0;
                }
            }
        }
    }
</style>
