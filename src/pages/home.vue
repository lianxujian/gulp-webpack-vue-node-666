// 页面左侧菜单区组件
<template>
    <div class="menu-container">
        <div class="left-menu">
            <el-menu default-active="1"  :mode="vertical"
                     router=true>
                <el-menu-item index="1"
                              route="/articleList">
                    全部文章
                </el-menu-item>
                <el-menu-item index="2"
                              route="/manAccount">
                    登录/注册
                </el-menu-item>
                <el-menu-item index="3" route="/canvas">
                    canvas练习
                </el-menu-item>
                <el-menu-item index="4" route="/websocket">
                    webSocket
                </el-menu-item>
                <el-menu-item index="5" route="/fileForm">
                   fileForm
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import 'element-ui/lib/index'
    import 'element-ui/lib/theme-default/index.css'
    import Row from 'element-ui/lib/row'
    import Col from 'element-ui/lib/col'
    import Menu from 'element-ui/lib/menu'
    import MenuItem from 'element-ui/lib/menu-item'
    import Vue from 'vue'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Menu)
    Vue.use(MenuItem)

    export default {
        data() {
            return {}
        },
        mounted: function () {
            this.$router.replace({path: '/articleList'})
        },
        methods: {

        }
    }
</script>

<style rel="stylesheet/scss" lang="sass">
    .menu-container {
        width: 18%;
        text-align: center;
    }
</style>
