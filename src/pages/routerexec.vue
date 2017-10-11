<template>
    <div class="wrapper">
        <router-view></router-view>
        <router-view  name="a"></router-view>
        <router-view  name="b"></router-view>
        <div>User {{ $route.params.id }}</div>
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
        methods: {},
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                let thisId = this.$route.params.id
                console.log(thisId)
            }
        }
    }
</script>