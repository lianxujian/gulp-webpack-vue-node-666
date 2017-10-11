<template>
    <div class="wrapper">
        <div>User Child{{ $route.params.childid }}</div>
    </div>
</template>

<style>
    .wrapper {
    }

</style>

<script>
    export default {
        data() {
            return {}

        },
        created() {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        mounted(){
            //渲染完成可以获取el实例
            // 渲染完成可以操作dom节点
        },
        methods: {},
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                let thisId = this.$route.params.childid
                console.log(thisId)
            }
        }
    }
</script>