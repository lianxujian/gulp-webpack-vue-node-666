<template>
    <div id="app">
        <Home></Home>
        <router-view></router-view>
    </div>
</template>

<script>
    import Home from './pages/home.vue'
    export default {
        name: 'app',
        data() {
            return {}
        },
        components: {
            Home: Home
        }
    }
</script>

<style lang="sass">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        width: 100%;
    }
</style>
