<template>
    <div class="wrapper">
        <ul>
            <li><input type="button" value="btn1"></li>
            <li><input type="button" value="btn2"></li>
            <li><input type="button" value="btn3"></li>
            <li><input type="button" value="btn4"></li>
            <li><input type="button" value="btn5"></li>
        </ul>

    </div>
</template>

<style>

</style>

<script>
    export default {
        data() {
            return{

            }
        },
        methods: {},
        mounted() {
            //1、fibonacci
            async function fib (n) {
                let [pre, cur] = [1, 1];
                if (n === 1){
                    return pre;
                }
                if (n === 2){
                    return cur;
                }
                for (let i = 0;i < (n-2); i++){
                    let tempPre = pre;
                    await ([pre, cur] = [cur, tempPre + cur])
                }
                return cur;
            }
            let n = 5
            fib(n).then(v => console.log(v))


            //2、new
            function A() {
                this.name = 'A'
            }

            A.prototype.say = function () {
                console.log(this.name);
            }

            function getObject(className) {
                var temp = {}
                className.call(temp)
                temp.__proto__ = className.prototype;
                return temp;
            }

            var a = getObject(A)
            a.say()


            //3、button value
            var inputs = document.querySelectorAll("input");
            for(var i =0;i< inputs.length;i++){
                inputs[i].onclick = function (e) {
                    // 这题不太清除想考什么。。。。
                    console.log(e.target.getAttribute('value'));
                    console.log(this.value)
                    console.log(this.getAttribute('value'))
                }
            }


            //4、template
            var templateFunc = function (str, obj) {
                debugger
                var reg = /\$\{(\w*)\}/g;
                return str.replace(reg, function (match, key, value) {
                    if (obj[key]){
                        return obj[key];
                    }
                    else{
                        console.log('未获取到变量')
                        return null;
                    }

                });

            }
            var res = templateFunc('Hello ${value1} ${value}', {value1: 'mineName'});
            console.log(res)
        }
    }
</script>