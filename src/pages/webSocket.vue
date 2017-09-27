<template>
    <div class="wrapper">
        <div>总人数<span>{{userCount}}</span><span v-if="!this.$store.state.user">,登录可参与聊天</span></div>
        <div v-if="this.$store.state.user">
            历史记录
            <div class="history-msg">
                <ul>
                    <template v-for="(item, index) in historyMsgList">
                       <li>
                           <span>{{item.date|formatDate}}</span>
                           <span>{{item.user}}</span>
                           <span>{{item.content}}</span>
                       </li>
                    </template>
                </ul>

            </div>
            <div class="send-msg">
                <input type="text" v-model="inputMsg" placeholder="请输入要发送的聊天内容">
                <button @click="submitChatMsg">发送</button>
            </div>
        </div>
    </div>
</template>

<style>

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

</style>

<script>
    import Vue from 'vue'
    import VueSocketio from 'vue-socket.io';
    import Toast from '../myPlugin/toast';
    import '../myPlugin/toast.css';
    import Axios from '../axios/index'
    Vue.use(Toast);



    export default {
        data() {
            return {
                userCount: 0,
                inputMsg: '',
                historyMsgList: [],
                tempMsgObj: {},
                DBTableName: 'chatHistory',
                DBName: 'BlogDB'
            }

        },
        methods: {
            submitChatMsg: function () {
                let me = this;
                let param = {
                    user: me.$store.state.user,
                    date: new Date(),
                    content: me.inputMsg
                }
                me.$socket.emit('submitMSg', param);
                me.tempMsgObj = param;
            },
            initDB: function (callback) {
                let me = this;
                let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                let request;
                let db;
                request = indexedDB.open(me.DBName, 3);
                request.onerror = function(e){
                    console.log(e.target.errorCode);
                };
                request.onsuccess = function(e){
                    console.log('创建或打开数据库成功') ;
                    db = e.target.result;
                    callback(db)
                }
                request.onupgradeneeded = function(e) {
                    db = e.target.result;
                    if(db.objectStoreNames.contains(me.DBTableName)){
                        db.deleteObjectStore(me.DBTableName);
                    }
                    if(!db.objectStoreNames.contains(me.DBTableName)){
                        //没有该对象空间时创建该对象空间
                        // Javascript对象，如果对象中有keyPath指定的属性则不生成新的键值，
                        // 如果没有自动生成递增键值，填充keyPath指定属性
                        let objectStore = db.createObjectStore(me.DBTableName, {autoIncrement: true});

                        objectStore.createIndex("date", "date", { unique: false });

                        objectStore.createIndex("user", "user", { unique: false });
                    }


                }
            },
            insertDB: function (data,callback) {
                let me = this;
                let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                let request;
                let db;
                request = indexedDB.open('BlogDB');
                request.onerror = function(e){
                    console.log(e.target.errorCode);
                };
                request.onsuccess = function(e){
                    console.log('创建或打开数据库成功') ;
                    db = e.target.result;
                    let transaction = db.transaction([me.DBTableName], "readwrite");
                    // 当所有的数据都被增加到数据库时执行一些操作
                    transaction.oncomplete = function(e) {
                        console.log("All done!");
                    };

                    transaction.onerror = function(e) {
                        // 不要忘记进行错误处理！
                        console.log(e)
                    };

                    let objectStore = transaction.objectStore(me.DBTableName);
                    for (let i in data) {
                        //put添加数据，重复添加会更新原有数据
                        let req = objectStore.add(data[i]);
                        req.onsuccess = function(e) {
                            callback(e)
                        };
                        req.onerror = function (e) {
                            console.log(e)
                        }
                    }

                }

            }
        },
        mounted: function () {
            let me = this
            Vue.use(VueSocketio, 'ws://localhost:3000');
            console.log(me.$toastMsg);
            let toastStyle = {
                'width': '800px',
                'border-radius': '0px'
            }
            me.$toast('hello vue plugin', toastStyle, 'bottom')
            me.initDB(function (db) {
                // 读取indexDB并按时间排序放入到historyMsgList
                let objectStore = db.transaction(me.DBTableName).objectStore(me.DBTableName);
                // @Todo怎么排序
                objectStore.openCursor().onsuccess = function(e) {
                    let cursor = e.target.result;
                    if (cursor) {
                        me.historyMsgList.push(cursor.value);
                        cursor.continue();
                    }
                };
            });

        },
        sockets:{
            connect: function(){
                console.log('socket connected')
            },
            users: function(data){
                let me = this
                me.userCount = data.number
            },
            success: function (data) {
                let me = this;
                me.$toast('发送成功', {}, 'center')
                me.insertDB([data], function (e) {
                    me.historyMsgList.push(data)
                })
            },
            message: function (data) {
                let me = this;
                // 提交后台成功后，将数据存到indexDB，并刷新界面数据
                me.insertDB([data], function (e) {
                    console.log(1)
                    me.historyMsgList.push(data)
                })
            },
            error: function (data) {
                let me = this;
                me.$toast('发送失败', {}, 'center')
            }
        },
        filters:{
            formatDate: function (val) {
                let patternA = /(\d{4})-(\d{2})-(\d{2})/g;
                let strA = val.match(patternA);
                let patternB = /(\d{2}):(\d{2}):(\d{2})/g;
                let strB = val.match(patternB);
                return strA + " " + strB
            }
        }
    }
</script>