<template>
    <div class="wrapper">
        <div>
            相对于父元素宽度的：[max/min-]width、left、right、padding、margin 等；
            相对于父元素高度的：[max/min-]height、top、bottom 等；
            相对于继承字号的：font-size 等；
            相对于自身字号的：line-height 等；
            相对于自身宽高的：border-radius、background-size、transform: translate()、transform-origin、zoom、clip-path 等；
            特殊算法的：background-position（方向长度 / 该方向除背景图之外部分总长度 * 100）、filter 系列函数等；
            如果自身设置 position: absolute，“父元素”指：相对于离它最近的那个 position 不为 static 的祖先元素，如果没有这样的元素，则相对于视口。
            如果 position: fixed，“父元素”指视口。
        </div>
        <div class="outter1">
            <div class="inner1">
                <p class="inner-center-text">absolute布局</p>
            </div>
        </div>
        <div class="outter2">
            <div class="inner2">
                <p>
                    flex布局
                </p>
            </div>
        </div>
        <div class="outter3">
            <span class="item">
                1
            </span>
            <span class="item">
                2
            </span>
            <span class="item">
                3
            </span>
        </div>
        <div class="outter4">
            <span class="item">
                1
            </span>
            <span class="item">
                2
            </span>
            <span class="item">
                3
            </span>
            <span class="item">
                4
            </span>
        </div>
        <div class="outter5">
            <div class="row">
                <span class="item">
                1
            </span>
                <span class="item">
                2
            </span>
            </div>
            <div class="row">
                <span class="item">
                3
            </span>
                <span class="item">
                4
            </span>
            </div>

        </div>
        <div @click="promiseExc"> promise</div>
        <div @click="iteratorExc"> iterator</div>
        <div @click="letAndConst"> letAndConst</div>
        <div @click="setAndMap"> setAndMap</div>
        <div @click="forIndex"> forIndex</div>
        <div @click="proxyAndReflect"> proxyAndReflect</div>
        <div @click="generatorExc"> generatorExc</div>
        <div @click="classAndExtend"> classAndExtend</div>
        <div @click="asyncEex"> asyncEex</div>
        <div @click="arrowFunc"> arrowFunc</div>
        <div @click="jiegouExe"> jiegouExe</div>
        <div @click="symbolExe"> symbolExe</div>
        <div @click="objectExe"> objectExe</div>
    </div>
</template>

<style rel="stylesheet/scss" lang="sass">
    .wrapper {
        .outter1{
            width: 500px;
            height: 300px;
            background-color:antiquewhite;
            position:relative;
            .inner1{
                display:table;
                background-color:cadetblue;
                position:absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                text-align:center;
                height: 30%;
                .inner-center-text{
                    display:table-cell;
                    vertical-align:middle;
        }
    }
        margin-bottom: 20px; }
        .outter2{
            width: 500px;
            height: 300px;
            display:flex;
            justify-content:space-around;
            background-color:antiquewhite;
            align-items:center;
            .inner2{
                display:flex;
                justify-content:space-around;
                align-items:center;
                text-align:center;
                background-color:cadetblue;
                height: 30%;
                p {

        }
    } }
        .outter3{
            display:flex;
            width: 100px;
            height: 100px;
            background-color:antiquewhite;
            justify-content:space-between;
            .item{
                background-color:cadetblue;
                display:inline-flex;
                width: 30px;
                height: 30px;
                border-radius: 50%;
        }
            .item:nth-child(1) {
                align-self:flex-start;
        }
            .item:nth-child(2) {
                align-self:center;
        }
            .item:nth-child(3) {
                align-self:flex-end;
        }
    }
        .outter4{
            display:flex;
            width: 100px;
            height: 100px;
            background-color:antiquewhite;
            justify-content:space-between;
            align-content:space-between;
            flex-wrap:wrap;
            .item{
                background-color:cadetblue;
                display:inline-flex;
                width: 30px;
                height: 30px;
                border-radius: 50%;
    } }
        .outter5{
            display:flex;
            width: 100px;
            height: 100px;
            background-color:antiquewhite;
            align-content:space-between;
            flex-wrap:wrap;
            .row{
                flex-basis: 100%;
                display:flex;
                justify-content:space-between;
        }
            .item{
                background-color:cadetblue;
                display:inline-flex;
                width: 30px;
                height: 30px;
                border-radius: 50%;
        }
    } }

</style>

<script>
    import Axios from '../axios/index'

    export default {
        data() {
            return {}

        },
        methods: {
            promiseExc: function () {
                let me = this;
                //pending（进行中）、fulfilled（已成功）和rejected（已失败）
                let someAsyncThing = function () {
                    return new Promise(function (resolve, reject) {
                        if (true) {
                            x = 2//
                            resolve('success')
                            console.log(2);
                            throw new Error('resolve后 的错误捕获不到');
                        } else {
                            reject(new Error('rejected error'));
                        }
                    })
                }
                someAsyncThing().then(function funcA(data) {
                    console.log('thenA' + data)
                }).catch(function (data) {
                    console.log('catch ' + data)
                }).then(function () {
                    console.log('carry on');
                });

                console.log('Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误')

                let promises = [1, 2, 3].map(function (id) {
                    return me.$axios({
                        url: '/XXX',
                        method: 'post',
                        data: id
                    })
                })
                Promise.all(promises).then(function (postArr) {
                    console.log('allsuccess')
                }).catch(function () {
                    console.log('at least one error')
                })


                const p1 = new Promise((resolve, reject) => {
                    resolve('hello');
                })
                    .then(result => result);

                const p2 = new Promise((resolve, reject) => {
                    throw new Error('报错了');
                })
                    .then(result => result)
                    .catch(e => e);//如果写了自己的catch，执行完整个p2的状态是resolve，就不会调用all的catch

                Promise.all([p1, p2])
                    .then(result => console.log(result))
                    .catch(e => console.log(e));

                Promise.prototype.done = function (onFulfilled, onRejected) {
                    this.then(onFulfilled, onRejected)
                        .catch(function (reason) {
                            // 抛出一个全局错误
                            setTimeout(() => {
                                throw reason
                            }, 0);
                        });
                };
                Promise.all([p1, p2])
                    .then(result => console.log(result))
                    .catch(e => console.log(e))
                    .done();

            },
            iteratorExc: function () {
                let arr = ['1', '2', '3']
                let iter = arr[Symbol.iterator]()
                console.log(iter.next())
                console.log(iter.next())
                //调用Iterator的场合
                //解构赋值
                let set = new Set().add('a').add('b').add('c')
                let [x, y] = set;
                let [first, ...rest] = set;

                // 扩展运算符
                let str = 'hello';
                console.log([...str])
                let arr2 = ['b', 'c']
                console.log(['a', ...arr2, 'd'])

            },
            letAndConst: function () {
                console.log(test1)//undefined
                var test1
                console.log(test2)//undefined
                //其实整个是因为babel编译了，如果没有编译过，在控制台直接敲是会报错的，因为let、const并没有变量提升
                let test2
            },
            setAndMap: function () {
                // set 唯一值
                let s = new Set();
                [1, 2, 3, 4, 1, 4].forEach(x => s.add(x));
                for (let i of s) {
                    console.log(i)//1,2,3,4
                }
                console.log(s.has(1)) // true
                s.delete(2);
                console.log(s.has(2))// false

                let s2 = new Set([1, 2, 3, 3, 2, 4, 2, NaN, NaN])//在set里面NaN === NaN
                console.log(s2.size)//5
                for (let item of s2.entries()) {
                    console.log(item);//[1,1] [2,2] [3,3] [4,4] [NaN,NaN]
                }

                let array = Array.from(s2);
                console.log(array)// [1, 2, 3, 4, NaN]

                // 去除数组的重复成员
                console.log([...new Set([1,2,3,4,4,3,2,1])])
                //WeakSet 的成员只能是对象，而不能是其他类型的值。
                //WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，

                // map允许key不是字符串，如果所有 Map 的键都是字符串，它可以转为对象。
                // key是对象是得是同一个饮用才能拿到同一个 值
                let map = new Map([['F', 'no'],['T', 'yes']])
                for (let key of map.keys()){
                    console.log(key)
                }
                for (let value of map.values()){
                    console.log(value)
                }
                for (let item of map.entries()){
                    console.log(item[0], item[1])
                }
                for (let [key, value] of map.entries()){
                    console.log(key,  value)
                }
                console.log([...map.keys()])// [1, 2, 3]

                console.log([...map.values()])// ['one', 'two', 'three']

                console.log([...map.entries()])// [[1,'one'], [2, 'two'], [3, 'three']]

                console.log([...map])// [[1,'one'], [2, 'two'], [3, 'three']]
            },
            forIndex: function () {
                var array = [1,2,3,4,5,6,7];
                for (var i = 0; i < array.length; i++) {
                    console.log(i,array[i]);
                    if (i === 5) break;
                }
                //for in总是得到对像的key或数组,字符串的下标,而for of和forEach一样,是直接得到值,默认一个参数的时候，这些也是可以改的
                for(let index in array){
                    console.log(index,array[index]);
                    if (array[index] === 3) break;
                }
                //forEach不支持断点
                array.forEach((v,k)=>{
                    console.log(k, v);
                    //if (v === 3)  break;
                });
                //for of不能对象用,要用在有iterator接口的
                for(let v of array) {
                    console.log(v);
                    if (v === 2)  break;
                };
                for (let [k, v] of array.entries()) {
                    console.log(k, v);
                    if (v === 1)  break;
                }
                let s1 = "helloabc";// let 禁止重复定义
                for(let c of s1) {
                    console.log(c);
                }
                let s = new Set();
                [1, 2, 3, 4, 1, 4].forEach(x => s.add(x))
                for (let i of s) {
                    console.log(i)
                }
                //WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
                //WeakMap的键名所指向的对象，垃圾回收机制不管理，就是要手动删除。

                // let of不能直接遍历对象，但可以通过其他方式，访问键值
                let es6 = {
                    edition: 6,
                    committee: "TC39",
                    standard: "ECMA-262"
                };
                for (var key of Object.keys(es6)) {
                    console.log(key + ': ' + es6[key]);
                }
            },
            proxyAndReflect: function () {
                var obj = new Proxy({},  {
                    get(target,name){
                        console.log('get', target, name);
                        return Reflect.get(target, name);
                    },
                    deleteProperty(target, name) {
                        console.log('delete' + name);
                        return Reflect.deleteProperty(target, name);
                    },
                    has(target, name) {
                        console.log('has' + name);
                        return Reflect.has(target, name);
                    },
                    set: function(target, name, value, receiver) {
                        var success = Reflect.set(target,name, value, receiver);
                        if (success) {
                            console.log('property ' + name + ' on ' + target + ' set to ' + value);
                        }
                        return success;
                    }
                })
                obj.count = 1//property count on [object Object] set to 1

                ++obj.count//get {count: 1} coun
                           // property count on [object Object] set to 2
                var myObj = {
                    foo: 1,
                    bar: 2,
                    barset: 0,
                    get baz() {
                        return this.foo + this.bar;
                    },
                    set barset(value){
                        this.barset = value
                        return this.barset;
                    }
                };
                Reflect.get(myObj, 'foo') // 1
                Reflect.get(myObj, 'bar') // 2
                Reflect.get(myObj, 'baz') // 3
                var myReceiveObj = {
                    foo: 4,
                    bar: 4,
                    barset: 4
                }
                Reflect.get(myObj, 'baz', myReceiveObj)//8
                console.log(myObj.baz) //3
                //Reflect.set(myObj, 'barset', 2);//报内存溢出？
                console.log(myObj.barset);// undefined
                Reflect.set(myObj, 'barset', 2, myReceiveObj);
                console.log(myReceiveObj.barset);//2
            },
            generatorExc: function () {
                //Generator 函数返回的遍历器对象
                let me = this;
                let helloGenerator1 = function *() {
                    yield 'state1';
                    var res = yield 'state2';
                    if (res){
                        yield 'state3'
                    }
                    return 'end'
                }
                let h = helloGenerator1()
                console.log(h.next())
                console.log(h.next())
                console.log(h.next(true))
                console.log(h.next())

                let helloGenerator2 = function *(x) {
                    var y = 2 * (yield (x + 1));
                    var z = yield(y / 3);
                    return (x + y + z)
                }

                let a = helloGenerator2(5)
                console.log(a.next()) // Object{value:6, done:false}
                console.log(a.next())  // Object{value:NaN, done:false}
                console.log(a.next())  // Object{value:NaN, done:true}

                var b = helloGenerator2(5);
                let res1 = b.next()
                console.log(res1) //{value:6, done:false}
                let res2 = b.next(res1.value)
                console.log(res2)//{value:4, done:false}
                let res3 = b.next(res2.value)
                console.log(res3) //{value:21, done:false}

                let helloGenerator3 = function *() {
                    yield 1;
                    try {
                        yield 2;
                        yield 3;
                        yield 4;
                    } finally {
                       yield 5
                    }
                    yield 6;
                    return 7;
                }
                for (let v of helloGenerator3()){
                    console.log(v)//1 2 3 4 5 6
                }
               let h3 = helloGenerator3();
                console.log(h3.next())//{value: 1, done: false}
                console.log(h3.return('end'));//{value: "end", done: true}
                console.log(h3.next()) //{value: undefined, done: true}

                let h33 = helloGenerator3()
                console.log(h33.next()); //{value: 1, done: false}
                console.log(h33.next()); //{value: 2, done: false}
                console.log(h33.return('end')); //{value: 5, done: false}
                console.log(h33.next()); ////{value: "end", done: true}
                console.log(h33.next());//{value: undefined, done: true}

                function* inner() {
                    yield 'hello!';
                }

                function* outer1() {
                    yield 'open';
                    yield inner();
                    yield 'close';
                }

                var gen1 = outer1()
                console.log(gen1.next().value )// "open"
                console.log(gen1.next().value ) // 返回一个遍历器对象Generator {_invoke: ƒ}
                console.log(gen1.next().value )// "close"

                function* outer2() {
                    yield 'open'
                    yield* inner()
                    yield 'close'
                }

                var gen2 = outer2()
                console.log(gen2.next().value ) // "open"
                console.log(gen2.next().value ) // "hello!"
                console.log(gen2.next().value ) // "close"

                let read = (function* () {
                    yield 'hello';
                    yield* 'hello';
                })();

                read.next().value // "hello"
                read.next().value // "h"
                // 异步写法的同步化
                // 回调写法的同步化写法
                // 利用Generator函数，可以在任意对象上部署iterator接口
                // Generator可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。
            },
            classAndExtend: function ()  {
                //一、对象创建
                //此处不谈字面量和new Object
                //1.工厂模式
                //可以传递参数，但主要缺点是无法识别对象类型，因为创建对象都是使用Object的原生构造函数来完成的。
                function createPerson(name, age, job) {
                    var o = new Object();
                    o.name = name;
                    o.age = age;
                    o.job = job;
                    o.getName = function () {
                        return this.name;
                    }
                    return o;//使用return返回生成的对象实例
                }

                var person = createPerson('Jack', 19, 'SoftWare Engineer');


                //2.构造函数模式
                //new的过程，创建一个对象temp， Person.apply(temp)，执行person的构造函数，返回temp。 将函数的 prototype 赋值给对象的 __proto__ 属性
                //虽然构造函数方式比较不错，但也存在缺点，那就是在创建对象时，特别针对对象的属性指向函数时，会重复的创建函数实例，
                function Person(name, age, job) {
                    this.name = name;
                    this.age = age;
                    this.job = job;
                    this.getName = function () {
                        return this.name;
                    }
                }

                var person1 = new Person('Jack', 19, 'SoftWare Engineer');
                var person2 = new Person('Liye', 23, 'Mechanical Engineer');
                console.log(person1 instanceof Person);//true;
                console.log(person2 instanceof Person);//true;
                console.log(person1 instanceof Object);//true;因为所有对象都继承Object
                console.log(person1.constructor === person2.constructor);//ture;


                //3.原型模式
                //JS每个函数都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象，
                // 它是所有通过new操作符使用函数创建的实例的原型对象。
                //原型模式的缺点，它省略了为构造函数传递初始化参数，这在一定程序带来不便；
                // 另外，最主要是当对象的属性是引用类型时，它的值是不变的，总是引用同一个外部对象，所有实例对该对象的操作都会其它实例：
                function Father() {
                }

                Father.prototype.name = 'Jack';//使用原型来添加属性,相当于在构建原型对象
                Father.prototype.age = 29;
                Father.prototype.getName = function () {
                    return this.name;
                }
                Father.prototype.lessons = ['Math', 'Physics'];
                var son1 = new Father();
                console.log(son1.getName());//Jack
                var son2 = new Father();
                console.log(son1.getName === son2.getName);//true;共享一个原型对象的方法
                son2.name = 'son2';
                son1.lessons.push('Biology');
                console.log(son2.lessons);//Math,Physics,Biology，person1修改影响了son2
                //实例属性或方法的访问过程是一次搜索过程：
                //首先从对象实例本身开始，如果找到属性就直接返回该属性值；
                //如果实例本身不存在要查找属性，就继续搜索指针指向的原型对象，在其中查找给定名字的属性，如果有就返回；
                console.log(son2.name)//son2


                //4、组合构造函数及原型模式   函数公用，变量自己拥有
                function F(name, age, job) {
                    this.name = name;
                    this.age = age;
                    this.job = job;
                    this.lessons = ['Math', 'Physics'];
                }

                /* F.prototype = {
                     constructor: F,
                     // 原型字面量方式会将对象的constructor变为Object，此外强制指回F,否则f1.constructor == Object结果为true
                     // 也可以不用字面量的方式
                     getName: function () {
                         return this.name;
                     }
                 }*/
                F.prototype.getName = function () {
                    return this.name;
                }
                var f1 = new F('Jack', 19, 'SoftWare Engneer');
                f1.lessons.push('Biology');
                var f2 = new F('Lily', 39, 'Mechanical Engneer');
                console.log(f1.lessons);//Math,Physics,Biology
                console.log(f2.lessons);//Math,Physics
                console.log(f1.getName === f2.getName);//true,//共享原型中定义方法
                console.log(f1.constructor == F.prototype.constructor); // true
                console.log('f1.constructor == Object' + (f1.constructor == Object)); // false


                // 二、实现继承
                //原型链继承、构造函数继承、实例继承、拷贝继承、
                //组合继承
                function Animal() {
                    this.species = "动物";
                }

                Animal.prototype.saySpecies = function () {
                    return this.species
                }

                function Cat(name, color) {
                    Animal.apply(this, arguments);
                    this.name = name;
                    this.color = color;
                }

                //将Cat的prototype对象指向一个Animal的实例，这种使得继承是混乱的，见下面三个console.log
                Cat.prototype = new Animal();
                Cat.prototype.sayName = function () {
                    return this.name
                }
                Cat.prototype.constructor = Cat;
                var cat1 = new Cat("大毛", "黄色");
                console.log('子类方法调用' + cat1.sayName())
                console.log('父类方法调用' + cat1.saySpecies())
                console.log('species' + cat1.species)//species动物
                console.log(Cat.prototype.constructor == Animal)// false
                console.log(cat1.constructor == Cat.prototype.constructor); // true
                console.log(cat1.constructor == Animal); // false

                // 三 ES6的实现方法
                class Point {
                    /*static mystate = '我是类的静态属性'//静态的不能通过实例访问，只能通过类访问
                    static print  () {//静态方法可以被子类继承，但静态方法只能通过类名访问
                        console.log(Point.mystate)
                    }*/
                    constructor(x, y) {//构造函数
                        console.log(new.target === Point);
                        this.x = x;
                        this.y = y;
                    }

                    show() {// 原型链
                        return '(' + this.x + ', ' + this.y + ')';
                    }
                }

                class ColorPoint extends Point {
                   /* # a = 0;
                    # b = 1;
                    # sum () { return #a + #b ;}
                    static  print () {
                        console.log(#sum())
                        return super.print() + 'too';
                    }*/
                    constructor(x, y, color) {
                        console.log(new.target === ColorPoint);//子类继承父类时，new.target会返回子类。
                        super(x, y); // 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。
                        this.color = color;
                    }

                    show() {
                        return this.color + ' ' + super.toString(); // 调用父类的toString()
                    }
                }

                var p = new Point(1, 2);
                console.log(typeof Point)//function
                console.log(Point.prototype.constructor)//ƒ Point(x, y) {_classCallCheck(this, Point);this.x = x;this.y = y;}
                console.log(p.constructor === Point.prototype.constructor)//true
                console.log(Object.prototype.toString.call(p))//[object Object]
                console.log(p instanceof Point)//true
                console.log(typeof p)//object
                console.log(Object.getPrototypeOf(ColorPoint) === Point)//true
                console.log(ColorPoint.__proto__ === Point)//true
                console.log(ColorPoint.prototype.__proto__ === A.prototype)//true

                var cp = new ColorPoint()
                //ColorPoint.print()
                //cp.sum()

            },
            asyncEex: function () {
                //async就是 Generator 函数的语法糖。async比promise代码更易理解，比起generator不需要任务执行器
                //async比较好用，有时也需要搭配promise使用
                async function f() {
                    try {
                        await Promise.reject('出错了')
                    }catch (e){
                        console.log('使用try catch 可以使得 f函数后续的函数仍可以执行')
                        //使用try catch 可以使得 f函数后续的函数仍可以执行

                    }
                    return await Promise.resolve('可以执行')
                }
                f()
                    .then(function (msg) {
                    console.log(msg) // 可以执行
                })
                    .catch(function (e) {
                    console.log(e)
                })
            },
            arrowFunc: function () {
                let id = 21;
                function f(){
                    //箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域
                    //this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，
                    // 导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
                    setTimeout(function () {
                        console.log('id:', this.id);//指向window id: undefined
                    },0)
                    setTimeout(()=>{
                        console.log('id:', this.id);//id: 42 箭头函数导致this总是指向函数定义生效时所在的对象
                    },100)
                }
                f.call({ id: 42 });
            },
            jiegouExe: function () {
                let [x, y, z, w = 'default'] = new Set(['a', 'a', 'b', 'c'])
                console.log(y)//b
                console.log(w)// defalut
                function* fibs() {
                    let a = 0;
                    let b = 1;
                    while (true) {
                        yield a;
                        [a, b] = [b, a + b];
                        // 上下都可以
                        //[b,  a] = [a+b, b]
                    }
                }
                let [first, second, third, fourth, fifth, sixth, seven, eight, nine, ten ] = fibs();
                console.log(first, second, third, fourth, fifth, sixth, seven, eight, nine, ten)
                //0 1 1 2 3 5 8 13 21 34
                function f() {
                    console.log('aaa');//如果默认值是一个表达式，惰性求值，所以不会被打印
                }
                let [fv = f()] = [1];

                let {keya, keyb} = {keyb: 1, keya: 0}
                console.log(keya,  keyb)//0,1
                let {keyaa: keyaaa, keybb: keybbb} = {keyaa: 0, keybb: 1}
                //console.log(keyaa)//keyaa is not defined
                console.log(keybbb)//1

                let [a, b, c, d, e] = 'hello';
                console.log(a, b, c, d, e) //h e l l o
                let {length : len} = 'hello';
                console.log(len)// 5


                function move({x = 0, y = 0} = {}) {
                    return [x, y];
                }

                move({x: 3, y: 8}); // [3, 8]
                move({x: 3}); // [3, 0]
                move({}); // [0, 0]
                move(); // [0, 0]

                [[1, 2], [3, 4]].map(([a, b]) => {
                    console.log(a + b)//3,7
                });
            },
            symbolExe: function () {
                //Symbol，表示独一无二的值
                //Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。
                let s1 = Symbol('lalala')
                let s2 = Symbol('lalala')
                console.log(typeof  s1)//symbol
                console.log(s1 === s2) //false
                //console.log('your symbol is' + s1)//Cannot convert a Symbol value to a string
                //只能显示的转换为数值
                console.log('your symbol is ' + s2.toString())//your symbol is Symbol(lalala)
                //可以转换为布尔
                console.log(Boolean(s1)) // true
                console.log(!s1)  // false
                if (s1) {
                    // ...
                }

                //不能转换为数值
                //console.log(Number(s1)) //  Cannot convert a Symbol value to a number
                //console.log(s1 + 2) // TypeError

                let obj = {
                    [s1]: function (arg) {
                        console.log(arg)
                    },
                    num: 1
                }
                obj[s1](123)
                for (let i in obj){
                    console.log(i)//num
                }
                console.log(Object.getOwnPropertyDescriptor(obj, 'num'))//对象
                console.log(Object.getOwnPropertyNames(obj))//["num"]
                console.log(Object.getOwnPropertySymbols(obj))//[Symbol(lalala)]
                console.log(Reflect.ownKeys(obj))//["num", Symbol(lalala)]
                //Symbol.for为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。
                let s11 = Symbol.for('aaa');
                let s22 = Symbol.for('aaa');
                console.log(s11 === s22) // true

                let s111 = Symbol.for("foo");
                console.log(Symbol.keyFor(s111)) // "foo"

                let s222 = Symbol("foo");
                console.log(Symbol.keyFor(s222)) // undefined
            },
            objectExe: function () {
                Object.prototype.bar = 1;
                let kv = 'keyvalue'
                let obj = {kv}
                console.log(Object.getOwnPropertyDescriptor(obj, 'kv'))//{value: "keyvalue", writable: true, enumerable: true, configurable: true}
                //有四个操作会忽略enumerable为false的属性。
                //for...in循环：只遍历对象自身的和继承的可枚举的属性。
                //Object.keys()：返回对象自身的所有可枚举的属性的键名。
                //JSON.stringify()：只串行化对象自身的可枚举的属性。
                //Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。



                // for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
                // Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
                // Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
                // Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
                // Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
                for (let i in obj){
                    if (obj.hasOwnProperty(i)) {
                        console.log(i);
                    }
                }

                function Car (desc) {
                    this.color = "red";
                }
                Car.prototype = {
                    getInfo: function() {
                        return 'A ' + this.color + ' '+ '.';
                    }
                };
                var car =  Object.create(Car.prototype);
                car.color = "blue";
                console.log(car.getInfo());//A blue .

                let proto = {};
                let obj1 = { x: 10 };
                Object.setPrototypeOf(obj1, proto);
                proto.y = 20;
                proto.z = 40;
                console.log(obj1.x, obj1.y, obj1.z) // 10,20,40

                function Rectangle() {}
                const rec = new Rectangle();
                console.log(Object.getPrototypeOf(rec) === Rectangle.prototype )// true

            }
        },
        mounted() {

        }
    }
</script>