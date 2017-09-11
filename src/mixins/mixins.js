export var globalMixin = {
    created: function () {
        console.log('混合对象的钩子被调用')
        this.hello()
    },
    methods: {
        hello: function () {
            console.log('hello from mixin!')
        }

    }
};
export var routerMixin = {
    methods: {
        jump (to) {
            if (this.$router) {
                this.$router.push(to)
            }
        }
    }
};
