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
    import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'

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
            debugger
            this.$store.commit('increment')
            console.log(this.aCount)
            console.log(this.doubleCount)
            this.someAction()
            this.renamesomeOtherAction()
        },
        computed: {
            ...mapState('a', {
                aCount: state => state.count
            }),
            ...mapGetters('a', [
                'doubleCount'
            ])
        },
        watch: {
            // 如果路由有变化，会再次执行该方法，在这里根据路由变化获取后台数据什么的
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                let thisId = this.$route.params.childid
                console.log(thisId)
            },
            ...mapActions('a', [
                'someAction',
                {renamesomeOtherAction: 'someOtherAction'}
            ]),
            ...mapActions('a', {
                renamesomeOtherAction: 'someOtherAction'
            }),
            ...mapMutations('a', [
                'increment'
            ])
        }
    }
</script>